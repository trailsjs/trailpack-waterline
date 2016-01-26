'use strict'

const assert = require('assert')

describe('lib.Transformer.WaterlineCallbacks', () => {
  let FootprintService
  before(() => {
    FootprintService = global.app.services.FootprintService
  })
  describe('#beforeCreate', () => {
    it('beforeCreate should be called', () => {
      return FootprintService.create('BeforeCreate', { name: 'trailsuser' })
        .then(record => {
          assert.equal(record.name, 'trailsuser beforeCreate')
        })
    })
  })
  describe('#afterCreate', () => {
    it('afterCreate should be called', () => {
      return FootprintService.create('AfterCreate', { name: 'trailsuser' })
        .then(record => {
          assert.equal(record.name, 'trailsuser afterCreate')
        })
    })
  })
  describe('#beforeUpdate', () => {
    it('beforeUpdate should be called', () => {
      return FootprintService.create('BeforeUpdate', { name: 'trailsuser' })
        .then(record => {
          assert.equal(record.name, 'trailsuser')
          assert(record.id)
          return FootprintService.update(
            'BeforeUpdate',
            { name: 'trailsuser' },
            { name: 'updated' }
          )
        })
        .then(records => {
          assert(records[0])
          assert.equal(records[0].name, 'updated beforeUpdate')
        })
    })
  })
  describe('#afterUpdate', () => {
    it('afterUpdate should be called', () => {
      return FootprintService.create('AfterUpdate', { name: 'trailsuser' })
        .then(record => {
          assert.equal(record.name, 'trailsuser')
          assert(record.id)
          return FootprintService.update(
            'AfterUpdate',
            { name: 'trailsuser' },
            { name: 'updated' }
          )
        })
        .then(records => {
          assert(records[0])
          assert.equal(records[0].name, 'updated afterUpdate')
        })
    })
  })
  describe('#beforeValidate', () => {
    it('beforeValidate should be called', () => {
      return FootprintService.create('BeforeValidate', { name: 'trailsuser'})
        .then(record => {
          assert.equal(record.name, 'trailsuser beforeValidate')
        })
    })
  })
  describe('#afterValidate', () => {
    it('afterValidate should be called', () => {
      return FootprintService.create('AfterValidate', { name: 'trailsuser'})
        .then(record => {
          assert.equal(record.name, 'trailsuser afterValidate')
        })
    })
  })

  describe('#beforeDestroy', () => {
    it.skip('TODO beforeDestroy')
  })
  describe('#afterDestroy', () => {
    it.skip('TODO afterDestroy')
  })

})




