// tests/unit/views/tips.spec.js
import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Tips from '@/views/Tips.vue'
import nock from 'nock'

describe('Tips.vue', () => {
  let tips
  let tipsRequest // eslint-disable-line no-unused-vars
  let articleRequest // eslint-disable-line no-unused-vars
  beforeEach(() => {
    tipsRequest = nock(`${process.env.VUE_APP_SERVICE_BASE_URL}`)
      .get('/static/data/bmw.tips.json')
      .reply(200, {
        hero: {
          imageUrl: '/static/images/tips.jpg',
          heading: 'Drive Smart',
          subHeading: 'Get really smart by driving BMW'
        }
      })
    articleRequest = nock(`${process.env.VUE_APP_SERVICE_BASE_URL}`)
      .get('/static/data/bmw/seasonal_article_00_snippet.html')
      .reply(200, ''
      )
    tips = shallowMount(Tips, {
      mocks: {
        $store: {
          state: {
            brand: {
              name: 'bmw'
            }
          }
        }
      }
    })
  })
  it('should renter a tips view', () => {
    expect(tips.name()).to.equal('Tips')
  })
})
