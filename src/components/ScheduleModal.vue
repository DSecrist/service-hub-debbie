<template>
  <b-modal id="modal-schedule" ref="modalSchedule" title="Appointment Scheduler"
  v-on:close="handleClose" v-on:hide="handleHide" v-on:show="handleShow" v-on:ok="handleOk" hide-footer>
    <b-alert variant="success" v-bind:show="scheduleApptSuccess">
      <h4>We received your appointment request!</h4>
      Your appointment time is: <b>{{ appointmentDateTimeAsString }}</b>
      <hr>
      Please expect us to contact you at {{ phoneNumberCompact | phoneFormatter }} within 24 hours to confirm your vehicle information and parts availability for this appointment. We look forward to seeing you.
      <hr>
      Please give us a call at <a v-bind:href="`tel:${bdcPhoneCompact}`">{{ $store.state.dealer.phone.bdc | phoneFormatter }}</a> if you need to change or cancel your appointment.
    </b-alert>
    <b-alert variant="danger" v-bind:show="scheduleApptError">
      <h4>We're unable to schedule your request.</h4>
      We encountered a problem scheduling your request. Please contact us at <a v-bind:href="`tel:${bdcPhoneCompact}`">{{ $store.state.dealer.phone.bdc | phoneFormatter }}</a> to schedule your service.
    </b-alert>
    <b-form v-on:submit.stop.prevent="handleSubmit" v-show="showScheduleForm">
      <b-form-group
        id="fieldset-1"
        description="Enter your email address to confirm the appointment."
        label="Email"
        label-for="appointment-email"
        v-bind:invalid-feedback="emailInvalidFeedback"
        v-bind:state="emailState">
        <b-form-input id="appointment-email" v-model="appointment.email" v-bind:state="emailState" type="email" trim>
        </b-form-input>
      </b-form-group>
      <b-form-group
        id="fieldset-2"
        description="Enter your phone number to cofirm the appointment."
        label="Phone"
        label-for="appointment-phone"
        v-bind:invalid-feedback="phoneInvalidFeedback"
        v-bind:state="phoneState">
        <b-form-input id="appointment-phone" v-model="appointment.phone" v-bind:state="phoneState" trim>
        </b-form-input>
      </b-form-group>
      <div class="form-group form-check">
        <input type="checkbox" class="form-check-input" id="appointment-sms-consent"
        v-model="appointment.smsConsent" v-bind:value="true" v-bind:unchecked-value="false">
        <label class="form-check-label" for="appointment-sms-consent">
          I consent to receive a text message to confirm this service appointment.
        </label>
        <b-form-invalid-feedback v-bind:force-show="smsState === false">{{ smsInvalidFeedback }}</b-form-invalid-feedback>
      </div>
      <b-form-group id="fieldset-3" label="Preferred Date"
        v-bind:invalid-feedback="dateInvalidFeedback"
        v-bind:state="dateState"
        label-for="appointment-prefered-date">
        <b-form-select id="appointment-prefered-date" v-model="appointment.selectedDate"
          v-bind:options="dateOptions" v-bind:state="dateState">
        </b-form-select>
      </b-form-group>
      <b-form-group id="fieldset-4" label="Preferred Time"
        v-bind:invalid-feedback="timeInvalidFeedback"
        v-bind:state="timeState"
        label-for="appointment-prefered-time">
        <b-form-select id="appointment-prefered-time" v-model="appointment.selectedTime"
          v-bind:options="timeOptions" v-bind:state="timeState">
        </b-form-select>
      </b-form-group>
      <b-button class="schedule-now" type="submit">
        <span id="spinnerSubmit" class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-show="apiProcessing">
        </span>
        <span class="schedule-now-text">Schedule Now</span>
      </b-button>
    </b-form>
    <div v-if="debugOn" class="mt-3">
      <p>Only shows in non-production environments</p>
      <p>{{ appointmentDateTimeAsString}}</p>
    </div>
  </b-modal>
</template>

<script>
/* Information that is important for scheduling the appointment:
  - Email address from query string
  - Coupon the schedule button was clicked (property)
  - Coupon that was featured in the email or ad that brought the person here (utm-content from querystring)
*/
import { BModal, VBModal, BForm, BFormGroup, BFormInput, BButton, BFormSelect, BFormInvalidFeedback, BAlert } from 'bootstrap-vue'
import { EntityParser } from '@/utils/entity-parser'
import { ServiceHubAPI } from '@/services/service-hub-api'
import { format } from 'date-fns' // eslint-disable-line no-unused-vars
import { phoneFormatter } from '@/utils/filters'
export default {
  name: 'ScheduleModal',
  components: {
    'b-modal': BModal,
    'b-form': BForm,
    'b-form-group': BFormGroup,
    'b-form-input': BFormInput,
    'b-button': BButton,
    'b-form-select': BFormSelect,
    'b-form-invalid-feedback': BFormInvalidFeedback,
    'b-alert': BAlert
  },
  directives: {
    'b-modal': VBModal
  },
  watch: {
    // This is the key computed property to watch.  When this changes, we show the dialog.
    showDialog: function () {
      this.$refs.modalSchedule.show()
    }
  },
  data: function () {
    let componentData = {
      appointment: {}
    }
    return this.dataReset(componentData)
  },
  computed: {
    debugOn () {
      return process.env.VUE_APP_MODE === 'development'
    },
    dateOptions () {
      let options = [{ value: null, text: 'Please select a date for the appointment' }]
      if (this.$store.state.appointmentOptions && this.$store.state.appointmentOptions.dates) {
        for (let i = 0; i < this.$store.state.appointmentOptions.dates.length; i++) {
          try {
            const apptDt = EntityParser.dateFromString(this.$store.state.appointmentOptions.dates[i], '00:00:00')
            options.push({ value: i, text: format(apptDt, 'EEEE, MMMM do yyyy') })
          } catch (err) {
            console.log(`Err processing appt dates: ${err}`)
          }
        }
      }
      return options
    },
    dateInvalidFeedback () {
      let feedback
      if (this.formSubmitted && this.appointment.selectedDate === null) {
        feedback = 'Appointment date is required'
      } else {
        feedback = ''
      }
      return feedback
    },
    dateState () {
      let result
      if (!this.formSubmitted) {
        result = null
      } else {
        result = this.appointment.selectedDate !== null
      }
      return result
    },
    timeOptions () {
      const defaultOptions = [{ value: null, text: 'Please select a time for the appointment' }]
      let options
      if (this.appointment.selectedDate !== null) {
        try {
          let dt = EntityParser.dateFromString(this.$store.state.appointmentOptions.dates[this.appointment.selectedDate], '00:00:00')
          let hours = this.$store.state.appointmentOptions.times[dt.getDay().toString()]
          if (hours) {
            // before adding the hours options, put the default message at the top
            options = defaultOptions
            for (let i = 0; i < hours.length; i++) {
              options.push({ value: hours[i], text: hours[i] })
            }
          } else {
            // A date has been selected with no hours
            options = [{ value: null, text: 'No time options available for selected date' }]
          }
        } catch (err) {
          console.log(`Err creating time options:  ${err}`)
        }
      } else {
        // selectedDate is null so only show the default time message
        options = defaultOptions
      }
      return options
    },
    timeInvalidFeedback () {
      let feedback
      if (this.formSubmitted && this.appointment.selectedTime === null) {
        feedback = 'Appointment time is required'
      } else {
        feedback = ''
      }
      return feedback
    },
    timeState () {
      let result
      if (!this.formSubmitted) {
        result = null
      } else {
        result = this.appointment.selectedTime !== null
      }
      return result
    },
    smsInvalidFeedback () {
      let feedback
      if (this.formSubmitted && !this.appointment.smsConsent) {
        feedback = 'SMS consent is required to set the appointment'
      } else {
        feedback = ''
      }
      return feedback
    },
    smsState () {
      let result
      if (!this.formSubmitted) {
        result = null
      } else {
        result = this.appointment.smsConsent
      }
      return result
    },
    showDialog () {
      // this is they ke computed method that returns the shared appointment state of
      // showScheduleDialog.  Whenever this parte of the shared state changes we will show
      // the dialog.
      return this.$store.state.appointment.showScheduleDialog
    },
    emailState () {
      let result
      if (!this.formSubmitted) {
        result = null
      } else if (this.appointment.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) { // eslint-disable-line no-useless-escape
        result = true
      } else {
        result = false
      }
      return result
    },
    emailInvalidFeedback () {
      let result
      if (this.emailState === false) {
        result = 'Invalid email address'
      } else {
        result = ''
      }
      return result
    },
    phoneNumberCompact () {
      return phoneFormatter(this.appointment.phone, 'compact')
    },
    phoneState () {
      let result
      if (!this.formSubmitted) {
        result = null
      } else if (EntityParser.phoneNumber(this.appointment.phone)) {
        result = true
      } else {
        result = false
      }
      return result
    },
    phoneInvalidFeedback () {
      let result
      if (this.phoneState === false) {
        result = 'Phone number should have 10 digits'
      } else {
        result = ''
      }
      return result
    },
    appointmentDateTime () {
      let result
      if (this.appointment.selectedDate !== null && this.appointment.selectedTime !== null) {
        try {
          let dt = this.$store.state.appointmentOptions.dates[this.appointment.selectedDate]
          let tm = EntityParser.normalizeTime(this.appointment.selectedTime)
          result = EntityParser.dateFromString(dt, tm)
        } catch (err) {
          console.log(`Err determining the appt time:  ${err}`)
          result = new Date(0)
        }
      } else {
        result = new Date(0)
      }
      return result
    },
    appointmentDateTimeAsString () {
      return format(this.appointmentDateTime, 'EEEE, MMMM do, p')
    },
    bdcPhoneCompact () {
      return phoneFormatter(this.$store.state.dealer.phone.bdc, 'compact')
    }
  },
  methods: {
    appointmentPayload () {
      let payload = {}
      payload.email = this.appointment.email
      payload.phone = this.phoneNumberCompact
      payload.dateTime = this.appointmentDateTime
      payload.smsConsent = this.appointment.smsConsent
      return payload
    },
    validateForm: function () {
      this.formSubmitted = true
      return this.emailState && this.phoneState && this.appointment.smsConsent && this.dateState && this.timeState
    },
    handleSubmit: function () {
      this.formSubmitted = true
      // check validity
      this.$ga.event('appointment', 'submit', this.$store.state.appointment.source)
      if (this.validateForm()) {
        // ready to submit
        this.$ga.event('appointment', 'post-send', this.$store.state.appointment.source)
        // make the api call to send the data
        this.apiProcessing = true
        ServiceHubAPI.postAppointment(this.$store.state.params, this.appointmentPayload(), this.$store.state.dealer, this.$store.state.appointment)
          .then((data) => {
            // Hide the modal manually
            this.apiProcessing = false
            // this.$refs.modal.hide()
            this.scheduleApptSuccess = true
            this.showScheduleForm = false
            this.$ga.event('appointment', 'post-success', this.$store.state.appointment.source)
          }).catch((err) => {
            console.log(`Schedule Appt Err:  ${err}`)
            this.apiProcessing = false
            // this.$refs.modal.hide()
            this.scheduleApptError = true
            this.showScheduleForm = false
            this.$ga.event('appointment', 'post-error', this.$store.state.appointment.source)
          })
      } else {
        this.$ga.event('appointment', 'submit-invalid', this.$store.state.appointment.source)
      }
    },
    dataReset: function (src) {
      src.cancelClicked = false
      src.formSubmitted = false
      src.apiProcessing = false
      src.scheduleApptSuccess = false
      src.scheduleApptError = false
      src.showScheduleForm = true
      src.appointment.email = this.$store.state.params && this.$store.state.params.utm_email ? this.$store.state.params.utm_email : ''
      if (this.$store.state.params && this.$store.state.params.utm_phone) {
        src.appointment.phone = phoneFormatter(this.$store.state.params.utm_phone, 'compact')
      } else {
        src.appointment.phone = ''
      }
      src.appointment.smsConsent = false
      src.appointment.selectedDate = null
      src.appointment.selectedTime = null
      return src
    },
    handleShow: function () {
      this.$ga.event('appointment', 'show', this.$store.state.appointment.source)
      // reset the data on showing the dialog
      this.dataReset(this)
    },
    handleOk: function (bvModalEvent) {
      // Prevent modal from closing
      bvModalEvent.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    handleClose: function () {
      this.cancelClicked = true
      this.logAbandonEvent('cancel')
    },
    handleHide: function () {
      // only log the hide event if the cancel button was not clicked
      if (!this.cancelClicked) {
        this.logAbandonEvent('hide')
      }
    },
    logAbandonEvent: function (reason) {
      // This is an abandon event if we did not successfull schedule the appointment
      if (!this.scheduleApptSuccess) {
        this.$ga.event('appointment', 'abandon', reason)
      }
    }
  }
}
</script>

<style scoped lang="scss">
/* styles for xs screens go here */
.schedule-now {
  width: 171px;
  height: 45px;
  background-image: linear-gradient(#1f72e4, #1c62c5);
  border: #1c62c5;
  font-size: 12px;
  color: #ffffff;
  text-decoration: none;
  display: inline-block;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  cursor: pointer;
  border-radius: 0px;
}
.schedule-now-text {
  font-size: 1.3em;
}
.input-field-headers {
  color: #B5B5B5;
  letter-spacing: .25px;
}
.form-check-label {
  font-size: 11px;
  line-height: 12px;
  color: #77787b;
}

/* styles for different screen widths follow */
@media only screen and (min-width: 576px) {
}
@media only screen and (min-width: 768px) {
}
@media only screen and (min-width: 992px) {
}
@media only screen and (min-width: 1200px) {
}
</style>
