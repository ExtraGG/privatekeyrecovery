const base58 = require('bs58')
const crypto = require('crypto')
require("source-map-support").install();

function encode(enc: number) {
  var alphabet = '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ'
  var base = alphabet.length
  if (typeof enc !== 'number') { throw Error('"encode" only accepts integers.') }
  var encoded = ''
  while (enc) {
    var remainder = enc % base
    enc = Math.floor(enc / base)
    encoded = alphabet[remainder].toString() + encoded
  }
  return encoded
}

function decode(input: string) {
  var buffer = Buffer.from(base58.decode(input))
  var prefix = buffer.slice(0, 1)
  var data = buffer.slice(1, -4)
  var hash = Buffer.concat([prefix, data])
  hash = crypto.createHash('sha256').update(hash).digest()
  hash = crypto.createHash('sha256').update(hash).digest()
  if (!buffer.slice(-4).equals(hash.slice(0, 4))) {
    return false
  } else {
    console.log(input)
    return true
  }
}

export default function recover(brokenKey: string, updateFrequency = 100000) {
  let tempKey = '';
  const i = 55030230;
  const amountOfQuestionMarks = brokenKey.split("?");
  console.log(amountOfQuestionMarks);
  const keyPowder = encode(i)

  // Implement question marks replacement for where it is unknown.
  // cleanup code
  // Add public key method
  // Add quick method if least 5 characters or less are unknown at the end,
  // start with the amount of unknown characters as beginning iterator.
  // end iterator by count of question marks (58^X)
  // Publish it as an NPM package

  // for (let i = 55000000; i < 670000000; i++) {
  //   if (!decode(tempKey)) {
  //     tempKey = brokenKey + encode(i)
  //     if (i % updateFrequency === 0) {
  //       console.log(('Program is at: ' + (i / 670000000 * 100).toPrecision(3) + '%'))
  //       console.log('It tried it with: ' + encode(i))
  //       console.log(i)
  //       console.log(tempKey)
  //     }
  //     continue
  //   } else {
  //     console.log(tempKey)
  //     return tempKey
  //   }
  // }


}
// correct key: KwNryX9f7WSjXNPjnsaefBohLwG9GPK6Y7VhvJKSwsxL8oy5Txq1

recover('KwN?yX9f7WSjXNPjn?aefBohLwG9G?K6Y7VhvJ?SwsxL8?y5Txq1');