<template>
  <b-navbar toggleable="md" type="light" variant="light" id="nav">
    <div class="container-fluid navbar-default">
      <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>
      <b-collapse id="nav-text-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/" link-classes="nav-link-style">Service Specials</b-nav-item>
          <b-nav-item v-on:click="scheduleService('navigation')" link-classes="nav-link-style">Quick Schedule</b-nav-item>
          <b-nav-item to="/tips" link-classes="nav-link-style">Tips &amp; Guides</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </div>
  </b-navbar>
</template>

<script>
import { BNavbar, BNavbarToggle, BCollapse, BNavbarNav, BNavItem } from 'bootstrap-vue'

export default {
  name: 'AppNavigation',
  components: {
    'b-navbar': BNavbar,
    'b-navbar-toggle': BNavbarToggle,
    'b-collapse': BCollapse,
    'b-navbar-nav': BNavbarNav,
    'b-nav-item': BNavItem
  },
  methods: {
    scheduleService: function (source) {
      this.$store.commit('showScheduleDialog', { coupon: '', source: source })
    }
  }
}
</script>

<style scoped lang="scss">
#nav {
  text-align: left;
}
.navbar-default {
  position: relative;
  z-index: 1;
  left: 140px;
}
.nav-item {
  font-size: 14px;
}
.nav-link-style {
  color:#000000 !important;
}
@media only screen and (min-width: 576px) {
  .navbar-default {
    position: relative;
    z-index: 1;
    left: 150px;
  }
}
@media only screen and (min-width: 768px) {
  .navbar-default {
    position: relative;
    z-index: 1;
    left: 150px;
  }
}
@media only screen and (min-width: 992px) {
  .navbar-default {
    position: relative;
    z-index: 1;
    left: 150px;
  }
  .nav-item {
    font-size: 16px;
    padding-right: 8px;
  }

}
@media only screen and (min-width: 1200px) {
  .navbar-default {
    position: relative;
    z-index: 1;
    left: 150px;
  }
}
</style>
