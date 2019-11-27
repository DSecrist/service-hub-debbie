import { expect } from 'chai'
import sinon from 'sinon'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import CouponItem from '@/components/CouponItem.vue'

const localVue = createLocalVue()
describe('CouponItem.vue', () => {
  let mocks
  beforeEach(() => {
    mocks = {
      $ga: {
        event: sinon.fake()
      }
    }
  })
  afterEach(() => {
    sinon.restore()
  })
  describe('Complementary Coupon', () => {
    let couponItem, coupon, dealer
    beforeEach(() => {
      coupon = {
        code: 'mpucomp00',
        tag: 'mpucomp00',
        image: '/static/images/coupon_vehicle_assessment_image.jpg',
        discount_unit: 'Complimentary',
        discount_value: '0',
        title: 'Vehicle Assessment',
        description: 'Includes 20-point vehicle inspection and car wash with any service. Please present coupon at time of write up.'
      }
      dealer = {
        expirationDays: 30,
        phone: {
          service: '999-999-9999'
        }
      }
    })
    describe('showDetailsOnOpen = false', () => {
      let showDetailsOnOpen
      beforeEach(() => {
        showDetailsOnOpen = false
        couponItem = shallowMount(CouponItem, {
          propsData: { coupon: coupon,
            dealer: dealer,
            showDetailsOnOpen: showDetailsOnOpen
          },
          localVue,
          mocks
        })
      }) // beforeEach
      it('should render a coupon item component', () => {
        expect(couponItem.name()).to.equal('CouponItem')
      })
      it('should have a div for the coupon', () => {
        expect(couponItem.find(`#${coupon.code}`).is('div')).to.equal(true)
      })
      it('should have the details hidden', () => {
        expect(couponItem.find('#coupon-details').isVisible()).to.equal(false)
      })
      it('should show the details when the image is clicked', () => {
        couponItem.find('#coupon-overview').trigger('click')
        expect(couponItem.find('#coupon-details').isVisible()).to.equal(true)
      })
      it('should have an expiration date of 30 days in the future', () => {
        expect(couponItem.vm.expirationDate).to.match(/[01][0-9]-[0-3][0-9]-2[0-9]{3}/)
      })
      it('should have a calculated offerHeadline of complimentary', () => {
        expect(couponItem.vm.offerHeadline).to.equal('Complimentary')
      })
    }) // showDetailsOnOpen = false
    describe('showDetailsOnOpen = true', () => {
      let showDetailsOnOpen
      beforeEach(() => {
        showDetailsOnOpen = true
        couponItem = shallowMount(CouponItem, {
          propsData: { coupon: coupon,
            dealer: dealer,
            showDetailsOnOpen: showDetailsOnOpen
          },
          localVue,
          mocks
        })
      }) // beforeEach
      it('should show details on open', () => {
        expect(couponItem.find('#coupon-details').isVisible()).to.equal(true)
      })
    }) // showDetailsonOpen = true
  }) // Complentary Coupon
  describe('offerHeadline for Fixed Coupon', () => {
    let couponItem, coupon, dealer
    beforeEach(() => {
      coupon = {
        code: 'mpucomp00',
        image: '/static/images/coupon_vehicle_assessment_image.jpg',
        discount_unit: 'Fixed',
        discount_value: '89.95',
        title: 'Vehicle Assessment',
        description: 'Includes 20-point vehicle inspection and car wash with any service. Please present coupon at time of write up.'
      }
      dealer = {
        expirationDays: 30,
        phone: {
          service: '999-999-9999'
        }
      }
      couponItem = shallowMount(CouponItem, {
        propsData: { coupon: coupon,
          dealer: dealer,
          showDetailsOnOpen: false
        },
        localVue,
        mocks
      })
    })
    it('should simply display the fixed price', () => {
      expect(couponItem.vm.offerHeadline).to.equal('$89.95')
    })
  }) // Fixed Coupon
  describe('offerHeadline for Dollar Coupon', () => {
    let couponItem, coupon, dealer
    beforeEach(() => {
      coupon = {
        code: 'mpucomp00',
        image: '/static/images/coupon_vehicle_assessment_image.jpg',
        discount_unit: 'Dollar',
        discount_value: '50',
        title: 'Vehicle Assessment',
        description: 'Includes 20-point vehicle inspection and car wash with any service. Please present coupon at time of write up.'
      }
      dealer = {
        expirationDays: 30,
        phone: {
          service: '999-999-9999'
        }
      }
      couponItem = shallowMount(CouponItem, {
        propsData: { coupon: coupon,
          dealer: dealer,
          showDetailsOnOpen: false
        },
        localVue,
        mocks
      })
    })
    it('should have a calculated offerHeadline dollars off', () => {
      expect(couponItem.vm.offerHeadline).to.equal('$50 Off')
    })
  }) // Dollar Coupon
  describe('offerHeadline for Percent Coupon', () => {
    let couponItem, coupon, dealer
    beforeEach(() => {
      coupon = {
        code: 'mpucomp00',
        image: '/static/images/coupon_vehicle_assessment_image.jpg',
        discount_unit: 'Percent',
        discount_value: '10',
        title: 'Vehicle Assessment',
        description: 'Includes 20-point vehicle inspection and car wash with any service. Please present coupon at time of write up.'
      }
      dealer = {
        expirationDays: 30,
        phone: {
          service: '999-999-9999'
        }
      }
      couponItem = shallowMount(CouponItem, {
        propsData: { coupon: coupon,
          dealer: dealer,
          showDetailsOnOpen: false
        },
        localVue,
        mocks
      })
    })
    it('should have a calculated offerHeadline Percent off', () => {
      expect(couponItem.vm.offerHeadline).to.equal('10% Off')
    })
  }) // Percent Coupon
  describe('offerAmount', () => {
    it('should return the discount value', () => {
      const localThis = {
        coupon: { discount_value: '0' }
      }
      expect(CouponItem.computed.offerAmount.call(localThis)).to.equal('0')
    })
    it('should remove any $ from the offer amount', () => {
      const localThis = {
        coupon: { discount_value: '$50.95' }
      }
      expect(CouponItem.computed.offerAmount.call(localThis)).to.equal('50.95')
    })
    it('should remove any % from the offer amount', () => {
      const localThis = {
        coupon: { discount_value: '30%' }
      }
      expect(CouponItem.computed.offerAmount.call(localThis)).to.equal('30')
    })
  }) // offerAmount
}) // CouponItem.vue
