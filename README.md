# browser-or-node

![NPM](https://img.shields.io/npm/l/@digitalronin/browser-or-node)
[![npm (scoped)](https://img.shields.io/npm/v/@digitalronin/browser-or-node)](https://npmjs.org/package/@digitalronin/browser-or-node "View this project on npm")
[![Test](https://github.com/ronniechong/browser-or-node/actions/workflows/test.yml/badge.svg)](https://github.com/ronniechong/browser-or-node/actions/workflows/test.yml)

A tiny, zero-dependency-at-runtime utility for detecting whether your code is running in a browser or in Node.js, and for pulling basic environment info once you know which.

Useful for isomorphic/universal JavaScript modules that need to branch their behavior depending on the runtime — for example, choosing `fetch` vs. a Node HTTP client, or deciding whether `window`/`document` are safe to touch.

## Installing

```
# using NPM
> npm install @digitalronin/browser-or-node -S

# using Yarn
> yarn add @digitalronin/browser-or-node --save
```

## Usage

```javascript
const { isNode, isBrowser, getInfo } = require('@digitalronin/browser-or-node');

console.log(isNode());
console.log(isBrowser());
console.log(getInfo());
```

## API

### `isNode()`

Returns `true` if the code is running in a Node.js process, `false` otherwise.

```javascript
if (isNode()) {
  // safe to use Node-only APIs, e.g. `fs`, `process.env`
}
```

### `isBrowser()`

Returns `true` if the code is running in a browser (i.e. `window` and `window.document` are defined), `false` otherwise.

```javascript
if (isBrowser()) {
  // safe to use `window`, `document`, `navigator`, etc.
}
```

### `getInfo()`

Returns an object describing the current environment, shaped differently depending on the runtime:

- In Node.js:

  ```javascript
  {
    type: 'node',
    info: {
      version: '24.0.0',   // process.versions.node
      platform: 'darwin',  // process.platform
    }
  }
  ```

- In a browser:

  ```javascript
  {
    type: 'browser',
    info: {
      navigator: 'Mozilla/5.0 ...', // navigator.userAgent, or undefined if unavailable
    }
  }
  ```

- If neither Node.js nor a browser is detected (e.g. a Web Worker or an unusual embedded runtime):

  ```javascript
  {
    type: 'unknown'
  }
  ```

## Development

```
> yarn install
> yarn test
```

Tests run via [Jest](https://jestjs.io/) and are checked on every push/PR by [GitHub Actions](https://github.com/ronniechong/browser-or-node/actions).

## License

MIT
