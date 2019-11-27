import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import VueAnalytics from 'vue-analytics'
import VueScrollTo from 'vue-scrollto'
import { ServiceHubAPI } from './services/service-hub-api'
import { UrlParser } from './utils/url-parser'
import filters from './utils/filters' // eslint-disable-line no-unused-vars
import './custom.scss'

// this method is copied from vue-analytics and changed so it will wait up to 2 seconds for GA
// to be ready before proceeding.  This is required because some ad blocking systems stop GA from
// loading in that case after 2 seconds we will proceed.
function onAnalyticsReady (propertyId) {
  return new Promise((resolve) => {
    let intervals = 0
    const poll = setInterval(() => {
      let done
      intervals += 1
      // if the window is defined and GA is attached then GA has been loaded
      if (typeof window !== 'undefined' && window.ga) {
        done = true
        console.log(`GA ${propertyId} loaded: ${intervals * 10}ms`)
      } else if (intervals % 200 === 0) { // if 200 intervals (2 secs) have passed then give up GA
        done = true
        console.log(`GA ${propertyId} failed to load: ${intervals * 10}ms`)
      } else {
        done = false
      }
      if (done) {
        resolve()
        clearInterval(poll)
      }
    }, 10)
  })
}

Vue.use(BootstrapVue)
Vue.use(VueScrollTo)
const params = UrlParser.parseParams(window.location.href)
// download the dealer settings to power the user experience
ServiceHubAPI.getDealerSettings(params)
  .then((data) => {
    Vue.config.productionTip = false
    Vue.use(VueAnalytics, {
      id: data.dealer.googleAnalyticsPropertyId.split(',').map(x => x.trim()),
      router,
      debug: {
        enabled: process.env.VUE_APP_MODE !== 'production',
        sendHitTask: process.env.VUE_APP_GA_SEND_EVENTS === 'yes'
      }
    })
    onAnalyticsReady(data.dealer.googleAnalyticsPropertyId).then(() => {
      // launch the app
      new Vue({
        router,
        store: store(params, data),
        render: h => h(App)
      }).$mount('#app')
    })
  }).catch((err) => {
    // error launch the app with the error
    new Vue({
      router,
      store: store(params, {}, err),
      render: h => h(App)
    }).$mount('#app')
  }) // ServiceHubAPI.getDealerSettings
