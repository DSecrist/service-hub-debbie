// tests/unit/components/tip-tile.spec.js
import { expect } from 'chai'
import VueRouter from 'vue-router'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import TipTile from '@/components/TipTile.vue'

const localVue = createLocalVue()
localVue.use(VueRouter)
describe('TipTile', () => {
  let tipTile, category, imageUrl, headline, articles
  beforeEach(() => {
    category = 'tires'
    imageUrl = '/static/images/tire-checkup.jpg'
    headline = 'Check your Tires'
    articles = [
      { id: '0', text: 'Tires require checking every 5,000 miles' },
      { id: '1', text: 'Tire s are important to you gas milage' }
    ]
    tipTile = shallowMount(TipTile, {
      propsData: {
        category: category,
        imageUrl: imageUrl,
        headline: headline,
        articles: articles
      },
      localVue
    })
  })
  it('should renter a tip tile component', () => {
    expect(tipTile.name()).to.equal('TipTile')
  })
}) // TipTile
