import { encode, base58check } from './utils';

export function recover(brokenKey: string, updateFrequency: number = 100000, iteratorStart: number = 0) {
  const splitKey = brokenKey.split("?");

  if (iteratorStart === 0) {
    iteratorStart = Math.pow(58, (splitKey.length - 2))
  }

  const duration = Math.pow(58, (splitKey.length - 1));

  for (let i = iteratorStart; i < duration; i++) {
    let possibleKeyParts = encode(i).split("");
    const newKey = splitKey.map((keyPart, index) => {
      if (!possibleKeyParts[index]) {
        possibleKeyParts[index] = ""
      }
      return keyPart + possibleKeyParts[index]
    })

    const joinedKey = newKey.join('');

    if (base58check(joinedKey)) {
      console.log(`Private key found: ${joinedKey}`)
      return joinedKey;
    }

    if (i % updateFrequency === 0) {
      console.log(`Program is at: ${(i / duration * 100).toPrecision(3)}%`)
      console.log(`It tried it with: ${encode(i)}`)
      console.log(i)
      console.log(`Current try: ${joinedKey}`);
    }
  }
}