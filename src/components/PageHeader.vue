<template>
  <div class="container-fluid top-banner">
    <div class="row">
      <a v-bind:href="dealer.url.home"><img class="logo" v-bind:src="brand.logoImage"></a>
      <div class="col-12 dealership-info text-center">
        <span>{{ dealer.name }} <span class="dealership-address-hide" >&nbsp;&#124;&nbsp;{{ address }}</span><span class="dealership-directions-hide" >&nbsp;&#124;&nbsp; Directions</span></span>
        <span id="dealer-numbers" class="phone-numbers-hide">&nbsp;&nbsp;&#124;&nbsp;&nbsp;Sales: {{ dealer.phone.sales | phoneFormatter }}&nbsp;&nbsp;&nbsp;&#124;&nbsp;&nbsp;Service: {{ dealer.phone.service | phoneFormatter }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageHeader',
  props: {
    brand: Object,
    dealer: Object
  },
  computed: {
    address: function () {
      return `${this.dealer.address.street}, ${this.dealer.address.city} ${this.dealer.address.state} ${this.dealer.address.zip}`
    }
  } // methods
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.top-banner {
  height: 40px;
  border: 1px solid #404040;
  background-color: #404040;
  position: relative;
}
.dealership-info {
  font-size: 14px;
  font-weight: regular;
  color: #ffffff;
  z-index: 1;
  position: relative;
  top: -90px;
  right: -70px;
}
.logo {
  width: auto;
  height: 100px;
  position: relative;
  z-index: 5;
  top: 15px;
  right: -50px;
}
.dealership-address-hide {
  display: none;
}
.dealership-directions-hide {
  display: none;
}
.phone-numbers-hide {
  display: none;
}
/*small device responsive style*/
@media only screen and (min-width: 576px) {
  .dealership-info {
    font-size: 14px;
    font-weight: regular;
    color: #ffffff;
    text-align: center;
    z-index: 1;
    position: relative;
    top: -98px;
  }
  .logo {
    width: 99px;
    height: 110px;
    position: relative;
    z-index: 5;
    top: 15px;
    right: -50px;
  }
  .dealership-address-hide {
    display: none;
  }
  .dealership-directions-hide {
    display: none;
  }
  .phone-numbers-hide {
    display: none;
  }
}
/*medium device responsive style*/
@media only screen and (min-width: 768px) {
  /* Top Banner */
  .dealership-info {
    font-size: 12px;
    font-weight: regular;
    color: #ffffff;
    text-align: center;
    z-index: 1;
    position: relative;
    top: -98px;
    left: auto;
  }
  .dealership-address-hide {
    display: none;
    }
  .dealership-directions-hide {
    display: inline-block;
    }
  .phone-numbers-hide {
    display: inline-block;
    }
}
/*large device responsive style*/
@media only screen and (min-width: 992px) {
  .dealership-info {
    font-size: 12px;
    font-weight: regular;
    color: #ffffff;
    text-align: center;
    z-index: 1;
    position: relative;
    top: -98px;
    left: auto;
  }
  .dealership-address-hide {
    display: inline-block;
  }
  .dealership-directions-hide {
    display: none;
  }
}
/*extra large device responsive style*/
@media only screen and (min-width: 1200px) {
  .dealership-info {
    font-size: 14px;
    font-weight: regular;
    color: #ffffff;
    text-align: center;
    z-index: 1;
    position: relative;
    top: -98px;
    left: auto;
  }
}
</style>
