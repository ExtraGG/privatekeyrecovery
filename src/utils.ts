const base58 = require('bs58')
const crypto = require('crypto')

export function encode(enc: number) {
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

export function decode(input: string) {
  var buffer = Buffer.from(base58.decode(input))
  var prefix = buffer.slice(0, 1)
  var data = buffer.slice(1, -4)
  var hash = Buffer.concat([prefix, data])
  hash = crypto.createHash('sha256').update(hash).digest()
  hash = crypto.createHash('sha256').update(hash).digest()
  if (!buffer.slice(-4).equals(hash.slice(0, 4))) {
    return false
  } else {
    return true
  }
}