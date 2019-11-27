import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

function builder (params, data, error) {
  return new Vuex.Store({
    state: {
      params: params,
      brand: data.brand,
      dealer: data.dealer,
      appointmentOptions: data.appointmentOptions,
      offers: data.offers,
      coupons: data.coupons,
      coupon: data.coupon,
      error: error,
      // appointment hold information about showing the appointment request dialog
      appointment: {
        showScheduleDialog: 0,
        coupon: '',
        source: ''
      }
    },
    mutations: {
      // this mutation can be called from anywhere to show the schedule appointment dialog.
      // the payload should have information on the source for the button click and if there is
      // a coupon code associated with the show.  The coupon will be passed along to the postAppointment
      // API if the user follow's through with the appointment request.
      showScheduleDialog (state, payload) {
        state.appointment.showScheduleDialog += 1
        state.appointment.coupon = payload.coupon
        state.appointment.source = payload.source
      }
    },
    actions: {

    }
  })
}

export default builder
