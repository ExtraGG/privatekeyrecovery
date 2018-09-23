# Bitcoin private key recovery

![Build Status](https://travis-ci.org/GuusBaggen/privatekeyrecovery.svg?branch=master)
![dependencies](https://img.shields.io/hackage-deps/v/lens.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

# Description
Recovers a broken private key that misses up to 5 characters. It brute forces its way until the checksum is correct for the private key (thus having found the original key). Make sure to place '?' at places where the characters are unknown. Currently only 52 character WIF keys are supported. It could  find 6 missing characters, though this would take approximately one day.


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
recover('KwNryX9f7W?jXNPjn?aefBoh?wG9GPK6Y7Vh?JKSwsxL8oy5T?q1') // question marks throughout the key

recover('wNryX9f7WSjXNPjnsaefBohLwG9GPK6Y7VhvJKSwsxL8oy?????')   // with question marks at the end
```

The recovered private key will show up in your logs and it will be the return value of the function recover.

# License

MIT © Guus Baggen
