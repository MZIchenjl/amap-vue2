import _ from 'lodash';
import AMapLoader from '@amap/amap-jsapi-loader';

// amap plugin prefix reg
const AMAP_PREGFIX_REG = /^AMap./;

const DEFAULT_AMP_CONFIG = {
  key: null,
  version: '2.0',
  plugins: []
};

export default class AMapAPILoader {
  /**
   * @param config required 初始化参数
   */
  constructor(config) {
    this._config = {
      ...DEFAULT_AMP_CONFIG,
      ...config
    };
    this._document = document;
    this._window = window;
  }

  load() {
    if (this._scriptLoadingPromise) return this._scriptLoadingPromise;
    this._scriptLoadingPromise = AMapLoader.load(this._getConfigs());
    return this._scriptLoadingPromise;
  }

  _getConfigs() {
    const ret = {...this._config};
    // check 'AMap.' prefix
    if (ret.plugins && ret.plugins.length > 0) {
      // push default types
      ret.plugins.push('PlaceSearch', 'PolyEditor', 'CircleEditor');

      const plugins = [];

      // fixed plugin name compatibility.
      ret.plugins.forEach(item => {
        const prefixName = (AMAP_PREGFIX_REG.test(item)) ? item : 'AMap.' + item;

        plugins.push(prefixName);
      });

      ret.plugins = _.uniq(plugins);
    }
    return ret;
  }

}
