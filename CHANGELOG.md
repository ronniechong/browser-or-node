# Changelog

## 2.0.0

- **Breaking:** minimum supported Node.js version raised to 24 (`engines.node: ">=24"`)
- CI migrated from Travis CI to GitHub Actions
- `jest` moved from `dependencies` to `devDependencies`
- Published package now only includes `index.js`, `LICENSE`, and `README.md`
- Hardened `isBrowser()`/`getInfo()` against missing `navigator`, added test coverage for the `unknown` environment type

## 1.0.2

- Previous release, published from Travis CI, supporting Node 13+
