// tests/unit/utils/data-cache.spec.js
import { expect } from 'chai'
import { DataCache } from '@/utils/data-cache'

describe('DataCache', () => {
  beforeEach(() => {
    DataCache.reset()
  })
  describe('get', () => {
    it('should return null for a non existent key', () => {
      expect(DataCache.get('key')).to.equal(null)
    })
    it('should get the value that was previously stored', () => {
      const data = { item: 'more data to store' }
      DataCache.save('key2', data)
      expect(DataCache.get('key2')).to.equal(data)
    })
    it('should return the default value instead of null for a non existent key', () => {
      expect(DataCache.get('key3', { default: false })).to.equal(false)
    })
    it('should return null if we pass in null for options', () => {
      expect(DataCache.get('key4', null)).to.equal(null)
    })
  }) // get
  describe('save', () => {
    it('should return the data it saved', () => {
      const data = { data: 'to be stored' }
      expect(DataCache.save('key', data)).to.equal(data)
    })
  }) // save
  describe('remove', () => {
    it('should return the previous value wich would be null', () => {
      expect(DataCache.remove('key1')).to.equal(null)
    })
  }) // remove
  describe('save(<key>, false)', () => {
    it('should return false', () => {
      DataCache.save('fred', false)
      expect(DataCache.get('fred')).to.equal(false)
    })
  }) // save(<key>, false)
}) // DataCache
