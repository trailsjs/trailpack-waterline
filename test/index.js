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
    before(() => {
      pack = new Pack(require('./testapp'))
      pack.configure()
      return pack.initialize()
    })

    it('should expose the "orm" property', () => {
      assert(pack.orm)
      assert(pack.orm.collections.user)
      assert(pack.orm.collections.role)
    })

    it('should be able to query things', () => {
      const Role = pack.orm.collections.role
      return Role.find().then(results => {
        assert(results)
        assert.equal(results.length, 0)
      })
    })
    it('should be able to insert things', () => {
      const Role = pack.orm.collections.role
      return Role.create({ name: 'foo' })
        .then(role => {
          assert(role)
          assert.equal(role.name, 'foo')

          return Role.find()
        })
        .then(roles => {
          assert.equal(roles.length, 1)
        })
    })

  })
})
