// tests/unit/services/service-hub-api.spec.js
import { expect } from 'chai'
import { ServiceHubAPI } from '@/services/service-hub-api'
import nock from 'nock'

describe('ServiceHubAPI', () => {
  describe('getDealerSettings', () => {
    describe('invalid parameters with exception', () => {
      it('should throw an exception if no params are provided', () => {
        expect(() => {
          ServiceHubAPI.getDealerSettings()
        }).to.throw('parameters are required')
      })
    }) // invalid parameters with exception
    describe('getReCaptchaToken', () => {
      let resolveData // eslint-disable-line no-unused-vars
      let rejectErr // eslint-disable-line no-unused-vars
      beforeEach((done) => {
        ServiceHubAPI.getReCaptchaToken('config')
          .then((data) => {
            resolveData = data
            done()
          }).catch((err) => {
            rejectErr = err
            done()
          })
      })
      it('should return a promise', () => {
        expect(resolveData).to.equal(null)
      })
    }) // getReCaptchaToken
    describe('buildSettingsParams (w/coupon)', () => {
      let resolveOfferParamsData // eslint-disable-line no-unused-vars
      let rejectOfferParamsErr // eslint-disable-line no-unused-vars
      beforeEach((done) => {
        ServiceHubAPI.buildSettingsParams({ couponId: 'cpu01' })
          .then((data) => {
            resolveOfferParamsData = data
            done()
          }).catch((err) => {
            rejectOfferParamsErr = err
            done()
          })
      })
      it('should resolve withe params object', () => {
        expect(resolveOfferParamsData).to.eql({ coupon: 'cpu01' })
      })
    }) // buildSettingsParams w/coupon
    describe('buildSettingsParams (wo/coupon)', () => {
      let resolveOfferParamsData // eslint-disable-line no-unused-vars
      let rejectOfferParamsErr // eslint-disable-line no-unused-vars
      beforeEach((done) => {
        ServiceHubAPI.buildSettingsParams()
          .then((data) => {
            resolveOfferParamsData = data
            done()
          }).catch((err) => {
            rejectOfferParamsErr = err
            done()
          })
      })
      it('should resolve with only a token', () => {
        expect(resolveOfferParamsData).to.eql({})
      })
    }) // buildSettingsParams wo/coupon
    describe('invalid parameters without exception', () => {
      let resolveData // eslint-disable-line no-unused-vars
      let rejectErr // eslint-disable-line no-unused-vars
      beforeEach((done) => {
        ServiceHubAPI.getDealerSettings({})
          .then((data) => {
            resolveData = data
            done()
          }).catch((err) => {
            rejectErr = err
            done()
          })
      })
      it('should have reject error because of missing dealer_id', () => {
        expect(rejectErr).to.exist
          .and.be.instanceOf(Error)
          .and.have.property('message', 'No dealer_id is present in hostname: undefined or as query string param')
      })
    }) // invalid parameters without exception
    describe('valid parameters', () => {
      let request // eslint-disable-line no-unused-vars
      let offerData
      let error // eslint-disable-line no-unused-vars
      beforeEach((done) => {
        request = nock(`${process.env.VUE_APP_SERVICE_BASE_URL}`)
          .get('/service_specials/settings/bmwalaska')
          .reply(200, {
            OpenHours:
            {
              1: [['6:00 AM', 6], ['6:30 AM', 6.5], ['1:30 PM', 13.5]]
            },
            dealership_id: 139,
            dealershipPhone: '2223339999',
            bdcEmail: 'email@dealer.com',
            dvm_attributes: {},
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
            offers: [
              {
                id: 'partsperc15',
                image: 'images/coupon_parts_image.jpg',
                amount: '15% Off',
                description: 'Any BMW Parts',
                details: 'Maximum discount of $200. Excludes tires. Please present coupon at time of write up.'
              }
            ]
          })
        ServiceHubAPI.getDealerSettings({ dealer_id: 'bmwalaska' })
          .then((data) => {
            offerData = data
            done()
          }).catch((err) => {
            error = err
            console.log(`reject err: ${err}`)
            done()
          })
      }) // beforeEach
      it('should return an object of offers', () => {
        expect(offerData.offers[0].id).to.equal('partsperc15')
      })
    }) // valid parameters
  }) // getDealerSettings
  describe('buildSettingsUrl', () => {
    it('should test URL', () => {
      expect(ServiceHubAPI.buildSettingsUrl('bmworlando')).to.equal('/service_specials/settings/bmworlando')
    })
  }) // buildSettingsUrl
  describe('postAppointment', () => {
    describe('invalid parameters', () => {
      describe('invalid parameters with exception', () => {
        it('should throw an exception if no params are provided', () => {
          expect(() => {
            ServiceHubAPI.postAppointment()
          }).to.throw('parameters, apppointment, dealer, and appointmentOrigin data required')
        })
      }) // invalid parameters with exception
    }) // invalid parameters
    describe('valid parameters', () => {
      let requestNock // eslint-disable-line no-unused-vars
      let params, apptData, dealerData, appointmentOrigin
      let requestUri, requestBody // eslint-disable-line no-unused-vars
      let postResult // eslint-disable-line no-unused-vars
      let error // eslint-disable-line no-unused-vars
      beforeEach((done) => {
        requestNock = nock(`${process.env.VUE_APP_SERVICE_BASE_URL}`)
          .post('/service_specials/appointment/')
          .reply(200, (uri, body) => {
            requestUri = uri
            requestBody = body
          })
        params = {
          utm_email: 'ken@gmail.com',
          utm_content: 'genperc20',
          querystring: 'utm_email=ken@gmail.com&utm_content=genperc20'
        }
        apptData = {
          email: 'ken@gmail.com',
          phone: '3332221111',
          dateTime: new Date('2019-09-26 8:30'),
          smsConsent: true
        }
        dealerData = {
          id: 139,
          name: 'BMW Northwest',
          email: {
            bdc: 'email@dealer.com'
          },
          address: {
            street: '4011 20th St E',
            city: 'Tacoma',
            state: 'WA',
            zip: '98424'
          },
          expirationDays: 30,
          affiliate: 'This site is an affiliate of BMW Northfield customer experience.',
          phone: {
            service: '877.731.2041',
            sales: '877.730.3012',
            parts: '877.859.9237',
            bdc: '2223339999'
          },
          url: {
            about: 'https://www.bmwnorthwest.com/dealership/about.htm',
            privacy: 'https://www.bmwnorthwest.com/privacy.htm',
            directions: 'https://www.bmwnorthwest.com/dealership/directions.htm',
            sitemap: 'https://www.bmwnorthwest.com/sitemap.htm',
            contact: 'https://www.bmwnorthwest.com/contact.htm',
            appointment: 'https://www.bmwnorthwest.com/service/schedule-bmw-service.htm',
            home: 'https://www.bmwnorthwest.com'
          }
        }
        appointmentOrigin = {
          coupon: 'genperc20'
        }
        ServiceHubAPI.postAppointment(params, apptData, dealerData, appointmentOrigin)
          .then((data) => {
            postResult = data
            done()
          }).catch((err) => {
            error = err
            console.log(`reject err: ${err}`)
            done()
          })
      }) // beforeEach
      it('should successfully post appt', () => {
        expect(requestBody).to.eql(JSON.stringify({
          utm_email: 'ken@gmail.com',
          utm_content: 'genperc20',
          querystring: 'utm_email=ken@gmail.com&utm_content=genperc20',
          submittedEmail: 'ken@gmail.com',
          submittedPhone: '3332221111',
          submittedApptDate: '2019-09-26T08:30:00',
          submittedSMSConsent: true,
          bdcEmail: 'email@dealer.com',
          dealershipId: 139,
          dealershipPhone: '2223339999',
          submittedCoupon: 'genperc20',
          dealershipName: 'BMW Northwest'
        }))
      })
    }) // valid parameters
  }) // postAppointment
  describe('brandTips', () => {
    let request // eslint-disable-line no-unused-vars
    beforeEach(() => {
      request = nock(process.env.VUE_APP_BRAND_STATIC_DATA)
        .get('/static/data/bmw.tips.json')
        .reply(200, {})
    })
    it('should load the brand tips', (done) => {
      ServiceHubAPI.brandTips('bmw').then((tips) => {
        expect(tips).to.eql({})
        done()
      })
    })
  }) // brandTips
}) // ServiceHubAPI
