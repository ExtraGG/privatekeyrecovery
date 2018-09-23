const brokenKey = 'KwNryX9f7WSjXNPjnsaefBohLwG9GPK6Y7VhvJKSwsxL8oy'
const base58 = require('bs58')
const crypto = require('crypto')
var randomString
var tempKey = ''

export default function recover (brokenKey, updateFrequency = 100000) {
  // Implement question marks replacement for where it is unknown.
  // cleanup code
  // Add public key method
  // Add quick method if least 5 characters or less are unknown at the enD,
  // start with the amount of unknown characters as beginning iterator.
  // end iterator by count of question marks (58^X)
  // Publish it as an NPM package
  for (let i = 0; i < 670000000; i++) {
    if (!decode(tempKey)) {
      randomString = encode(i)
      tempKey = brokenKey + randomString
      if (i % updateFrequency === 0) {
        console.log(('Program is at: ' + (i / 670000000 * 100).toPrecision(3) + '%'))
        console.log('It tried it with: ' + randomString)
        console.log(i)
        console.log(tempKey)
      }
      continue
    } else {
      console.log(tempKey)
      return
    }
  }
}

function encode (enc) {
  const alphabet = '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ'
  const base = alphabet.length
  if (typeof enc !== 'number') { throw Error('"encode" only accepts integers.') }
  var encoded = ''
  while (enc) {
    const remainder = enc % base
    enc = Math.floor(enc / base)
    encoded = alphabet[remainder].toString() + encoded
  }
  return encoded
}

function decode (string) {
  const buffer = Buffer.from(base58.decode(string))
  let prefix = buffer.slice(0, 1)
  let data = buffer.slice(1, -4)
  let hash = Buffer.concat([prefix, data])
  hash = crypto.createHash('sha256').update(hash).digest()
  hash = crypto.createHash('sha256').update(hash).digest()
  if (!buffer.slice(-4).equals(hash.slice(0, 4))) {
    return false
  } else {
    console.log(string)
    return true
  }
}

recover(brokenKey)
