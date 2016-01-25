'use strict'

const assert = require('assert')

describe('lib/waterline.callbacks', () => {
  let FootprintService
  before(() => {
    FootprintService = global.app.services.FootprintService
  })
  describe('#beforeCreate', () => {
    it('should insert a user record and hash password', () => {
      return FootprintService.create('User', { name: 'trailsuser', password: 'password' })
        .then(user => {
          assert.equal(user.password, '#password')
        })
    })
  })
  describe('#afterCreate', () => {
    it('should insert a user record and add displayName', () => {
      return FootprintService.create('User', { name: 'trailsuser', password: 'password' })
        .then(user => {
          assert.equal(user.displayName, 'Trails.js user ' + user.name)
        })
    })
  })
})
