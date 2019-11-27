// utils/data-cache.js
export class DataCache {
  static reset () {
    // reset the whole cache
    DataCache.cache = {}
  }
  static get (key, options) {
    let data = DataCache.cache[key]
    if (typeof data === 'undefined') {
      if (options !== null && typeof options === 'object' && options.hasOwnProperty('default')) {
        data = options.default
      } else {
        data = null
      }
    }
    return data
  }
  static save (key, data) {
    DataCache.cache[key] = data
    return DataCache.cache[key]
  }
  static remove (key) {
    let data = DataCache.get(key)
    DataCache[key] = null
    return data
  }
}

DataCache.cache = {}
