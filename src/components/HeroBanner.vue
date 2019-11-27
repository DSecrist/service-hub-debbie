<template>
  <div class="hero-image" v-bind:style="{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),' + 'url(' + heroImage + ')' }">
    <div class="container-fluid">
      <div class="hero-text">
        <h1 class="hero-header">{{ heading }}</h1>
        <p>{{ subHeading}} </p>
        <ScheduleServiceButton coupon-id="" v-bind:source="'hero-' + category">
        </ScheduleServiceButton>
      </div>
    </div>
  </div>
</template>

<script>
import ScheduleServiceButton from '@/components/ScheduleServiceButton'
export default {
  name: 'HeroBanner',
  components: {
    ScheduleServiceButton
  },
  props: {
    heroImage: String,
    heading: {
      type: String,
      default: 'Appointments in One Click'
    },
    subHeading: {
      type: String,
      default: 'Easily Schedule BMW Service Today'
    },
    category: {
      type: String,
      default: 'hero'
    }
  }
}
</script>

<style scoped lang="scss">
/* styles for xs screens go here */
.hero-image {
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
  height: 45vh;
  width: 100vw;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}
.hero-header {
  font-size: 46px;
  line-height: 48px;
}
.hero-text {
  text-align: left;
  position: absolute;
  top: 70%;
  left: 45%;
  transform: translate(-50%, -50%);
  color: white;
}
p {
  font-size: 15px;
  line-height: 17px;
}
/* styles for different screen widths follow */
@media only screen and (min-width: 576px) {
  .hero-image {
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
    height: 55vh;
    width: 100vw;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
  }
  .hero-text {
    text-align: left;
    position: absolute;
    top: 70%;
    left: 40%;
    transform: translate(-50%, -50%);
    color: white;
  }
  p {
    font-size: 18px;
    line-height: 20px;
  }
}
@media only screen and (min-width: 768px) {
  .hero-image {
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
    height: 55vh;
    width: 100vw;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
  }
  .hero-text {
    text-align: left;
    position: absolute;
    top: 70%;
    left: 40%;
    transform: translate(-50%, -50%);
    color: white;
  }
  p {
      font-size: 20px;
      line-height: 22px;
  }
}
@media only screen and (min-width: 992px) {
  .hero-image {
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
    height: 60vh;
    width: 100vw;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
  }
  .hero-text {
    text-align: left;
    position: absolute;
    top: 70%;
    left: 30%;
    transform: translate(-50%, -50%);
    color: white;
  }
  p {
      font-size: 20px;
      line-height: 22px;
  }
}
@media only screen and (min-width: 1200px) {
  .hero-image {
    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
    height: 55vh;
    width: 100vw;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
  }
  .hero-text {
    text-align: left;
    position: absolute;
    top: 70%;
    left: 25%;
    transform: translate(-50%, -50%);
    color: white;
  }
  p {
      font-size: 20px;
      line-height: 22px;
  }
}
</style>
