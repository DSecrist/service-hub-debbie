<template>
  <div>
    <div class="container-fluid footer-container">
      <div class="row" align="center">
        <div class="col-xs-12 col-lg-6 ">
          <div>
            <div class="footer-headers">Service Hours</div>
            <table class="table table-hover table-borderless">
              <tbody>
                <tr><td>Monday</td><td>{{ hours('monday') }}</td></tr>
                <tr><td>Tuesday</td><td>{{ hours('tuesday') }}</td></tr>
                <tr><td>Wednesday</td><td>{{ hours('wednesday') }}</td></tr>
                <tr><td>Thursday</td><td>{{ hours('thursday') }}</td></tr>
                <tr><td>Friday</td><td>{{ hours('friday') }}</td></tr>
                <tr><td>Saturday</td><td>{{ hours('saturday') }}</td></tr>
                <tr><td>Sunday</td><td>{{ hours('sunday') }}</td></tr>
              </tbody>
            </table>
          </div>
          <div>
            <div>
              <div class="footer-headers">Find Us On
              </div>
              <div class="icons" align="left">
                <a v-if="dealer.url.facebook" class="icon-facebook" v-bind:href="dealer.url.facebook" target="_blank">
                  <img src="/static/images/icon-facebook.png" alt="BMW social icons">
                </a>
                <a v-if="dealer.url.twitter" class="icon-twitter" v-bind:href="dealer.url.twitter" target="_blank">
                  <img src="/static/images/icon-twitter.png" alt="BMW social icons">
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xs-12 col-lg-6">
            <div>
              <div class="footer-headers">
                  Get Directions
              </div>
              <div class="address">
                  {{ dealer.address.street }}<br> {{ dealer.address.city }}, {{ dealer.address.state }} {{ dealer.address.zip }}
              </div>
              <div v-if="googleMapUrl" class="embed-responsive embed-responsive-16by9 mt-5 map-container">
                <iframe width="600" height="450" frameborder="0" style="border:0" v-bind:src="googleMapUrl" allowfullscreen></iframe>
              </div>
            </div>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="series-footer"></div>
        <div class="footer-container-dataclover">
            <div class="dataclover-text">Powered by DataClover, Inc. {{ fullYear }}</div>
        </div>
        <div class="footer-container-privacy">
            <div class="privacy-text">
              This site is for informational purposes only. All promotional offers are valid and redeemable at the location listed. <span v-if="dealer.affiliate">{{ dealer.affiliate }}</span><br>
              <router-link class="privacy-link" v-bind:to="{ name: 'privacy' }">Click here to view our full privacy policy.
              </router-link>
            </div>
        </div>
        <div class="footer-container-trademark">
          <div class="privacy-text">
            &copy; {{ fullYear }} {{ brand.copyright }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageFooter',
  props: {
    dealer: Object,
    brand: Object
  },
  computed: {
    fullYear: function () {
      return (new Date()).getFullYear()
    },
    googleMapUrl: function () {
      let url
      if (this.dealer.url.googleMap) {
        url = `${this.dealer.url.googleMap}&key=${process.env.VUE_APP_GOOGLE_API_KEY}`
      } else {
        url = null
      }
      return url
    }
  },
  methods: {
    hours: function (dayOfWeek) {
      return this.dealer.serviceHours[dayOfWeek.toLowerCase()] || 'Closed'
    }
  }
}
</script>

<style scoped lang="scss">
/* map styles */
.map-container {
  border-width: thin;
  border-style: solid;
}
/* updated styles */
.icon-facebook {
  padding: 5px;
}
.icon-twitter {
  padding: 5px;
}
.icon-facebook:hover {
  opacity: 0.6
}
.icon-twitter:hover {
  opacity: 0.6
}
.embed-responsive:hover {
  opacity: 0.6
}
/* Footer Styles */
.footer-container {
  width: 100%;
  padding: 50px 50px 50px 50px;
  background-color: #e6e7e8;
}
.footer-headers {
  text-transform: uppercase;
  font-size: 15px;
  font-weight: bold;
  color: #221f1f;
  padding-bottom: 10px;
  margin-top: 50px;
  text-align: left;
}
.icons {
  text-align: left;
}
.address {
  text-align: left;
}
.privacy-link {
  color: #666766;
  font-weight: bolder;
  text-decoration: none;
}
/* styles for xs screens go here */
.main-footer-container{
  text-align: left;
  padding-left: 20px;
}
.series-footer {
  height: 30px;
  width: 100%;
  margin-top: 0px;
  border: 1px solid #414141;
  background-color: #414141;
}
.bottom-footer {
  height: 80px;
  width: 100%;
  border: 1px solid #e6e7e8;
  background-color: #e6e7e8;
}
.bottom-text {
  font-size: 12px;
  color: #000;
  position: relative;
  z-index: 1;
  top: 30px;
  left: 28px;
}
.footer-container-dataclover {
  width: 100%;
  height: 30px;
}
.dataclover-text {
  font-size: 12px;
  line-height: 1.571;
  padding-left: 20px;
  padding-top: 15px;
  color: #666766;
  text-align: left;
}
.footer-container-privacy {
    width: 100%;
}
.footer-container-trademark {
  width: 100%;
  margin-bottom: 50px;
}
.privacy-text {
  font-size: 12px;
  line-height: 1.571;
  padding-left: 20px;
  padding-top: 10px;
  color: #666766;
  text-align: left;
}

/* styles for different screen widths follow */
@media only screen and (min-width: 576px) {
  .no-mobile {
    display: none;
  }
  /* Footer Styles */
  .table {
    width: 450px;
    text-align: left;
  }
  .footer-container {
    width: 100%;
    padding: 50px 90px 50px 90px;
  }
  .footer-headers {
    text-transform: uppercase;
    font-size: 15px;
    font-weight: bold;
    color: #221f1f;
    padding-bottom: 10px;
    margin-top: 50px;
    text-align: left;
  }
  .icons {
    text-align: left;
  }
  .address {
    text-align: left;
  }
}
@media only screen and (min-width: 768px) {
  .table {
    width: 300px;
  }
  .footer-container {
    width: 100%;
    padding: 50px 90px 50px 90px;
  }
  .footer-headers {
    text-transform: uppercase;
    font-size: 15px;
    font-weight: bold;
    color: #221f1f;
    padding-bottom: 10px;
    margin-top: 50px;
    text-align: left;
  }
  .icons {
    text-align: left;
  }
  .address {
    text-align: left;
  }
}
@media only screen and (min-width: 992px) {
  .table {
    width: 400px;
  }
  .footer-container {
    width: 100%;
    padding: 50px 90px 50px 90px;
  }
  .footer-headers {
    text-transform: uppercase;
    font-size: 15px;
    font-weight: bold;
    color: #221f1f;
    padding-bottom: 10px;
    padding-left: 20px;
  }
  .icons {
    padding-left: 30px;
  }
  .address {
    padding-left: 30px;
  }
}
@media only screen and (min-width: 1200px) {
  .table {
    width: 400px;
  }
  .footer-container {
    width: 100%;
    padding: 50px 90px 50px 90px;
  }
  .footer-headers {
    text-transform: uppercase;
    font-size: 15px;
    font-weight: bold;
    color: #221f1f;
    padding-bottom: 10px;
    padding-left: 20px;
  }
  .icons {
    padding-left: 30px;
  }
  .address {
    text-align: left;
  }
}
</style>
