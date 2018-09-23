"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var base58 = require('bs58');
var crypto = require('crypto');
require("source-map-support").install();
// Implement question marks replacement for where it is unknown.
// cleanup code
// Add public key method
// Add quick method if least 5 characters or less are unknown at the end,
// start with the amount of unknown characters as beginning iterator.
// end iterator by count of question marks (58^X)
// Publish it as an NPM package
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
function recover(brokenKey, updateFrequency, iteratorStart, unknownChars) {
    if (updateFrequency === void 0) { updateFrequency = 100000; }
    if (iteratorStart === void 0) { iteratorStart = 0; }
    var splitKey = brokenKey.split("?");
    console.log(splitKey.length);
    var duration = Math.pow(58, (splitKey.length - 1));
    var _loop_1 = function (i) {
        var keyPowder = encode(i).split("");
        var newKey = splitKey.map(function (e, index) {
            if (!keyPowder[index]) {
                keyPowder[index] = "";
            }
            return e + keyPowder[index];
        });
        var joinedKey = newKey.join('');
        if (!decode(joinedKey)) {
            if (i % updateFrequency === 0) {
                console.log(('Program is at: ' + (i / 670000000 * 100).toPrecision(3) + '%'));
                console.log('It tried it with: ' + encode(i));
                console.log(i);
            }
            return "continue";
        }
        else {
            console.log(joinedKey);
            return { value: joinedKey };
        }
    };
    for (var i = iteratorStart; i < duration; i++) {
        var state_1 = _loop_1(i);
        if (typeof state_1 === "object")
            return state_1.value;
    }
}
exports.default = recover;
// correct key: KwNryX9f7WSjXNPjnsaefBohLwG9GPK6Y7VhvJKSwsxL8oy5Txq1
// start with: 571000000
var allOverThePlace = 'KwNryX9f7W?jXNPjn?aefBoh?wG9GPK6Y7Vh?JKSwsxL8oy5T?q1';
recover(allOverThePlace, 100000, 571000000, 5);
// start with 55000000
var atTheEnd = 'KwNryX9f7WSjXNPjnsaefBohLwG9GPK6Y7VhvJKSwsxL8oy?????';
recover(atTheEnd, 100000, 55000000, 5);
// start with 492300000
var atTheBeginning = '?????X9f7WSjXNPjnsaefBohLwG9GPK6Y7VhvJKSwsxL8oy5Txq1';
recover(atTheBeginning, 100000, 492300000, 5);
//# sourceMappingURL=index.js.map