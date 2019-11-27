// services/service-hub-api.js
import axios from 'axios'
import { format } from 'date-fns'
import { SettingsModel } from '@/models/settings-model'
import { DataCache } from '@/utils/data-cache'

const RECAPTCHA_TOKEN = '6Lcq3awUAAAAAPF4IlbO2g_m33h9BEKzj2UVUR_w'
export class ServiceHubAPI {
  // umbrella method that will download the specified dealer settings and properly handles
  // different domains and urls for test, development, staging, and production
  static getDealerSettings (params) {
    // params required
    if (!params) {
      throw new Error('parameters are required')
    }
    return new Promise((resolve, reject) => {
      // only make the api call if we have a dealer id
      if (typeof params.dealer_id === 'string' && params.dealer_id.length > 0) {
        const axiosInstance = axios.create({
          baseURL: process.env.VUE_APP_SERVICE_BASE_URL,
          timeout: 5000
        })
        ServiceHubAPI.buildSettingsParams({ couponId: params.utm_content })
          .then((offerParams) => {
            axiosInstance.get(ServiceHubAPI.buildSettingsUrl(params.dealer_id), {
              params: offerParams
            }).then((response) => {
              if (process.env.VUE_APP_MODE !== 'production' && process.env.VUE_APP_MODE !== 'test') {
                console.log(`Response Headers for settings: ${JSON.stringify(response.headers)}`)
                console.log(`Settings for [${params.dealer_id}]`)
                console.log(`${JSON.stringify(response.data)}`)
              }
              let settingsData = new SettingsModel(response.data)
              resolve(settingsData.convertTo({ version: 2 }))
            }).catch((err) => {
              let message
              if (process.env.VUE_APP_MODE !== 'production') {
                message = `${err.response.status} ${err.response.statusText} for dealer_id: ${params.dealer_id}.  Error retrieving ${err.response.request.responseURL}`
              } else {
                message = `Failed to load dealer configuration`
              }
              reject(new Error(message))
            })
          })
      } else {
        let message
        if (process.env.VUE_APP_MODE !== 'production') {
          message = `No dealer_id is present in hostname: ${params.hostName} or as query string param`
        } else {
          message = 'dealer id required'
        }
        reject(new Error(message))
      }
    })
  } // getDealerSettings
  static getReCaptchaToken (action) {
    return new Promise((resolve, reject) => {
      // we determine if we need to generate a token based on a settings variable.
      if (process.env.VUE_APP_USE_RECAPTCHA_TOKEN === 'yes') {
        window.grecaptcha.ready(() => {
          window.grecaptcha.execute(RECAPTCHA_TOKEN, { action: action })
            .then((token) => {
              resolve(token)
            })
        })
      } else {
        resolve(null)
      }
    })
  }
  static buildSettingsUrl (dealerId) {
    let oURL
    if (process.env.VUE_APP_MODE === 'development') {
      oURL = `/static/dealer_test_data/${dealerId}.json`
    } else {
      oURL = `/service_specials/settings/${dealerId}`
    }
    return oURL
  } // buildSettingsUrl
  static buildSettingsParams (options) {
    let result = {}
    return new Promise((resolve, reject) => {
      ServiceHubAPI.getReCaptchaToken('settings')
        .then((token) => {
          if (token) {
            result.token = token
          }
          if (options && options.couponId && typeof options.couponId === 'string' && options.couponId.length > 0) {
            result.coupon = options.couponId
          }
          resolve(result)
        })
    })
  } // buildSettingsParams
  static buildAppointmentPayload (params, apptData, dealer, appointmentOrigin) {
    let payload = Object.assign({}, params)
    payload.submittedEmail = apptData.email
    payload.submittedPhone = apptData.phone
    payload.submittedApptDate = format(apptData.dateTime, "yyyy-MM-dd'T'HH:mm:ss")
    payload.submittedSMSConsent = apptData.smsConsent
    payload.bdcEmail = dealer.email.bdc
    payload.dealershipId = dealer.id
    payload.dealershipPhone = dealer.phone.bdc
    // if the appointment is triggered within the context of a coupon it will be present in the
    // appointmentOrigin.
    if (appointmentOrigin.coupon && appointmentOrigin.coupon.length > 0) {
      payload.submittedCoupon = appointmentOrigin.coupon
    }
    payload.dealershipName = dealer.name
    return new Promise((resolve) => {
      ServiceHubAPI.getReCaptchaToken('appointment')
        .then((token) => {
          if (token) {
            payload.token = token
          }
          resolve(payload)
        })
    })
  }
  // postAppointment - post the appointment to the API.  Two object parameters are required.
  // params - are the input params to the app in raw form and parsed form (see UrlParser.parseURL)
  // apptData - the appointment date, email, phonenumber, consent, date, and time.
  static postAppointment (params, apptData, dealer, appointmentOrigin) {
    // params and apptData are required
    if (!params || !apptData || !dealer || !appointmentOrigin) {
      throw new Error('parameters, apppointment, dealer, and appointmentOrigin data required')
    }
    return new Promise((resolve, reject) => {
      ServiceHubAPI.buildAppointmentPayload(params, apptData, dealer, appointmentOrigin)
        .then((payload) => {
          // if we do not have a base URL then log the data and resolve the promise
          if (!process.env.VUE_APP_SERVICE_BASE_URL) {
            console.log('SERVICE_BASE_URL not defined')
            console.log(`payload: ${JSON.stringify(payload)}`)
            setTimeout(function () {
              resolve({})
            }, 1000)
          } else {
            // We have a domain defined and now need to post the appointment
            const axiosInstance = axios.create({
              baseURL: process.env.VUE_APP_SERVICE_BASE_URL,
              timeout: 5000
            })
            axiosInstance.post('/service_specials/appointment/', JSON.stringify(payload))
              .then((response) => {
                if (process.env.VUE_APP_MODE !== 'production') {
                  console.log(`Response to appointment Post: ${JSON.stringify(response.data)}`)
                }
                resolve({})
              }).catch((err) => {
                let error
                if (process.env.VUE_APP_MODE !== 'production') {
                  error = err
                } else {
                  error = new Error('Failed to make the appointment')
                }
                reject(error)
              })
          } // else
        }) // buildAppointmentPayload
    })
  } // postAppointment
  // brandTips - get the brand tips list
  static brandTips (brandName) {
    const tipsUrl = `/static/data/${brandName.toLowerCase()}.tips.json`
    return new Promise((resolve, reject) => {
      let cachedTips = DataCache.get(tipsUrl)
      if (cachedTips) {
        resolve(cachedTips)
      } else {
        const axiosInstance = axios.create({
          baseURL: process.env.VUE_APP_BRAND_STATIC_DATA,
          timeout: 5000
        })
        axiosInstance.get(tipsUrl)
          .then((response) => {
            DataCache.save(tipsUrl, response.data)
            resolve(response.data)
          }).catch((err) => {
            console.log(`error retrieving brand tips: ${err}`)
            reject(err)
          })
      }
    })
  } // brandTips
  // brandTipArticle
  static brandTipArticle (brandName, category, id) {
    const articleUrl = `/static/data/${brandName.toLowerCase()}/${category}_article_${id}_snippet.html`
    return new Promise((resolve, reject) => {
      let cachedTips = DataCache.get(articleUrl)
      if (cachedTips) {
        resolve(cachedTips)
      } else {
        const axiosInstance = axios.create({
          baseURL: process.env.VUE_APP_BRAND_STATIC_DATA,
          timeout: 5000
        })
        axiosInstance.get(articleUrl)
          .then((response) => {
            DataCache.save(articleUrl, response.data)
            resolve(response.data)
          }).catch((err) => {
            console.log(`error retrieving brand tip articles: ${err}`)
            reject(err)
          })
      }
    })
  } // brandTipArticle
} // ServiceHubAPI
