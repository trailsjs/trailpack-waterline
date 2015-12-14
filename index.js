'use strict'

const Trailpack = require('trailpack')
const _ = require('lodash')

/**
 * Waterline Trailpack
 *
 * Allow the trails application to interface with the Waterline ORM
 */
module.exports = class Waterline extends Trailpack {
  constructor (app, config) {
    super(app, {
      config: require('./config'),
      api: require('./api'),
      pkg: require('./package')
    })
  }
}
