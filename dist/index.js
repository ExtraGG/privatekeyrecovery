"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var base58 = require('bs58');
var crypto = require('crypto');
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
function decode(string) {
    var buffer = Buffer.from(base58.decode(string));
    var prefix = buffer.slice(0, 1);
    var data = buffer.slice(1, -4);
    var hash = Buffer.concat([prefix, data]);
    hash = crypto.createHash('sha256').update(hash).digest();
    hash = crypto.createHash('sha256').update(hash).digest();
    if (!buffer.slice(-4).equals(hash.slice(0, 4))) {
        return false;
    }
    else {
        console.log(string);
        return true;
    }
}
function recover(brokenKey, updateFrequency) {
    if (updateFrequency === void 0) { updateFrequency = 100000; }
    this.tempKey = '';
    // Implement question marks replacement for where it is unknown.
    // cleanup code
    // Add public key method
    // Add quick method if least 5 characters or less are unknown at the enD,
    // start with the amount of unknown characters as beginning iterator.
    // end iterator by count of question marks (58^X)
    // Publish it as an NPM package
    for (var i = 55000000; i < 670000000; i++) {
        if (!decode(this.tempKey)) {
            this.tempKey = brokenKey + encode(i);
            if (i % updateFrequency === 0) {
                console.log(('Program is at: ' + (i / 670000000 * 100).toPrecision(3) + '%'));
                console.log('It tried it with: ' + encode(i));
                console.log(i);
                console.log(this.tempKey);
            }
            continue;
        }
        else {
            console.log(this.tempKey);
            return this.tempKey;
        }
    }
}
exports.default = recover;
//# sourceMappingURL=index.js.map