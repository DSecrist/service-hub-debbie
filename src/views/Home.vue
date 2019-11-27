<template>
  <div>
    <HeroBanner v-bind:hero-image="brand.heroImage" category="home"></HeroBanner>
    <div class="container-fluid">
      <div class="mt-3 mb-3">
        <ContentBlock type="heading" alignment="center">
          <h1 class="col-12 mt-4">Service Specials</h1>
        </ContentBlock>
        <ContentBlock type="subheading" alignment="center">
          <h4 class="col-12">Select an Offer for More Details</h4>
        </ContentBlock>
      </div>
      <div class="row mb-3" align="center">
        <CouponItem v-for="coupon in coupons" v-bind:coupon="coupon" v-bind:dealer="dealer" v-bind:key="coupon.code" v-bind:show-details-on-open="true" coupon-type="coupon">
        </CouponItem>
        <CouponItem v-for="offer in offers" v-bind:coupon="offer" v-bind:dealer="dealer" v-bind:key="offer.code" coupon-type="offer">
        </CouponItem>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import HeroBanner from '@/components/HeroBanner'
import ContentBlock from '@/components/ContentBlock'
import CouponItem from '@/components/CouponItem'
export default {
  name: 'Home',
  components: {
    CouponItem,
    HeroBanner,
    ContentBlock
  },
  computed: mapState({
    brand: state => state.brand,
    dealer: state => state.dealer,
    coupons: state => state.coupons,
    offers: state => state.offers
  })
}
</script>

<style scoped lang="scss">
/* styles for xs screens go here */
/* Service Specials Header Styles */
h1 {
    font-size: 28px;
    line-height: 30px;
    color: #000000;
}
h4 {
    font-size: 16px;
}
/* styles for different screen widths follow */
@media only screen and (min-width: 576px) {
  /* Service Specials Header */
  h1 {
      font-size: 50px;
      line-height: 52px;
      color: #221f1f;
      font-weight: 400;
  }
  h4 {
      font-size: 24px;
      color: #221f1f;
      font-weight: 400;
  }
  .coupon-top-header {
    padding-top: 30px;
    padding-bottom: 30px;
  }
  .service-specials-header {
    font-size: 50px;
    line-height: 52px;
    color: #221f1f;
    font-weight: 400;
    font-style: normal;
    text-align: center;
  }
  .service-specials-subheader {
    font-size: 24px;
    color: #221f1f;
    font-weight: 400;
    text-align: center;
  }
}
@media only screen and (min-width: 768px) {
}
@media only screen and (min-width: 992px) {
}
@media only screen and (min-width: 1200px) {
}
</style>
