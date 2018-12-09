"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
function recover(brokenKey, updateFrequency, iteratorStart) {
    if (updateFrequency === void 0) { updateFrequency = 100000; }
    if (iteratorStart === void 0) { iteratorStart = 0; }
    var splitKey = brokenKey.split("?");
    if (iteratorStart === 0) {
        iteratorStart = Math.pow(58, (splitKey.length - 2));
    }
    var duration = Math.pow(58, (splitKey.length - 1));
    var _loop_1 = function (i) {
        var possibleKeyParts = utils_1.encode(i).split("");
        var newKey = splitKey.map(function (keyPart, index) {
            if (!possibleKeyParts[index]) {
                possibleKeyParts[index] = "";
            }
            return keyPart + possibleKeyParts[index];
        });
        var joinedKey = newKey.join('');
        if (utils_1.base58check(joinedKey)) {
            console.log("Private key found: " + joinedKey);
            return { value: joinedKey };
        }
        if (i % updateFrequency === 0) {
            console.log("Program is at: " + (i / duration * 100).toPrecision(3) + "%");
            console.log("It tried it with: " + utils_1.encode(i));
            console.log(i);
            console.log("Current try: " + joinedKey);
        }
    };
    for (var i = iteratorStart; i < duration; i++) {
        var state_1 = _loop_1(i);
        if (typeof state_1 === "object")
            return state_1.value;
    }
}
exports.recover = recover;
//# sourceMappingURL=index.js.map