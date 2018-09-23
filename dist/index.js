"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
// Implement question marks replacement for where it is unknown. <-- Finished!
// cleanup code
// Add public key method
// Add quick method if least 5 characters or less are unknown at the end,
// start with the amount of unknown characters as beginning iterator.
// end iterator by count of question marks (58^X) <-- done
// Publish it as an NPM package
// Make it work when the private key is 51 characters long. 
// Make it work when the private key is in non-WIF.
function recover(brokenKey, updateFrequency, iteratorStart) {
    if (updateFrequency === void 0) { updateFrequency = 100000; }
    if (iteratorStart === void 0) { iteratorStart = 0; }
    if (!iteratorStart) { }
    var splitKey = brokenKey.split("?");
    console.log(splitKey.length);
    var duration = Math.pow(58, (splitKey.length - 1));
    var _loop_1 = function (i) {
        var keyPowder = utils_1.encode(i).split("");
        var newKey = splitKey.map(function (keyPart, index) {
            if (!keyPowder[index]) {
                keyPowder[index] = "";
            }
            return keyPart + keyPowder[index];
        });
        var joinedKey = newKey.join('');
        if (!utils_1.decode(joinedKey)) {
            if (i % updateFrequency === 0) {
                console.log(("Program is at:  " + (i / duration * 100).toPrecision(3) + "%"));
                console.log("It tried it with: " + utils_1.encode(i));
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
// // start with 55000000
// const atTheEnd = 'KwNryX9f7WSjXNPjnsaefBohLwG9GPK6Y7VhvJKSwsxL8oy?????'
// recover(atTheEnd, 100000, 55000000)
// start with: 571000000
var allOverThePlace = 'KwNryX9f7W?jXNPjn?aefBoh?wG9GPK6Y7Vh?JKSwsxL8oy5T?q1';
recover(allOverThePlace, 100000, 571000000);
// // start with 492300000
// const atTheBeginning = '?????X9f7WSjXNPjnsaefBohLwG9GPK6Y7VhvJKSwsxL8oy5Txq1';
// recover(atTheBeginning, 100000, 492300000);
//# sourceMappingURL=index.js.map