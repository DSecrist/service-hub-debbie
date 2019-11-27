// tests/unit/components/schedule-service-button.spec.js
import { expect } from 'chai'
import sinon from 'sinon'
import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import ScheduleServiceButton from '@/components/ScheduleServiceButton.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
describe('ScheduleServiceButton.vue', () => {
  let store
  let mutations
  let scheduleServiceButton
  beforeEach(() => {
    mutations = {
      showScheduleDialog: sinon.fake()
    }
    store = new Vuex.Store({
      mutations
    })
    scheduleServiceButton = shallowMount(ScheduleServiceButton, {
      propsData: {
        couponId: 'mpucomp00',
        source: 'hero'
      },
      store,
      localVue
    })
  })
  afterEach(() => {
    sinon.restore()
  })
  it('should render a Schedule Service Button', () => {
    expect(scheduleServiceButton.name()).to.equal('ScheduleServiceButton')
  })
  it('should be a button', () => {
    expect(scheduleServiceButton.is('button')).to.equal(true)
  })
  it('should show the schedule dialog on button click', () => {
    scheduleServiceButton.trigger('click')
    expect(mutations.showScheduleDialog.callCount).to.equal(1)
  })
  it('should pass throught the properties with the right values', () => {
    scheduleServiceButton.trigger('click')
    expect(mutations.showScheduleDialog.lastArg).to.eql({ coupon: 'mpucomp00', source: 'hero' })
  })
}) // ScheduleServiceButton
