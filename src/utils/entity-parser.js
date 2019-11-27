// utils/entity-parser.js
const phoneRx = /\+?\d?\w*(\d{3})[ -\.]*(\d{3})[ -\.]*(\d{4})/ // eslint-disable-line no-useless-escape
const fullDateRx = /(\w+)[, ]+(\w+)[, ]+(\d+)\w*[, ]+(\d+)/ // eslint-disable-line no-useless-escape
const fullTimeRx = /(\d+):(\d+) (AM|PM)/ // eslint-disable-line no-useless-escape
const fullTime24hrRx = /(\d+):(\d+)/ // eslint-disable-line no-useless-escape
const dateParserRx = /(\d{4})[\/\-\.\s](\d{2})[\/\-\.\s](\d{2})/ // eslint-disable-line no-useless-escape
const timeParserRx = /(\d{2})[:\.\s](\d{2})[:\.\s](\d{2})/ // eslint-disable-line no-useless-escape
export class EntityParser {
  // part1, part2, part3, number
  static phoneNumber (src) {
    let phone
    if (src && typeof src === 'string') {
      const phoneRxResult = src.match(phoneRx)
      if (phoneRxResult) {
        phone = [phoneRxResult[1], phoneRxResult[2], phoneRxResult[3]]
      } else {
        phone = null
      }
    } else {
      phone = null
    }
    return phone
  } // phoneNumber
  static fullDate (src) {
    let result
    if (src && typeof src === 'string') {
      const srcMatch = src.match(fullDateRx)
      if (srcMatch) {
        result = new Date(`${srcMatch[2]} ${srcMatch[3]} ${srcMatch[4]}`)
      } else {
        result = new Date()
      }
    } else {
      result = new Date()
    }
    return result
  }
  static strFill (src, fillChar, desiredLen) {
    let result
    if (src.length >= desiredLen) {
      result = src
    } else {
      result = ''
      for (let i = 0; i < desiredLen - src.length; i++) {
        result += fillChar
      }
      result += src
    }
    return result
  }
  static normalizeTime (src) {
    let result
    if (src && typeof src === 'string') {
      const srcMatch = src.match(fullTimeRx)
      if (srcMatch) {
        let hour
        if (srcMatch[3] === 'AM') {
          hour = srcMatch[1]
        } else {
          let hourInt = Number.parseInt(srcMatch[1])
          if (hourInt < 12) {
            hourInt += 12
          }
          hour = `${hourInt}`
        }
        result = `${EntityParser.strFill(hour, '0', 2)}:${srcMatch[2]}:00`
      } else {
        // check if 24hr time
        const src24hrMatch = src.match(fullTime24hrRx)
        if (src24hrMatch) {
          result = `${EntityParser.strFill(src24hrMatch[1], '0', 2)}:${src24hrMatch[2]}:00`
        } else {
          result = new Date()
        }
      }
    } else {
      result = ''
    }
    return result
  }
  static dateFromString (dateSrc, timeSrc) {
    const dtMatch = dateSrc.match(dateParserRx)
    if (dtMatch) {
      let dt = [0, 0, 0]
      for (let i = 0; i < 3; i++) {
        dt[i] = Number.parseInt(dtMatch[i + 1])
      }
      const tmMatch = timeSrc.match(timeParserRx)
      if (tmMatch) {
        let tm = [0, 0, 0]
        for (let i = 0; i < 3; i++) {
          tm[i] = Number.parseInt(tmMatch[i + 1])
        }
        return new Date(dt[0], dt[1] - 1, dt[2], tm[0], tm[1], tm[2])
      } else {
        throw new Error('Invalid time source:  must be of the form HH:MM:SS')
      }
    } else {
      throw new Error('Invalid date soure: must be of form YYYY/MM/DD')
    }
  }
}
