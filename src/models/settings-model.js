// models/settings-model.js
import { EntityParser } from '@/utils/entity-parser'
import { format } from 'date-fns'
export class SettingsModel {
  constructor (data) {
    this.data = data
    this.dataVersion = data.OpenHours ? 1 : 2
  }
  openHoursForDay (dayOfWeek) {
    let result
    if (this.data.OpenHours[dayOfWeek]) {
      result = []
      for (let i = 0; i < this.data.OpenHours[dayOfWeek].length; i++) {
        result.push(this.data.OpenHours[dayOfWeek][i][0])
      }
    } else {
      result = null
    }
    return result
  }
  validateVersion2Data (v2Data) {
    if (!v2Data.dealer) {
      throw new Error('dealer node required')
    }
    if (!v2Data.dealer.name) {
      throw new Error('dealer.name is required')
    }
    if (!v2Data.dealer.googleAnalyticsPropertyId) {
      throw new Error('dealer.analytics id is required')
    }
    if (!v2Data.brand) {
      throw new Error('brand node required')
    }
    if (!v2Data.brand.name) {
      throw new Error('brand.name is required')
    }
    return true
  }
  convertTo (options) {
    let result
    if (this.dataVersion === 1 && options.version === 1) {
      result = Object.assign({}, this.data)
      result.dealer.id = this.data.dealership_id
      result.dealer.email = {
        bdc: this.data.bdcEmail
      }
      result.dealer.phone.bdc = this.data.dealershipPhone
    } else if (this.dataVersion === 1 && options.version === 2) {
      result = {
        appointmentOptions: {
          dates: [],
          times: {
          }
        },
        brand: this.data.brand,
        dealer: {
          googleAnalyticsPropertyId: this.data.dealer.googleAnalyticsPropertyId,
          id: this.data.dealership_id,
          dvmId: this.data.dvm_id,
          name: this.data.dealer.name,
          email: {
            bdc: this.data.bdcEmail
          },
          address: {
            street: this.data.dvm_attributes.street,
            city: this.data.dvm_attributes.city,
            state: this.data.dvm_attributes.state,
            zip: this.data.dvm_attributes.zip
          },
          expirationDays: this.data.dealer.expirationDays,
          affiliate: this.data.dealer.affiliate,
          phone: {
            service: this.data.dealer.phone.service,
            sales: this.data.dealer.phone.sales,
            parts: this.data.dvm_attributes.parts_phone,
            bdc: this.data.dealershipPhone
          },
          url: {
            about: this.data.dealer.url.about,
            privacy: this.data.dealer.url.privacy,
            directions: this.data.dealer.url.directions,
            sitemap: this.data.dealer.url.sitemap,
            contact: this.data.dealer.url.contact,
            appointment: this.data.dvm_attributes.appointment_website,
            home: this.data.dealer.url.home
          },
          serviceHours: {
            monday: this.data.dvm_attributes.monday_service_hours,
            tuesday: this.data.dvm_attributes.tuesday_service_hours,
            wednesday: this.data.dvm_attributes.wednesday_service_hours,
            thursday: this.data.dvm_attributes.thursday_service_hours,
            friday: this.data.dvm_attributes.friday_service_hours,
            saturday: this.data.dvm_attributes.saturday_service_hours
          }
        }
      }
      result.offers = this.data.offers
      result.coupons = this.data.coupons
      if (this.data.brand.name === 'bmw') {
        result.brand.id = 8
      } else {
        result.brand.id = -1
      }
      // reformat appointment times
      result.appointmentOptions = {
        dates: [],
        times: {}
      }
      for (let i = 0; i < 7; i++) {
        let openHours = this.openHoursForDay(i)
        if (openHours && openHours.length > 0) {
          result.appointmentOptions.times[i] = openHours
        }
      }
      if (this.data.dealer.displayDates) {
        for (let i = 0; i < this.data.dealer.displayDates.length; i++) {
          result.appointmentOptions.dates.push(format(EntityParser.fullDate(this.data.dealer.displayDates[i]), 'yyyy-MM-dd'))
        }
      }
    } else if (this.dataVersion === 2 && options.version === 2) {
      // validate key vales exist in the palyload
      this.validateVersion2Data(this.data)
      result = Object.assign({}, this.data)
    }
    return result
  }
} // SettingsModel
