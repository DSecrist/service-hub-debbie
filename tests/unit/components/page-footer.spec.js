import { expect } from 'chai'
import VueRouter from 'vue-router'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import PageFooter from '@/components/PageFooter.vue'

const localVue = createLocalVue()
localVue.use(VueRouter)
describe('PageFooter.vue', () => {
  let brand, dealer, pageFooter
  beforeEach(() => {
    brand = {
      logoImage: '/images/logoBrand.jpg',
      copyright: 'BMW Test brand is copyrighted.',
      url: {
        ref: 'https://bmwbrand.com',
        text: 'BMW Test'
      }
    }
    dealer = {
      name: 'Freds BMW',
      address: {
        street: '101 Fred Dr',
        city: 'Fredstown',
        state: 'PA',
        zip: '30000'
      },
      affiliate: 'This site is an affiliate of BMW Group customer experience.',
      phone: {
        sales: '9990001111',
        service: '8882223333'
      },
      url: {
        home: 'https://fredsbmw.com',
        directions: 'https://fredsbmw.com/directions',
        contact: 'https://fredsbmw.com/contact',
        about: 'https://fredsbmw.com/about',
        privacy: 'https://fredsbmw.com/privacy',
        sitemap: 'https://fredsbmw.com/sitemap'
      },
      serviceHours: {
        monday: '6:00AM- 5:30PM',
        tuesday: '6:00AM - 5:30PM',
        wednesday: '6:00AM - 5:30PM',
        thursday: '6:00AM - 5:30PM',
        friday: '6:00AM - 5:30PM',
        saturday: '8:00AM - 4:30pm'
      }
    }
    pageFooter = shallowMount(PageFooter, {
      propsData: { brand: brand, dealer: dealer },
      localVue
    })
  })
  it('should renter a footer component', () => {
    expect(pageFooter.name()).to.equal('PageFooter')
  })
  it('should have a full year equal to current year', () => {
    const currentYear = (new Date()).getFullYear()
    expect(pageFooter.vm.fullYear).to.equal(currentYear)
  })
})
