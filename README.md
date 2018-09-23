# Bitcoin private key recovery

![Build Status](https://travis-ci.org/GuusBaggen/privatekeyrecovery.svg?branch=master)
![dependencies](https://img.shields.io/hackage-deps/v/lens.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

# Description
Recovers a broken private key that misses up to 5 characters within one hour or faster. It brute forces its way until the checksum (base58check) is correct for the private key (thus having found the original key). Make sure to place '?' at places where the characters are unknown. Currently only 52 character WIF keys are supported. It could  find 6 missing characters, though this would take approximately one day.


# Installation
```
yarn add private-key-recovery 
npm i private-key-recovery
```

Import it:
```
var recover = require('private-key-recovery')
```

# Usage

You can do 

```
// question marks throughout the key
recover('KwNryX9f7W?jXNPjn?aefBoh?wG9GPK6Y7Vh?JKSwsxL8oy5T?q1') 

// or e.g. all question marks next to each other
recover('wNryX9f7WSjXNPjnsaefBohLwG9GPK6Y7VhvJKSwsxL8oy?????')  
```

The recovered private key will show up in your logs and it will be the return value of the function recover.

The function recover takes additional arguments. You can tell it how frequently it should log to the console (number) and on what number it should start with iterating.

The order that is implemented in this module of base58 is
`123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ`

# License

MIT © Guus Baggen
