import { expect } from 'chai'
import VueRouter from 'vue-router'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import AppNavigation from '@/components/AppNavigation.vue'

const localVue = createLocalVue()
localVue.use(VueRouter)
describe('AppNavigation.vue', () => {
  let appNavigation
  beforeEach(() => {
    appNavigation = shallowMount(AppNavigation, {
      localVue
    })
  })
  it('should render a app navigation component', () => {
    expect(appNavigation.name()).to.equal('AppNavigation')
  })
}) // AppNavigation
