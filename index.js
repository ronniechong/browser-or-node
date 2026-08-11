function isNode() {
  if (typeof process !== 'undefined' && process.version && process.versions.node) {
    return true;
  }
  return false;
}

function isBrowser() {
  if (typeof window !== 'undefined' && typeof window.document !== 'undefined') {
    return true;
  }
  return false;
}

function getInfo() {
  const isRunningNode = isNode();
  const isRunningBrowser = isBrowser();
  if (isRunningNode) {
    return {
      type: 'node',
      info: {
        version: process.versions.node,
        platform: process.platform
      }
    }
  } else if (isRunningBrowser) {
    return {
      type: 'browser',
      info: {
        navigator: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
      }
    }
  }
  return {
    type: 'unknown'
  }
}

module.exports = {
  isNode,
  isBrowser,
  getInfo
}
