// tests/unit/utils/url-parser.spec.js
import { expect } from 'chai'
import { UrlParser } from '@/utils/url-parser'

describe('UrlParser', () => {
  describe('parseURL', () => {
    it('empty url empty object', () => {
      expect(UrlParser.parseURL('')).to.eql({})
    })
    it('undeinfed url empty object', () => {
      expect(UrlParser.parseURL()).to.eql({})
    })
    it('shouild have an empty object if there are no query string params', () => {
      expect(UrlParser.parseURL('http://localhost:8090'))
        .to.eql({})
    })
    it('find parms after ?', () => {
      expect(UrlParser.parseURL('http://localhost/?utm_content=fred&email=fred@fred.com'))
        .to.eql({ utm_content: 'fred', email: 'fred@fred.com', querystring: 'utm_content=fred&email=fred@fred.com' })
    })
    it('should properly parse a single key value', () => {
      expect(UrlParser.parseURL('http://localhost/?utm_content=fred'))
        .to.eql({ utm_content: 'fred', querystring: 'utm_content=fred' })
    })
    it('should properly support empty values', () => {
      expect(UrlParser.parseURL('http://localhost/?utm_content='))
        .to.eql({ utm_content: '', querystring: 'utm_content=' })
    })
    it('should properly support empty values when we have multiple', () => {
      expect(UrlParser.parseURL('http://localhost/?utm_content=fred&email='))
        .to.eql({ utm_content: 'fred', email: '', querystring: 'utm_content=fred&email=' })
    })
    it('should properly ignore a #/<anything> at the end of URL', () => {
      expect(UrlParser.parseURL('http://localhost:8090/?utm_content=jane#/tips'))
        .to.eql({ utm_content: 'jane', querystring: 'utm_content=jane' })
    })
    it('should url decode qs values', () => {
      expect(UrlParser.parseURL('http://localhost:8090/?email=fred%40fred.com#/'))
        .to.eql({ email: 'fred@fred.com', querystring: 'email=fred%40fred.com' })
    })
    it('should parse the params with SPA style url', () => {
      expect(UrlParser.parseURL('https://bmwnorthwest.servicehub.com/#/?utm_content=coupon01&email=fred@fred.com'))
        .to.eql({ utm_content: 'coupon01', email: 'fred@fred.com', querystring: 'utm_content=coupon01&email=fred@fred.com' })
    })
  }) // parseURL
  describe('parse domain', () => {
    it('should return empty values for empty string', () => {
      expect(UrlParser.parseDomain())
        .to.eql({ domain: '', subDomain: '', hostName: '' })
    })
    it('should parse domain for subdomain and domain', () => {
      expect(UrlParser.parseDomain('http://localhost:8090'))
        .to.eql({ domain: 'localhost', subDomain: '', hostName: 'localhost' })
    })
    it('should parse domain and subdomain and domain from full url', () => {
      expect(UrlParser.parseDomain('https://bmwnorthwest.servicehub.com/?utm_content=applepie'))
        .to.eql({ domain: 'servicehub.com', hostName: 'bmwnorthwest.servicehub.com', subDomain: 'bmwnorthwest' })
    })
    it('should parse domain and subdomain from full url with #', () => {
      expect(UrlParser.parseDomain('https://bmwnorthwest.servicehub.com/#/?utm_content=coupon01&email=fred@fred.com'))
        .to.eql({ domain: 'servicehub.com', hostName: 'bmwnorthwest.servicehub.com', subDomain: 'bmwnorthwest' })
    })
  }) // parseDomain
  describe('parseParams', () => {
    it('parse params from the URL', () => {
      expect(UrlParser.parseParams('https://bmwnorthwest.servicehub.com/#/?utm_content=coupon01&email=fred@fred.com'))
        .to.eql({ dealer_id: 'bmwnorthwest.servicehub.com', utm_content: 'coupon01', email: 'fred@fred.com', querystring: 'utm_content=coupon01&email=fred@fred.com' })
    })
    it('should override dealer id from query string', () => {
      expect(UrlParser.parseParams('https://bmwnorthwest.servicehub.com/#/?utm_content=coupon01&email=fred@fred.com&dealer_id=bmworlando'))
        .to.eql({ dealer_id: 'bmworlando', utm_content: 'coupon01', email: 'fred@fred.com', querystring: 'utm_content=coupon01&email=fred@fred.com&dealer_id=bmworlando' })
    })
    it('should have an empty params object', () => {
      expect(UrlParser.parseParams('http://localhost:8090'))
        .to.eql({ dealer_id: 'localhost' })
    })
    it('should not override the hostname as dealer_id if dealer_id param is empty', () => {
      expect(UrlParser.parseParams('https://localhost:8090/?utm_content=coupon02&dealer_id=#/'))
        .to.eql({ dealer_id: 'localhost', utm_content: 'coupon02', querystring: 'utm_content=coupon02&dealer_id=' })
    })
  }) // dealerIdFromURL
}) // UrlParser
