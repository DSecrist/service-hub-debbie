<template>
  <div v-bind:id="coupon.code" class="col-lg-4 col-md-6 mb-3 coupon-border">
    <button id="coupon-overview" class="collapsible coupon-container" v-bind:class="{ active: isActive }" v-on:click="toggleDetails($event)">
      <div class="coupon-text-container">
        <img class="image-container" v-bind:src="coupon.image">
        <div v-bind:class="couponHeadlineClass">{{ couponHeadline }}</div>
        <div class="coupon-description">{{ couponTitle }}&nbsp;<span class="coupon-get-details"><i class="fa fa-chevron-down"></i></span></div>
      </div>
    </button>
    <div class="content" id="coupon-details" ref="couponDetails" v-show="showDetails">
      <div class="coupon-details" v-html="coupon.description"></div>
      <div class="coupon-details">Expires&#58; <span class="expiration">{{ expirationDate }}</span>.</div>
    </div>
    <div class="coupon-cta-container">
      <ScheduleServiceButton v-bind:coupon-id="coupon.tag" v-bind:source="coupon.tag">
      </ScheduleServiceButton>
    </div>
  </div>
</template>

<script>
import ScheduleServiceButton from '@/components/ScheduleServiceButton'
import { format, addDays } from 'date-fns' // eslint-disable-line no-unused-vars
const discountValueRx = /^\$*([\d\.,]*)%*/ // eslint-disable-line no-useless-escape
export default {
  name: 'CouponItem',
  components: {
    ScheduleServiceButton
  },
  props: {
    coupon: Object,
    couponType: {
      type: String,
      default: 'offer'
    },
    dealer: Object,
    showDetailsOnOpen: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      showDetails: false,
      isActive: false
    }
  },
  methods: {
    toggleDetails: function (event) {
      this.showDetails = !this.showDetails
      this.isActive = !this.isActive
      this.$ga.event('coupon', this.showDetails ? 'show' : 'hide', this.coupon.tag)
    },
    scheduleService: function () {
      this.$store.commit('showScheduleDialog', { coupon: this.coupon.tag, source: this.coupon.tag })
    }
  },
  computed: {
    expirationDate: function () {
      const exDate = addDays(new Date(), this.dealer.expirationDays)
      return format(exDate, 'MM-dd-yyyy')
    },
    myScrollHeight: function () {
      return this.showDetails && this.$refs.couponDetails ? this.$refs.couponDetails.scrollHeight + 'px' : null
    },
    offerAmount: function () {
      const match = this.coupon.discount_value.match(discountValueRx)
      let amount
      if (match) {
        amount = match[1]
      } else {
        amount = ''
        console.log(`Invalid coupon discount_value: ${this.coupon.discount_value}`)
      }
      return amount
    },
    couponHeadline: function () {
      return this.couponType === 'coupon' ? this.offerHeadline : this.coupon.title
    },
    couponTitle: function () {
      return this.couponType === 'coupon' ? this.coupon.title : this.offerHeadline
    },
    couponHeadlineClass: function () {
      return this.couponType === 'coupon' ? 'coupon-amount' : 'coupon-amount-complimentary'
    },
    offerHeadline: function () {
      const discountUnit = this.coupon.discount_unit.toLowerCase()
      let headline
      if (discountUnit === 'complimentary') {
        headline = 'Complimentary'
      } else if (discountUnit === 'percent') {
        headline = `${this.offerAmount}% Off`
      } else if (discountUnit === 'dollar') {
        headline = `$${this.offerAmount} Off`
      } else if (discountUnit === 'fixed') {
        headline = `$${this.offerAmount}`
      } else if (discountUnit === 'uptopercent') {
        headline = `Up to ${this.offerAmount}% Off`
      } else {
        headline = this.coupon.discount_unit
        console.log(`Unknown discount unit: ${this.coupon.discount_unit}`)
      }
      return headline
    }
  },
  mounted: function () {
    // Complimentary, Percent, Fixed, Dollars
    this.showDetails = this.showDetailsOnOpen
    if (this.showDetails) {
      this.$ga.event('coupon', 'auto-show', this.coupon.tag)
    }
  }
}
</script>

<style scoped lang="scss">
/* styles for xs screens go here */
/* Coupon Text Overlay Styles */
.coupon-details {
  color: #ffffff;
  text-align: left;
  font-size: 14px;
  line-height: 16px;
  padding: 10px;
}
.coupon-border {
  border: 1px red;
}

/* Coupon image hover style */
.coupon-container:hover {opacity: 0.9}

.coupon-text-container {
  position: relative;
  text-align: center;
  color: white;
}
.coupon-amount {
  font-size: 32px;
  line-height: 32px;
  position: absolute;
  bottom: 20px;
  left: 16px;
  padding-bottom: 10px;
}
.coupon-amount-complimentary {
  font-size: 22px;
  line-height: 22px;
  position: absolute;
  bottom: 20px;
  left: 16px;
  padding-bottom: 10px;
}
.coupon-description {
  font-size: 16px;
  line-height: 20px;
  position: absolute;
  bottom: 8px;
  left: 16px;
}
.fa {
  font-size: 16px;
  line-height: 16px;
}
/* Coupon Styles */
.coupon-cta-container {
  width:250px;
  padding:10px;
  text-align: left;
  background-color: #414141;
  margin-bottom: 10px;
}
.coupon-container {
  width: 250px;
  border:1px solid #ccc;
  padding: 10px 10px 10px 10px;
  overflow: auto;
  background-color: white;
  box-sizing: border-box;
}
.image-container {
  width: 250px;
  height: auto;
  position:relative;
  overflow:hidden;
  padding: 0px;
}
/* Collapsible Content */
.collapsible {
  background-color: white;
  color: white;
  cursor: pointer;
  padding: 0px;
  width: 250px;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;
}
.active, .collapsible:hover {
  background-color: #ffffff;
}
.content {
  padding: 0 8px;
  width: 250px;
  overflow: hidden;
  transition: max-height 0.2s ease-out;
  background-color: #404040;
}

/* styles for different screen widths follow */
@media only screen and (min-width: 576px) {
  /* Coupon Text Overlay Styles */
  .coupon-text-container {
    position: relative;
    text-align: center;
    color: white;
  }
  .coupon-amount {
    font-size: 40px;
    line-height: 40px;
    position: absolute;
    bottom: 24px;
    left: 16px;
    padding-bottom: 10px;
  }
  .coupon-amount-complimentary {
    font-size: 30px;
    line-height: 30px;
    position: absolute;
    bottom: 24px;
    left: 16px;
    padding-bottom: 10px;
  }
  .coupon-description {
    font-size: 18px;
    line-height: 18px;
    position: absolute;
    bottom: 8px;
    left: 16px;
  }
  /* Coupon Styles */
  .coupon-cta-container {
    width:570px;
    padding:10px;
    text-align: left;
    background-color: #414141;
    margin-bottom: 10px;
  }
  .coupon-container {
    width: 570;
    border:1px solid #ccc;
    padding: 10px 10px 10px 10px;
    overflow: auto;
    background-color: white;
    box-sizing: border-box;
  }
  .image-container {
    width: 570px;
    height: auto;
    position:relative;
    overflow:hidden;
    padding: 0px;
  }
  /* Collapsible Content */
  .collapsible {
    background-color: white;
    color: white;
    cursor: pointer;
    padding: 0px;
    width: 570px;
    border: none;
    text-align: left;
    outline: none;
    font-size: 15px;
  }
  .active, .collapsible:hover {
    background-color: #ffffff;
  }
  .content {
    padding: 0 5px;
    width: 570px;
    overflow: hidden;
    transition: max-height 0.2s ease-out;
    background-color: #404040;
  }
}
@media only screen and (min-width: 768px) {
  /* Coupon Text Overlay Styles */
  .coupon-text-container {
    position: relative;
    text-align: center;
    color: white;
  }
  .coupon-amount {
    font-size: 40px;
    line-height: 40px;
    position: absolute;
    bottom: 24px;
    left: 16px;
    padding-bottom: 10px;
  }
  .coupon-amount-complimentary {
    font-size: 30px;
    line-height: 30px;
    position: absolute;
    bottom: 24px;
    left: 16px;
    padding-bottom: 10px;
  }
  .coupon-description {
    font-size: 20px;
    line-height: 20px;
    position: absolute;
    bottom: 8px;
    left: 16px;
  }
  /*Coupon Styles*/
  .coupon-cta-container {
    width:360px;
    padding:10px;
    text-align: left;
    background-color: #414141;
    margin-bottom: 10px;
  }
  .coupon-container {
    width: 360px;
    padding: 10px 10px 10px 10px;
    overflow: auto;
    background-color: white;
    box-sizing: border-box;
  }
  .image-container {
    width: 360px;
    height: auto;
    position:relative;
    overflow:hidden;
    padding: 0px;
  }
  /* Collapsible Content */
  .collapsible {
    background-color: white;
    color: white;
    cursor: pointer;
    padding: 0px;
    width: 360px;
    border: none;
    text-align: left;
    outline: none;
    font-size: 15px;
  }
  .active, .collapsible:hover {
    background-color: #ffffff;
  }
  .content {
    padding: 0 8px;
    width: 360px;
    overflow: hidden;
    transition: max-height 0.2s ease-out;
    background-color: #404040;
  }
}
@media only screen and (min-width: 992px) {
  /* Coupon Text Overlay Styles */
  .coupon-text-container {
    position: relative;
    text-align: center;
    color: white;
  }
  .coupon-amount {
    font-size: 36px;
    line-height: 36px;
    position: absolute;
    bottom: 24px;
    left: 16px;
    padding-bottom: 10px;
  }
  .coupon-amount-complimentary {
    font-size: 26px;
    line-height: 26px;
    position: absolute;
    bottom: 24px;
    left: 16px;
    padding-bottom: 10px;
  }
  .coupon-description {
    font-size: 16px;
    line-height: 18px;
    position: absolute;
    bottom: 8px;
    left: 16px;
  }
  /*Coupon Styles*/
  .coupon-cta-container {
    width:320px;
    padding:10px;
    text-align: left;
    background-color: #414141;
    margin-bottom: 10px;
  }
  .coupon-container {
    width: 320px;
    padding: 10px 10px 10px 10px;
    overflow: auto;
    background-color: white;
    box-sizing: border-box;
  }
  .image-container {
    width: 320px;
    height: auto;
    position:relative;
    overflow:hidden;
    padding: 0px;
  }
  /* Collapsible Content */
  .collapsible {
    background-color: white;
    color: white;
    cursor: pointer;
    padding: 0px;
    width: 320px;
    border: none;
    text-align: left;
    outline: none;
    font-size: 15px;
  }
  .active, .collapsible:hover {
    background-color: #ffffff;
  }
  .content {
    padding: 0 8px;
    width: 320px;
    overflow: hidden;
    transition: max-height 0.2s ease-out;
    background-color: #404040;
  }
}
@media only screen and (min-width: 1200px) {
  /* Coupon Text Overlay Styles */
  .coupon-text-container {
    position: relative;
    text-align: center;
    color: white;
  }
  .coupon-amount {
    font-size: 45px;
    line-height: 45px;
    position: absolute;
    bottom: 24px;
    left: 16px;
    padding-bottom: 10px;
  }
  .coupon-amount-complimentary {
    font-size: 35px;
    line-height: 35px;
    position: absolute;
    bottom: 24px;
    left: 16px;
    padding-bottom: 10px;
  }
  .coupon-description {
    font-size: 20px;
    line-height: 20px;
    position: absolute;
    bottom: 8px;
    left: 16px;
  }
  /*Coupon Styles*/
  .coupon-cta-container {
    width:384px;
    padding:10px;
    text-align: left;
    background-color: #414141;
    margin-bottom: 10px;
  }
  .coupon-container {
    width: 384px;
    padding: 10px 10px 10px 10px;
    overflow: auto;
    background-color: white;
    box-sizing: border-box;
  }
  .image-container {
    width: 384px;
    height: auto;
    position:relative;
    overflow:hidden;
    padding: 0px;
  }
  /* Collapsible Content */
  .collapsible {
    background-color: white;
    color: white;
    cursor: pointer;
    padding: 0px;
    width: 384px;
    border: none;
    text-align: left;
    outline: none;
    font-size: 15px;
  }
  .active, .collapsible:hover {
    background-color: #ffffff;
  }
  .content {
    padding: 0 8px;
    width: 384px;
    overflow: hidden;
    transition: max-height 0.2s ease-out;
    background-color: #414141;
  }
}
</style>
