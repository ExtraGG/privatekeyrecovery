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
// correct key: KwNryX9f7WSjXNPjnsaefBohLwG9GPK6Y7VhvJKSwsxL8oy5Txq1


// // start with 55000000
// const atTheEnd = 'KwNryX9f7WSjXNPjnsaefBohLwG9GPK6Y7VhvJKSwsxL8oy?????'
// recover(atTheEnd, 100000, 55000000)

// start with: 571000000
const allOverThePlace = 'KwNryX9f7W?jXNPjn?aefBoh?wG9GPK6Y7Vh?JKSwsxL8oy5T?q1'
recover(allOverThePlace, 100000)

// // start with 492300000
// const atTheBeginning = '?????X9f7WSjXNPjnsaefBohLwG9GPK6Y7VhvJKSwsxL8oy5Txq1';
// recover(atTheBeginning, 100000, 492300000);


// Implement question marks replacement for where it is unknown. <-- Finished!
// cleanup code
// Add public key method
// Add quick method if least 5 characters or less are unknown at the end, <-- postponed
// start with the amount of unknown characters as beginning iterator. <-- done
// end iterator by count of question marks (58^X) <-- done
// Publish it as an NPM package
// Make it work when the private key is 51 characters long. 
// Make it work when the private key is in non-WIF.