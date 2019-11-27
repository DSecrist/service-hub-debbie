import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Home from '@/views/Home.vue'

describe('Home.vue', () => {
  let home
  beforeEach(() => {
    home = shallowMount(Home, {
      mocks: {
        $store: {
          state: {
            brand: {
              heroImage: '/static/images/iamahero.jpg'
            },
            dealer: {
              phone: {
                service: '9998883333'
              }
            },
            offers: [
              {
                id: 'mpucomp00'
              }
            ]
          }
        }
      }
    })
  })
  it('should renter a home view', () => {
    expect(home.name()).to.equal('Home')
  })
})
