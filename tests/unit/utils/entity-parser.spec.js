// tests/unit/utils/entity-parser.spec.js
import { expect } from 'chai'
import { EntityParser } from '@/utils/entity-parser'

describe('EntityParser', () => {
  describe('phoneNmber', () => {
    it('should return empty string for empty string', () => {
      expect(EntityParser.phoneNumber('')).to.equal(null)
    })
    it('should return null for no parameters', () => {
      expect(EntityParser.phoneNumber()).to.equal(null)
    })
    it('should return null for invalid phone', () => {
      expect(EntityParser.phoneNumber(1)).to.equal(null)
    })
    it('should properly parse a number with no formatting', () => {
      expect(EntityParser.phoneNumber('7773332222')).to.eql(['777', '333', '2222'])
    })
    it('should properly parse a number with - formatting', () => {
      expect(EntityParser.phoneNumber('777-333-2222')).to.eql(['777', '333', '2222'])
    })
    it('should properly parse a number with . formatting', () => {
      expect(EntityParser.phoneNumber('777.333.2222')).to.eql(['777', '333', '2222'])
    })
    it('should properly parse a number with - formatting and spaces', () => {
      expect(EntityParser.phoneNumber('777 - 333 - 2222')).to.eql(['777', '333', '2222'])
    })
    it('should properly parse a number with area code in parenthesis', () => {
      expect(EntityParser.phoneNumber('(777) 333-2222')).to.eql(['777', '333', '2222'])
    })
    it('should strip off a leading 1 from the phone number', () => {
      expect(EntityParser.phoneNumber('12123445555')).to.eql(['212', '344', '5555'])
    })
  }) // phoneNumber
  describe('fullDate', () => {
    it('should return a date object', () => {
      expect(EntityParser.fullDate()).instanceOf(Date)
    })
    it('should return a date for Friday, September 27th, 2019', () => {
      let localDateString = new Date('09/27/2019').toLocaleDateString()
      expect(EntityParser.fullDate('Friday, September 27th, 2019').toLocaleDateString()).to.eql(localDateString)
    })
  }) // fullDate
  describe('strFill', () => {
    it('should do nothing', () => {
      expect(EntityParser.strFill('30', '0', 2)).to.equal('30')
    })
    it('should fill in with 1 zero', () => {
      expect(EntityParser.strFill('3', '0', 2)).to.equal('03')
    })
  }) // strFill
  describe('normalizeTime', () => {
    it('should convert AM to 24hr time including seconds and zero fill hour', () => {
      expect(EntityParser.normalizeTime('6:00 AM')).to.equal('06:00:00')
    })
    it('should convert AM to 24hr time including seconds', () => {
      expect(EntityParser.normalizeTime('06:00 AM')).to.equal('06:00:00')
    })
    it('should convert pm time to 24hr time', () => {
      expect(EntityParser.normalizeTime('1:30 PM')).to.equal('13:30:00')
    })
    it('should be able to handle 24hr AM time as input', () => {
      expect(EntityParser.normalizeTime('6:30')).to.equal('06:30:00')
    })
    it('should be able to handle 24hr PM time as input', () => {
      expect(EntityParser.normalizeTime('13:30')).to.equal('13:30:00')
    })
    it('should convert 12pm to proper 24hr time', () => {
      expect(EntityParser.normalizeTime('12:00 PM')).to.equal('12:00:00')
    })
  }) // normalizeTime
  describe('dateFromString', () => {
    it('should throw an error for invalid date parameters', () => {
      expect(() => {
        EntityParser.dateFromString('19/01/01', '00:00:00')
      }).to.throw('Invalid date soure: must be of form YYYY/MM/DD')
    })
    it('should throw an error for invalid time parameter', () => {
      expect(() => {
        EntityParser.dateFromString('2019/01/01', '12:1:1')
      }).to.throw('Invalid time source:  must be of the form HH:MM:SS')
    })
    describe('validate different delimiters for date and time', () => {
      let dt
      beforeEach(() => {
        dt = new Date(2019, 8, 1, 0, 0, 0)
      })
      it('should support date delimter -', () => {
        expect(EntityParser.dateFromString('2019-09-01', '00:00:00')).to.eql(dt)
      })
      it('should support date delimter /', () => {
        expect(EntityParser.dateFromString('2019/09/01', '00:00:00')).to.eql(dt)
      })
      it('should support date delimter .', () => {
        expect(EntityParser.dateFromString('2019.09.01', '00:00:00')).to.eql(dt)
      })
      it('should support date delimter <space>', () => {
        expect(EntityParser.dateFromString('2019 09 01', '00:00:00')).to.eql(dt)
      })
      it('should support time delimeter .', () => {
        expect(EntityParser.dateFromString('2019-09-01', '00.00.00')).to.eql(dt)
      })
      it('should support time delimeter <space>', () => {
        expect(EntityParser.dateFromString('2019-09-01', '00 00 00')).to.eql(dt)
      })
    })
  })
}) // EntityParser
