// utils/filters.js
import Vue from 'vue'
import { EntityParser } from '@/utils/entity-parser'

export const phoneFormatter = function (value, options) {
  let phoneParts = EntityParser.phoneNumber(value)
  let result
  if (phoneParts) {
    if (!options || options === 'full') {
      result = `(${phoneParts[0]}) ${phoneParts[1]}-${phoneParts[2]}`
    } else if (options === 'compact') {
      result = phoneParts[0] + phoneParts[1] + phoneParts[2]
    } else {
      throw new Error('Invalid phoneFormatter option')
    }
  } else {
    result = value
  }
  return result
}

Vue.filter('phoneFormatter', phoneFormatter)
