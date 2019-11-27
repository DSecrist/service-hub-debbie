import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import HeroBanner from '@/components/HeroBanner.vue'

describe('HeroBanner.vue', () => {
  let heroBanner, heroImage
  beforeEach(() => {
    heroImage = '/images/hero.jpg'
    heroBanner = shallowMount(HeroBanner, {
      propsData: { heroImage: heroImage }
    })
  })
  it('should render a hero component', () => {
    expect(heroBanner.name()).to.equal('HeroBanner')
  })
})
