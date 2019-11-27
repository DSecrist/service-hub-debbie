// tests/unit/models/settings-model.spec.js
import { expect } from 'chai'
import { SettingsModel } from '@/models/settings-model'
import dealerSettingsV1 from '../data/dealer-v1.settings.json'
import dealerNormalizedV1 from '../data/dealer-v1.normalized.json'
import dealerNormalizedV2 from '../data/dealer-v2.normalized.json'

describe('SettingsModel', () => {
  describe('convertTo', () => {
    describe('clean  data', () => {
      it('should normalize the settings data', () => {
        let settingsModel = new SettingsModel(dealerSettingsV1)
        expect(settingsModel.convertTo({ version: 1 })).to.eql(dealerNormalizedV1)
      })
      it('should normalize version 1 to version 2', () => {
        let settingsModel = new SettingsModel(dealerSettingsV1)
        expect(settingsModel.convertTo({ version: 2 })).to.eql(dealerNormalizedV2)
      })
      it('should validate normalize 2', () => {
        let settingsModel = new SettingsModel(dealerNormalizedV2)
        expect(settingsModel.convertTo({ version: 2 })).to.eql(dealerNormalizedV2)
      })
    }) // clean data
    describe('dirty data', () => {
      let settingsData
      beforeEach(() => {
        settingsData = {
          OpenHours: {
            1: [['6:00 AM', 6], ['6:30 AM', 6.5], ['1:30 PM', 13.5]]
          },
          dealership_id: 139,
          dealershipPhone: '2223339999',
          bdcEmail: 'email@dealer.com',
          brand: {},
          dealer: {
            name: 'BMW Northwest',
            address: '4011 20th St E Tacoma, WA, 98424',
            expirationDays: 30,
            affiliate: 'This site is an affiliate of BMW Northfield customer experience.',
            phone: {
              service: '877.731.2041',
              sales: '877.730.3012'
            },
            url: {
              about: 'https://www.bmwnorthwest.com/dealership/about.htm',
              privacy: 'https://www.bmwnorthwest.com/privacy.htm',
              directions: 'https://www.bmwnorthwest.com/dealership/directions.htm',
              sitemap: 'https://www.bmwnorthwest.com/sitemap.htm',
              contact: 'https://www.bmwnorthwest.com/contact.htm',
              home: 'BMWNorthwest.com'
            }
          },
          dvm_attributes: {},
          offers: [
            {
              id: 'partsperc15',
              image: 'images/coupon_parts_image.jpg',
              amount: '15% Off',
              description: 'Any BMW Parts',
              details: 'Maximum discount of $200. Excludes tires. Please present coupon at time of write up.'
            }
          ]
        }
      }) // beforeEach
      it('should be able to convert the dirty data to version 1', () => {
        let settingsModel = new SettingsModel(settingsData)
        expect(settingsModel.convertTo({ version: 1 })).to.be.an.instanceOf(Object)
      })
      it('should be able to convert the dirty data to version 1', () => {
        let settingsModel = new SettingsModel(settingsData)
        expect(settingsModel.convertTo({ version: 2 })).to.be.an.instanceOf(Object)
      })
    })
    describe('ensure key data attributes exist in the payload', () => {
      let settingsData
      beforeEach(() => {
        settingsData = {
          brand: {
            name: 'bmw'
          },
          dealer: {
            name: 'BMW Northwest',
            googleAnalyticsPropertyId: 'UA-XXYYZZ-1'
          }
        }
      }) // beforeEach
      it('dealer node missing', () => {
        delete settingsData.dealer
        let settingsModel = new SettingsModel(settingsData)
        expect(() => {
          settingsModel.convertTo({ version: 2 })
        }).to.throw('dealer node required')
      })
      it('dealer.name is required', () => {
        delete settingsData.dealer.name
        let settingsModel = new SettingsModel(settingsData)
        expect(() => {
          settingsModel.convertTo({ version: 2 })
        }).to.throw('dealer.name is required')
      })
      it('dealer.googleAnalyticsPropertyId is required', () => {
        delete settingsData.dealer.googleAnalyticsPropertyId
        let settingsModel = new SettingsModel(settingsData)
        expect(() => {
          settingsModel.convertTo({ version: 2 })
        }).to.throw('dealer.analytics id is required')
      })
      it('brand node required', () => {
        delete settingsData.brand
        let settingsModel = new SettingsModel(settingsData)
        expect(() => {
          settingsModel.convertTo({ version: 2 })
        }).to.throw('brand node required')
      })
      it('brand.name is required', () => {
        delete settingsData.brand.name
        let settingsModel = new SettingsModel(settingsData)
        expect(() => {
          settingsModel.convertTo({ version: 2 })
        }).to.throw('brand.name is required')
      })
    }) // ensure key data attributes are in version 2 payload
  }) // convertTo
}) // ServiceHubAPI
