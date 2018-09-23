"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var base58 = require('bs58');
var crypto = require('crypto');
require("source-map-support").install();
function encode(enc) {
    var alphabet = '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ';
    var base = alphabet.length;
    if (typeof enc !== 'number') {
        throw Error('"encode" only accepts integers.');
    }
    var encoded = '';
    while (enc) {
        var remainder = enc % base;
        enc = Math.floor(enc / base);
        encoded = alphabet[remainder].toString() + encoded;
    }
    return encoded;
}
function decode(input) {
    var buffer = Buffer.from(base58.decode(input));
    var prefix = buffer.slice(0, 1);
    var data = buffer.slice(1, -4);
    var hash = Buffer.concat([prefix, data]);
    hash = crypto.createHash('sha256').update(hash).digest();
    hash = crypto.createHash('sha256').update(hash).digest();
    if (!buffer.slice(-4).equals(hash.slice(0, 4))) {
        return false;
    }
    else {
        console.log(input);
        return true;
    }
}
function recover(brokenKey, updateFrequency) {
    if (updateFrequency === void 0) { updateFrequency = 100000; }
    var tempKey = '';
    var _loop_1 = function (i) {
        var amountOfQuestionMarks = brokenKey.split("?");
        // console.log(amountOfQuestionMarks);
        var keyPowder = encode(i);
        var powder = keyPowder.split("");
        // console.log(powder);
        var newKey = amountOfQuestionMarks.map(function (e, index) {
            if (!powder[index]) {
                // console.log("h");
                powder[index] = "";
            }
            var result = e + powder[index];
            return result;
        });
        var joinedKey = newKey.join('');
        // console.log(newKey);
        // console.log(joinedKey);
        // Implement question marks replacement for where it is unknown.
        // cleanup code
        // Add public key method
        // Add quick method if least 5 characters or less are unknown at the end,
        // start with the amount of unknown characters as beginning iterator.
        // end iterator by count of question marks (58^X)
        // Publish it as an NPM package
        if (!decode(joinedKey)) {
            if (i % updateFrequency === 0) {
                console.log(('Program is at: ' + (i / 670000000 * 100).toPrecision(3) + '%'));
                console.log('It tried it with: ' + encode(i));
                console.log(i);
                console.log(tempKey);
            }
            return "continue";
        }
        else {
            console.log(tempKey);
            return { value: tempKey };
        }
    };
    for (var i = 568000000; i < 670000000; i++) {
        var state_1 = _loop_1(i);
        if (typeof state_1 === "object")
            return state_1.value;
    }
}
exports.default = recover;
// correct key: KwNryX9f7WSjXNPjnsaefBohLwG9GPK6Y7VhvJKSwsxL8oy5Txq1
var allOverThePlace = 'KwNryX9f7W?jXNPjn?aefBoh?wG9GPK6Y7Vh?JKSwsxL8oy5T?q1';
var atTheEnd = 'KwNryX9f7WSjXNPjnsaefBohLwG9GPK6Y7VhvJKSwsxL8oy?????';
var atTheBeginning = '?????KwNryX9f7WSjXNPjnsaefBohLwG9GPK6Y7VhvJKSwsxL8oy';
recover(allOverThePlace);
//# sourceMappingURL=index.js.map