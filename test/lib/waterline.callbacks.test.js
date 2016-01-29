'use strict'

const assert = require('assert')

describe('lib.Transformer.WaterlineCallbacks', () => {
  let FootprintService
  before(() => {
    FootprintService = global.app.services.FootprintService

  })
  describe('#beforeCreate', () => {
    it('should create a record with beforeCreate attribute set', () => {
      //FootprintService.destroy('ModelCallbacks',{})
      return FootprintService.create('ModelCallbacks', { name: 'trails_beforeCreate', beforeCreate: 0, beforeValidate: 0 })
        .then(record => {
          assert.equal(record.beforeCreate, 1)
        })
    })
  })
  describe('#afterCreate', () => {
    it('should create a record with afterCreate attribute set', () => {
      //FootprintService.destroy('ModelCallbacks',{})
      return FootprintService.create('ModelCallbacks', { name: 'trails_afterCreate', beforeValidate: 0, afterCreate: 0 })
        .then(record => {
          assert.equal(record.afterCreate, 1)
        })
    })
  })
  describe('#beforeUpdate', () => {
    it('beforeUpdate should be called', () => {
      return FootprintService.create('ModelCallbacks', { name: 'trails_beforeUpdate', beforeCreate: 0, beforeValidate: 0 })
        .then(record => {
          return FootprintService.update(
            'ModelCallbacks',
            { name: 'trails_beforeUpdate' },
            { name: 'trails_UpdatedBefore', beforeValidate: 0, beforeUpdate: 0 }
          )
        })
        .then(records => {
          assert.equal(records[0].beforeUpdate, 1)
        })
    })
  })
  describe('#afterUpdate', () => {
    it('beforeUpdate should be called', () => {
      return FootprintService.create('ModelCallbacks', { name: 'trails_afterUpdate', beforeValidate: 0 })
        .then(record => {
          return FootprintService.update(
            'ModelCallbacks',
            { name: 'trails_afterUpdate' },
            { name: 'trails_UpdatedAfter', beforeValidate: 0, afterUpdate: 0  }
          )
        })
        .then(records => {
          assert.equal(records[0].afterUpdate, 1)
        })
    })
  })
  describe('#beforeValidate', () => {
    it('should create a record with a beforeValidate attribute', () => {
      return FootprintService.create('ModelCallbacks', { name: 'trails_beforeCreate', beforeValidate: 0 })
        .then(record => {
          assert.equal(record.beforeValidate, 1)
        })
    })
  })
  describe('#afterValidate', () => {
    it('should create a record with a afterValidate attribute', () => {
      return FootprintService.create('ModelCallbacks', { name: 'trails_afterCreate', beforeValidate: 0, afterValidate: 0 })
        .then(record => {
          assert.equal(record.afterValidate, 1)
        })
    })
  })
  describe('#beforeDestroy', () => {
    it('should call the beforeDestroy callback and continue', () => {
      return FootprintService.create('ModelCallbacks', { name: 'trails_beforeDestroy', beforeValidate: 0 })
        .then(record => {
          return FootprintService.destroy('ModelCallbacks', { name: 'trails_beforeDestroy' })
        })
        .then(records => {
          return FootprintService.find('ModelCallbacks', { name: 'trails_beforeDestroy' })
        })
        .then(records => {
          assert.equal(records.length, 0)
        })
    })
  })
  describe('#afterDestroy', () => {
    it('should call the afterDestroy callback and continue', () => {
      return FootprintService.create('ModelCallbacks', { name: 'trails_afterDestroy', beforeValidate: 0 })
        .then(record => {
          return FootprintService.destroy('ModelCallbacks', { name: 'trails_afterDestroy' })
        })
        .then(records => {
          return FootprintService.find('ModelCallbacks', { name: 'trails_afterDestroy' })
        })
        .then(records => {
          assert.equal(records.length, 0)
        })
    })
  })

})
