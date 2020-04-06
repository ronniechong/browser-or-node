# browser-or-node
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
