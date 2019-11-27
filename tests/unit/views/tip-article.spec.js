// tests/unit/views/tip-article.spec.js
import { expect } from 'chai'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import TipArticle from '@/views/TipArticle.vue'
import nock from 'nock'

const localVue = createLocalVue()
describe('TipArticle.vue', () => {
  let tipArticle
  let tipsRequest // eslint-disable-line no-unused-vars
  let articleRequest // eslint-disable-line no-unused-vars
  beforeEach(() => {
    tipsRequest = nock(`${process.env.VUE_APP_SERVICE_BASE_URL}`)
      .get('/static/data/bmw.tips.json')
      .reply(200, {
        heading: 'Tips and Guides',
        content: 'Get educated',
        hero: {
          imageUrl: '/static/images/bmw_hero_image_tips_page.jpg',
          heading: 'Drive Smarter',
          subHeading: 'Learn more with these tips and guides.'
        },
        tiles: [
          {
            category: 'seasonal',
            hero: {
              imageUrl: '/static/images/bmw_hero_image_articles_seasonal.jpg',
              heading: 'Drive Smarter',
              subHeading: 'Get your BMW serviced today.'
            },
            articles: [
              { id: '00', title: 'Its that time' }
            ]
          }
        ]
      })
    articleRequest = nock(`${process.env.VUE_APP_SERVICE_BASE_URL}`)
      .get('/static/data/bmw/seasonal_article_00_snippet.html')
      .reply(200, '<p>Seasonal Article</p>'
      )
    tipArticle = shallowMount(TipArticle, {
      mocks: {
        $store: {
          state: {
            brand: {
              name: 'bmw'
            }
          }
        },
        $route: {
          params: {
            category: 'seasonal',
            id: '00'
          }
        }
      },
      localVue
    })
  })
  it('should render a tip article view', () => {
    expect(tipArticle.name()).to.equal('TipArticle')
  })
})
