# browser-or-node

![NPM](https://img.shields.io/npm/l/@digitalronin/browser-or-node)
[![npm (scoped)](https://img.shields.io/npm/v/@digitalronin/browser-or-node)](https://npmjs.org/package/@digitalronin/browser-or-node 'View this project on npm')
![node-current](https://img.shields.io/node/v/@digitalronin/browser-or-node)
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
    type: 'unknown';
  }
  ```

## Development

```
> yarn install
> yarn test
```

Tests run via [Jest](https://jestjs.io/) and are checked on every push/PR by [GitHub Actions](https://github.com/ronniechong/browser-or-node/actions).

## Publishing

Publishing to npm is automated via [GitHub Actions](.github/workflows/release.yml) and is triggered by creating a GitHub Release — there is no manual `npm publish` step.

1. Bump the `version` field in `package.json` (following [semver](https://semver.org/)) and commit the change to `master`.
2. Create a GitHub Release with a tag matching the new version, prefixed with `v` (e.g. `v2.0.1`):
   ```
   > gh release create v2.0.1 --title "v2.0.1" --notes "Description of the change"
   ```
   This can also be done from the "Releases" page in the GitHub UI.
3. Publishing the release triggers the `Release` workflow, which:
   - Installs dependencies
   - Runs `format:check` and `test`
   - Publishes the package to the npm registry with [provenance](https://docs.npmjs.com/generating-provenance-statements) attached
4. Once the workflow completes successfully, the new version is live on npm. Progress can be checked under the repo's [Actions tab](https://github.com/ronniechong/browser-or-node/actions).

The workflow authenticates to npm using OpenID Connect (trusted publishing) — no npm token or local `npm login` is needed to release a new version.

## License

MIT
