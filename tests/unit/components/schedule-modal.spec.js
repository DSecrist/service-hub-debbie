import { expect } from 'chai'
import Vuex from 'vuex'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import BootstrapVue from 'bootstrap-vue'
import ScheduleModal from '@/components/ScheduleModal.vue'
import filters from '@/utils/filters' // eslint-disable-line no-unused-vars

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(BootstrapVue)
describe('ScheduleModal.vue', () => {
  let scheduleModal, showSchedule
  let store
  describe('empty params', () => {
    beforeEach(() => {
      store = new Vuex.Store({
        state: {
          appointment: {
            showScheduleDialog: 0
          },
          appointmentOptions: {
            dates: ['2019-09-27', '2019-09-28', '2019-09-29', '2019-09-30'],
            times: {
              '1': ['6:00 AM', '10:30 AM'],
              '5': ['6:00 AM', '6:30 AM'],
              '6': ['9:00 AM']
            }
          },
          dealer: {
            phone: {
              bdc: '111-222-3333'
            }
          }
        }
      })
      scheduleModal = shallowMount(ScheduleModal, {
        propsData: { showSchedule: showSchedule },
        store,
        localVue,
        attachToDocument: true
      })
    })
    afterEach(() => {
      scheduleModal.destroy()
    })
    it('should render a schedule modal', () => {
      expect(scheduleModal.name()).to.equal('ScheduleModal')
    })
    describe('validate inital state', () => {
      it('should intially not have the form being submitted', () => {
        expect(scheduleModal.vm.formSubmitted).to.equal(false)
      })
      it('should initally have emailState of null', () => {
        expect(scheduleModal.vm.emailState).to.equal(null)
      })
      it('should initally have phoneState of null', () => {
        expect(scheduleModal.vm.phoneState).to.equal(null)
      })
      it('should have initially email invalid feedback of empty string', () => {
        expect(scheduleModal.vm.emailInvalidFeedback).to.equal('')
      })
      it('should have initially phone invalid feedback of empty string', () => {
        expect(scheduleModal.vm.phoneInvalidFeedback).to.equal('')
      })
      it('should have well formed date options', () => {
        expect(scheduleModal.vm.dateOptions).to.eql([
          { text: 'Please select a date for the appointment', value: null },
          { text: 'Friday, September 27th 2019', value: 0 },
          { text: 'Saturday, September 28th 2019', value: 1 },
          { text: 'Sunday, September 29th 2019', value: 2 },
          { text: 'Monday, September 30th 2019', value: 3 }
        ])
      })
      it('should have well formed time options', () => {
        expect(scheduleModal.vm.timeOptions).to.eql([
          { text: 'Please select a time for the appointment', value: null }
        ])
      })
    }) // validate initial state
    describe('trigger date selection and test the time optoins are correct', () => {
      it('should load the time options for Friday', () => {
        scheduleModal.vm.appointment.selectedDate = 0
        expect(scheduleModal.vm.timeOptions).to.eql([
          { text: 'Please select a time for the appointment', value: null },
          { text: '6:00 AM', value: '6:00 AM' },
          { text: '6:30 AM', value: '6:30 AM' }
        ])
      })
      it('should not have any time options for Sunday', () => {
        scheduleModal.vm.appointment.selectedDate = 2
        expect(scheduleModal.vm.timeOptions).to.eql([
          { text: 'No time options available for selected date', value: null }
        ])
      })
      describe('appointmentDateTime - whole hour', () => {
        beforeEach(() => {
          scheduleModal.vm.appointment.selectedDate = 0
          scheduleModal.vm.appointment.selectedTime = '6:00 AM'
        })
        it('valid date time object', () => {
          const apptDateTime = new Date('2019-09-27 06:00')
          expect(scheduleModal.vm.appointmentDateTime).to.eql(apptDateTime)
        })
        it('valid date time string', () => {
          expect(scheduleModal.vm.appointmentDateTimeAsString).to.eql('Friday, September 27th, 6:00 AM')
        })
      }) // appointmentDateTime - whole hour
      describe('appointmentDateTime - half hour', () => {
        beforeEach(() => {
          scheduleModal.vm.appointment.selectedDate = 0
          scheduleModal.vm.appointment.selectedTime = '2:30 PM'
        })
        it('valid data time object', () => {
          const apptDateTime = new Date('2019-09-27 14:30')
          expect(scheduleModal.vm.appointmentDateTime).to.eql(apptDateTime)
        })
        it('valid date time string', () => {
          expect(scheduleModal.vm.appointmentDateTimeAsString).to.eql('Friday, September 27th, 2:30 PM')
        })
      }) // appointmentDateTime - half hour
    }) // trigger date selection and test the time optoins are correct
    describe('appointmentPayload', () => {
      it('should take the form data and create the proper payload format', () => {
        scheduleModal.vm.appointment.email = 'fred@fred.com'
        scheduleModal.vm.appointment.phone = '777-666-5555'
        scheduleModal.vm.appointment.smsConsent = true
        scheduleModal.vm.appointment.selectedDate = 1
        scheduleModal.vm.appointment.selectedTime = '6:30 AM'
        expect(scheduleModal.vm.appointmentPayload()).to.eql({
          email: 'fred@fred.com',
          phone: '7776665555',
          dateTime: new Date('2019-09-28 06:30'),
          smsConsent: true
        })
      })
    }) // appointmentPayload
    describe('formSubmitted', () => {
      beforeEach(() => {
        scheduleModal.vm.formSubmitted = true
      })
      describe('valid email', () => {
        it('should be valid email state', () => {
          scheduleModal.vm.appointment.email = 'fred@fred.com'
          expect(scheduleModal.vm.emailState).to.equal(true)
        })
        it('should have an empty invalid feedback', () => {
          scheduleModal.vm.appointment.email = 'fred@fred.com'
          expect(scheduleModal.vm.emailInvalidFeedback).to.equal('')
        })
      }) // valid email
      describe('invalid email', () => {
        it('should be in valid email state', () => {
          scheduleModal.vm.appointment.email = ''
          expect(scheduleModal.vm.emailState).to.equal(false)
        })
        it('should have invalid feedback', () => {
          scheduleModal.vm.appointment.email = ''
          expect(scheduleModal.vm.emailInvalidFeedback).to.equal('Invalid email address')
        })
      }) // Invalid Email
      describe('phoneState', () => {
        it('valid phone state', () => {
          scheduleModal.vm.appointment.phone = '4048332000'
          expect(scheduleModal.vm.phoneState).to.equal(true)
        })
        it('should have an empty invalid feedback', () => {
          scheduleModal.vm.appointment.phone = '4048332000'
          expect(scheduleModal.vm.phoneInvalidFeedback).to.equal('')
        })
        it('should be false phoneState', () => {
          scheduleModal.vm.appointment.phone = '!!!---####'
          expect(scheduleModal.vm.phoneState).to.equal(false)
        })
      }) // valid phone
      describe('phoneNumber', () => {
        it('should have a 10 digit phone number', () => {
          scheduleModal.vm.appointment.phone = '404-936-2532'
          expect(scheduleModal.vm.phoneNumberCompact).to.eql('4049362532')
        })
        it('should have a 10 digit phone number', () => {
          scheduleModal.vm.appointment.phone = '404.936.2532'
          expect(scheduleModal.vm.phoneNumberCompact).to.eql('4049362532')
        })
        it('should have a 10 digit phone number', () => {
          scheduleModal.vm.appointment.phone = '404 - 936 - 2532'
          expect(scheduleModal.vm.phoneNumberCompact).to.eql('4049362532')
        })
        it('should have a 10 digit phone number', () => {
          scheduleModal.vm.appointment.phone = '4049362532'
          expect(scheduleModal.vm.phoneNumberCompact).to.eql('4049362532')
        })
        it('three digit phone should be an empty string', () => {
          scheduleModal.vm.appointment.phone = '404'
          expect(scheduleModal.vm.phoneNumberCompact).to.eql('404')
        })
        it('five digit phone should be an empty string', () => {
          scheduleModal.vm.appointment.phone = '40493'
          expect(scheduleModal.vm.phoneNumberCompact).to.eql('40493')
        })
      }) // phoneNumber
    }) // formSubmitted
  }) // empty params
  describe('email and phone params', () => {
    beforeEach(() => {
      store = new Vuex.Store({
        state: {
          params: {
            utm_email: 'customer@customer.com',
            utm_phone: '12335559999'
          },
          appointment: {
            showScheduleDialog: 0
          },
          dealer: {
            displayDates: [],
            phone: {
              bdc: '111-222-3333'
            }
          }
        }
      })
      scheduleModal = shallowMount(ScheduleModal, {
        propsData: { showSchedule: showSchedule },
        store,
        localVue,
        attachToDocument: true
      })
    })
    afterEach(() => {
      scheduleModal.destroy()
    })
    it('should initalize the email to the email address in the params', () => {
      expect(scheduleModal.vm.appointment.email).to.eql('customer@customer.com')
    })
    it('should strip the 1 and default show the phone number', () => {
      expect(scheduleModal.vm.appointment.phone).to.eql('2335559999')
    })
  }) // email and phone params
}) // ScheduleModal.vue
