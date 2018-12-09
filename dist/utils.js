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
exports.encode = encode;
function base58check(input) {
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
        return true;
    }
}
exports.base58check = base58check;
//# sourceMappingURL=utils.js.map