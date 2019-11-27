// tests/unit/utils/filters.spec.js
import { expect } from 'chai'
import { phoneFormatter } from '@/utils/filters'

describe('filters', () => {
  describe('phoneFormatter', () => {
    it('should format all numbers to normalized format', () => {
      expect(phoneFormatter('9992226666', 'full')).to.equal('(999) 222-6666')
    })
    it('should default to full', () => {
      expect(phoneFormatter('9992226666')).to.equal('(999) 222-6666')
    })
    it('should format phone as compact, no delimiters', () => {
      expect(phoneFormatter('9992226666', 'compact')).to.equal('9992226666')
    })
    it('should return the source string if it is not a valid string', () => {
      expect(phoneFormatter('99')).to.equal('99')
    })
    it('should return an empty string if the source is empty', () => {
      expect(phoneFormatter('')).to.equal('')
    })
  })
}) // Filters
