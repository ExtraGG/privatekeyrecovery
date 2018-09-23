import { encode, decode } from './utils';

export default function recover
  (
  brokenKey: string,
  updateFrequency: number = 100000,
  iteratorStart: number = 0
  ) {

  const splitKey = brokenKey.split("?");
  if (iteratorStart === 0) { iteratorStart = Math.pow(58, (splitKey.length - 2)) }

  var duration = Math.pow(58, (splitKey.length - 1));
  for (let i = iteratorStart; i < duration; i++) {
    let keyPowder = encode(i).split("");
    const newKey = splitKey.map((keyPart, index) => {
      if (!keyPowder[index]) {
        keyPowder[index] = ""
      }
      return keyPart + keyPowder[index]
    })
    const joinedKey = newKey.join('');

    if (!decode(joinedKey)) {
      if (i % updateFrequency === 0) {
        console.log(`Program is at: ${(i / duration * 100).toPrecision(3)}%`)
        console.log(`It tried it with: ${encode(i)}`)
        console.log(i)
      }
      continue
    } else {
      console.log(joinedKey)
      return joinedKey
    }
  }
}