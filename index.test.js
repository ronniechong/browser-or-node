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
      }
      expect(isNode()).toEqual(true);
    })

    test('returns true if it is node', () => {
      process = undefined;
      expect(isNode()).toEqual(false);
    })
  });
  describe('Node getInfo()', () => {
    test('returns node information', () => {
      process = {
        version: 'v13.12.0',
        versions: {
          node: '13.12.0'
        },
        platform: 'mock-platform'
      }
      const nodeInfo = getInfo();
      expect(nodeInfo.type).toEqual('node');
      expect(typeof nodeInfo.info).toEqual('object');
      expect(nodeInfo.info.version).toEqual('13.12.0');
      expect(nodeInfo.info.platform).toEqual('mock-platform');
    })
  });
});

describe('Test browser environment', () => {
  const origProcess = process;
  let windowSpy;
  let selfSpy;
  let navigatorSpy;
  beforeEach(() => {
    windowSpy = jest.spyOn(global, 'window', 'get');
    selfSpy = jest.spyOn(global, 'self', 'get');
    navigatorSpy = jest.spyOn(global, 'navigator', 'get');
  });

  afterEach(() => {
    windowSpy.mockRestore();
    selfSpy.mockRestore();
    navigatorSpy.mockRestore();
    process = origProcess;
  });

  describe('isBrowser()', () => {
    test('returns true if it is node', () => {
      windowSpy.mockImplementation(() => ({
        location: {
          origin: 'https://example.com'
        },
        document: {}
      }));
      selfSpy.mockImplementation(() => ({
        name: 'mock-self'
      }));
      expect(isBrowser()).toEqual(true);
    })

    test('returns true if it is node', () => {
      windowSpy.mockImplementation(() => undefined);
      selfSpy.mockImplementation(() => undefined);
      expect(isBrowser()).toEqual(false);
    })
  });
  describe('Browser getInfo()', () => {
    test('returns node information', () => {
      process = {
        version: undefined,
        versions: {}
      }
      windowSpy.mockImplementation(() => ({
        location: {
          origin: 'https://example.com'
        },
        document: {}
      }));
      selfSpy.mockImplementation(() => ({
        name: 'mock-self'
      }));
      navigatorSpy.mockImplementation(() => ({
        userAgent: 'mock-user-agent'
      }));
      const browserInfo = getInfo();
      expect(browserInfo.type).toEqual('browser');
      expect(typeof browserInfo.info).toEqual('object');
      expect(browserInfo.info.navigator).toEqual('mock-user-agent');
    })
  });
});

