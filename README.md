# browser-or-node
![NPM](https://img.shields.io/npm/l/@digitalronin/browser-or-node)
[![npm version](http://img.shields.io/npm/v/REPO.svg?style=flat)](https://npmjs.org/package/@digitalronin/browser-or-node "View this project on npm")

Check for browser or node environment

## Installing

```
# using NPM
> npm install @digitalronin/browser-or-node -S

# using Yarn
> yarn add @digitalronin/browser-or-node --save
```

## Running

```javascript
const { isNode, isBrowser, getInfo } = require('browser-or-node');
console.log(isNode());
console.log(isBrowser());
console.log(getInfo());
```
