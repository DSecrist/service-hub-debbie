// utils/url-parser.js
export class UrlParser {
  static parseURL (url) {
    let result = {}
    if (typeof url === 'string' && url.indexOf('?') > -1) {
      const queryParams = url.substring(url.indexOf('?') + 1)
      const substrEnd = queryParams.lastIndexOf('#/') === -1 ? queryParams.length : queryParams.lastIndexOf('#/')
      const queryString = queryParams.substring(0, substrEnd)
      const items = queryString.split('&')
      // always include the queryString in the result
      result.querystring = queryString
      for (let i = 0; i < items.length; i++) {
        const item = items[i].split('=')
        // only add item to result if we have key
        if (item[0].length > 0) {
          result[item[0]] = decodeURIComponent(item[1])
        }
      } // loop over all key=value pairs
    } // input is a string
    return result
  }
  static parseDomain (url) {
    let result = { domain: '', subDomain: '', hostName: '' }
    if (typeof url === 'string') {
      const match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i)
      if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
        result.hostName = match[2]
        const hostNameParts = result.hostName.split('.')
        if (hostNameParts.length > 2) {
          result.subDomain = hostNameParts.slice(0, hostNameParts.length - 2).join('.')
          result.domain = hostNameParts.slice(hostNameParts.length - 2, hostNameParts.length).join('.')
        } else if (hostNameParts.length === 1) {
          result.domain = result.hostName
        }
      }
    }
    return result
  }
  static parseParams (url) {
    const domain = UrlParser.parseDomain(url)
    const urlParams = UrlParser.parseURL(url)
    // if the dealer_id is specified in the url params then let it be the priority,
    // otherwise make the dealer_id equal to the hostname
    if (!urlParams.dealer_id && typeof domain.hostName === 'string' && domain.hostName.length > 0) {
      urlParams.dealer_id = domain.hostName
    }
    return urlParams
  }
}
