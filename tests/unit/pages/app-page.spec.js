import Vue from 'vue'
import { expect } from 'chai'
import sinon from 'sinon'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import AppPage from '@/pages/AppPage.vue'

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(Vuex)
describe('AppPage.vue', () => {
  let appPage // eslint-disable-line no-unused-vars
  let mutations
  let state
  let store
  beforeEach(() => {
    mutations = {
      showScheduleDialog: sinon.fake()
    }
    state = {
      params: {
        show_modal: 'false'
      },
      brand: {
        name: 'bmw'
      }
    }
    store = new Vuex.Store({
      state: state,
      mutations: mutations
    })
  }) // beforeEach
  afterEach(() => {
    sinon.restore()
  })
  describe('show modal on render', () => {
    beforeEach(() => {
      state.params.show_modal = 'true'
      appPage = shallowMount(AppPage, {
        store,
        localVue
      })
    })
    it('should call the show dialog mutation on render', () => {
      return Vue.nextTick().then(function () {
        expect(mutations.showScheduleDialog.callCount).to.equal(1)
      })
    })
  })
  describe('do not show modal on render', () => {
    beforeEach(() => {
      state.params.show_modal = 'false'
      appPage = shallowMount(AppPage, {
        store,
        localVue
      })
    })
    it('should call the show dialog mutation on render', () => {
      return Vue.nextTick().then(function () {
        expect(mutations.showScheduleDialog.callCount).to.equal(0)
      })
    })
  })
  describe('brandAppPageClass', () => {
    describe('no error', () => {
      beforeEach(() => {
        state.error = null
        appPage = shallowMount(AppPage, {
          store,
          localVue
        })
      }) // beforeEach
      it('should render the branded app page class', () => {
        expect(appPage.vm.brandAppPageClass).to.equal('bmw-app-page')
      })
      it('should have the main div with the branded class', () => {
        expect(appPage.find('#app-page').classes()).to.eql(['bmw-app-page'])
      })
    }) // no error
    describe('error', () => {
      beforeEach(() => {
        state.error = 'Unable to load dealer settings'
        appPage = shallowMount(AppPage, {
          store,
          localVue
        })
      }) // beforeEach
      afterEach(() => {
        state.error = null
      }) // afterEach
      it('should render the h1 with the error message', () => {
        expect(appPage.find('h1').text()).to.eql('Unable to load dealer settings')
      })
      it('should have the non branded app page class', () => {
        expect(appPage.vm.brandAppPageClass).to.eql('app-page')
      })
      it('should render the main app div with gthe generic class name', () => {
        expect(appPage.find('#app-page').classes()).to.eql(['app-page'])
      })
    }) // error
  }) // brandAppPageClass
}) // AppPage.vue
