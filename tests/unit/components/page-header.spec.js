import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import PageHeader from '@/components/PageHeader.vue'

describe('PageHeader.vue', () => {
  let brand, dealer, pageHeader
  beforeEach(() => {
    brand = {
      logoImage: '/images/logoBrand.jpg'
    }
    dealer = {
      name: 'Freds BMW',
      phone: {
        sales: '999.000.1111',
        service: '888-222-3333'
      },
      url: {
        home: 'https://fredsbmw.com'
      },
      address: {
        street: '101 Fred Dr',
        city: 'Fredstown',
        state: 'PA',
        zip: '30000'
      }
    }
    pageHeader = shallowMount(PageHeader, {
      propsData: { brand: brand, dealer: dealer }
    })
  })
  it('should render a header component', () => {
    expect(pageHeader.name()).to.equal('PageHeader')
  })
  it('renders header that includes dealer name', () => {
    expect(pageHeader.text()).to.include(dealer.name)
  })
  it('renders header with brand logo image', () => {
    expect(pageHeader.find('.logo').attributes('src')).equals(brand.logoImage)
  })
  it('should properly render the sales phone number', () => {
    expect(pageHeader.find('#dealer-numbers').text().includes('(999) 000-1111')).to.equal(true)
  })
  it('should properly render the service phone number', () => {
    expect(pageHeader.find('#dealer-numbers').text().includes('(888) 222-3333')).to.equal(true)
  })
  it('should render the address', () => {
    expect(pageHeader.find('.dealership-address-hide').text().includes('101 Fred Dr, Fredstown PA 30000')).to.equal(true)
  })
  it('should format the address for the dealer', () => {
    expect(pageHeader.vm.address).to.equal('101 Fred Dr, Fredstown PA 30000')
  })
})
