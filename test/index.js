'use strict'

const assert = require('assert')
const Pack = require('..')

describe('Trailpack', () => {
  describe('#validate', () => {

  })
  describe('#configure', () => {
    let pack
    beforeEach(() => {
      pack = new Pack(require('./testapp'))
      pack.configure()
    })

    it('should load collections', () => {
      assert(pack.wl)
      assert.equal(pack.wl['_collections'].length, 2)
    })
    it('should load and transform models', () => {
      assert(pack.models)
      assert(pack.models.User)
      assert(pack.models.Role)
    })
    it('should load and transform connections', () => {
      assert(pack.connections)
      assert(pack.connections.teststore)
      assert(pack.connections.storeoverride)
    })
  })
  describe('#initialize', () => {
    let pack
    beforeEach(() => {
      pack = new Pack(require('./testapp'))
      pack.configure()
      console.log(pack.models)
      return pack.initialize()
    })

    it('should expose the "orm" property', () => {
      assert(pack.orm)
    })

  })
})
