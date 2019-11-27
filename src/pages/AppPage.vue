<template>
  <div id="app-page" v-bind:class="brandAppPageClass">
    <template v-if="!error">
      <PageHeader v-bind:brand="brand" v-bind:dealer="dealer"></PageHeader>
      <AppNavigation></AppNavigation>
      <ScheduleModal></ScheduleModal>
      <router-view/>
      <PageFooter v-bind:brand="brand" v-bind:dealer="dealer"></PageFooter>
    </template>
    <template v-else>
      <h1>{{ error }}</h1>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import PageHeader from '@/components/PageHeader'
import AppNavigation from '@/components/AppNavigation'
import PageFooter from '@/components/PageFooter'
import ScheduleModal from '@/components/ScheduleModal'

export default {
  name: 'AppPage',
  components: {
    PageHeader,
    AppNavigation,
    ScheduleModal,
    PageFooter
  },
  computed: mapState({
    params: state => state.params,
    dealer: state => state.dealer,
    brand: state => state.brand,
    error: state => state.error,
    brandAppPageClass (state) {
      return this.error !== null ? 'app-page' : `${state.brand.name}-app-page`
    }
  }),
  created: function () {
    // if query string optoin is on then call the mutation
    if (this.params.show_modal === 'true') {
      this.$nextTick(() => {
        console.log('App Page - created - open the dialog')
        this.$store.commit('showScheduleDialog', { coupon: '', source: 'auto-modal-open' })
      })
    }
  }
}
</script>

<style lang="scss">
@import "@/scss/_variables.scss";
%app-page-shared {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
  height: 100%;
  margin: 0;
  max-width: 100%;
  overflow-x: hidden
}
.app-page {
  @extend %app-page-shared;
  font-family: $generic-font-stack;
}
.bmw-app-page {
  @extend %app-page-shared;
  font-family: $bmw-font-stack;
}
@media only screen and (min-width: 576px) {
}

@media only screen and (min-width: 768px) {
}

@media only screen and (min-width: 992px) {
}

@media only screen and (min-width: 1200px) {
}
</style>
