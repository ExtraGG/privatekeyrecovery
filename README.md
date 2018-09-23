# Bitcoin private key recovery

[!Build Status](https://travis-ci.org/GuusBaggen/privatekeyrecovery.svg?branch=master) 
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

# Features
Recover a broken private key that misses up to 5 characters. It brute forces its way until the checksum is correct for the private key. Make sure to place a '?' at the place where the characters are unknown. It can be anywhere throughout the key. Currently only 52 character WIF keys are supported.

# Installation
```
yarn add private-key-recovery 
npm i private-key-recovery
```

# Usage

```
import recover from 'private-key-recovery';
or in es5: 
var recover = require('private-key-recovery')
```

Then, to start brute-forcing:
```
recover('KwNryX9f7WSjXNPjnsaefBohLwG9GPK6Y7VhvJKSwsxL8oy?????')
```

The correct private key will show up in your logs and it will be the return value of the function recover.

# License

MIT © Guus Baggen
