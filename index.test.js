const { isNode, isBrowser, getInfo } = require('./');

describe('Test node environment', () => {
  const origProcess = process;
  afterEach(() => {
    process = origProcess;
  });
  describe('isNode()', () => {
    test('returns true if it is node', () => {
      process = {
        version: 'v13.12.0',
        versions: {
          node: '13.12.0'
        },
        platform: 'mock-platform'
      };
      expect(isNode()).toEqual(true);
    });

    test('returns false if it is not node', () => {
      process = undefined;
      expect(isNode()).toEqual(false);
    });
  });
  describe('Node getInfo()', () => {
    test('returns node information', () => {
      process = {
        version: 'v13.12.0',
        versions: {
          node: '13.12.0'
        },
        platform: 'mock-platform'
      };
      const nodeInfo = getInfo();
      expect(nodeInfo.type).toEqual('node');
      expect(typeof nodeInfo.info).toEqual('object');
      expect(nodeInfo.info.version).toEqual('13.12.0');
      expect(nodeInfo.info.platform).toEqual('mock-platform');
    });
  });
});

describe('Test browser environment', () => {
  const origProcess = process;

  afterEach(() => {
    delete global.window;
    delete global.self;
    delete global.navigator;
    process = origProcess;
  });

  describe('isBrowser()', () => {
    test('returns true if it is browser', () => {
      global.window = {
        location: {
          origin: 'https://example.com'
        },
        document: {}
      };
      global.self = {
        name: 'mock-self'
      };
      expect(isBrowser()).toEqual(true);
    });

    test('returns false if it is not browser', () => {
      global.window = undefined;
      global.self = undefined;
      expect(isBrowser()).toEqual(false);
    });
  });
  describe('Browser getInfo()', () => {
    test('returns browser information', () => {
      process = {
        version: undefined,
        versions: {}
      };
      global.window = {
        location: {
          origin: 'https://example.com'
        },
        document: {}
      };
      global.self = {
        name: 'mock-self'
      };
      global.navigator = {
        userAgent: 'mock-user-agent'
      };
      const browserInfo = getInfo();
      expect(browserInfo.type).toEqual('browser');
      expect(typeof browserInfo.info).toEqual('object');
      expect(browserInfo.info.navigator).toEqual('mock-user-agent');
    });

    test('returns undefined navigator info if navigator is unavailable', () => {
      process = {
        version: undefined,
        versions: {}
      };
      global.window = {
        location: {
          origin: 'https://example.com'
        },
        document: {}
      };
      global.self = {
        name: 'mock-self'
      };
      global.navigator = undefined;
      const browserInfo = getInfo();
      expect(browserInfo.type).toEqual('browser');
      expect(browserInfo.info.navigator).toEqual(undefined);
    });
  });
});

describe('Test unknown environment', () => {
  const origProcess = process;

  beforeEach(() => {
    global.window = undefined;
  });

  afterEach(() => {
    delete global.window;
    process = origProcess;
  });

  describe('getInfo()', () => {
    test('returns unknown type if neither node nor browser is detected', () => {
      process = undefined;
      const info = getInfo();
      expect(info).toEqual({ type: 'unknown' });
    });
  });
});
