<template>
  <button class="ss-button ss-button1" v-on:click="scheduleService()">Schedule Service</button>
</template>

<script>
export default {
  name: 'ScheduleServiceButton',
  props: {
    couponId: String,
    source: String
  },
  methods: {
    scheduleService: function (source) {
      this.$store.commit('showScheduleDialog', { coupon: this.couponId, source: this.source })
    }
  }
}
</script>

<style scoped lang="scss">
/* styles for xs screens go here */
.ss-button {
  width: 171px;
  height: 45px;
  background-image: linear-gradient(#1f72e4, #1c62c5);
  border: #1c62c5;
  color: #ffffff;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  cursor: pointer;
}
.ss-button1 {
    width: 171px;
    height: 45px;
    background-image: linear-gradient(#1f72e4, #1c62c5);
}
.ss-button1:hover {
    background-image: linear-gradient(#1c69d3, #1c69d3);
    color: #ffffff;
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
