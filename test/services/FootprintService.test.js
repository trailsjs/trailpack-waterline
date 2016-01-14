'use strict'

const assert = require('assert')

describe('api.services.FootprintService', () => {
  let FootprintService
  before(() => {
    FootprintService = global.app.services.FootprintService
  })
  describe('#create', () => {
    it('should insert a record', () => {
      return FootprintService.create('Role', { name: 'createtest' })
        .then(role => {
          assert.equal(role.name, 'createtest')
        })
    })
  })
  describe('#find', () => {
    it('should find a single record', () => {
      return FootprintService.create('Role', { name: 'findtest' })
        .then(role => {
          assert.equal(role.name, 'findtest')
          assert(role.id)
          return FootprintService.find('Role', role.id)
        })
        .then(role => {
          assert(!role.length)
          assert.equal(role.name, 'findtest')
        })
    })
    it('should find a set of records', () => {
      return FootprintService.create('Role', { name: 'findtest' })
        .then(role => {
          assert.equal(role.name, 'findtest')
          assert(role.id)
          return FootprintService.find('Role', { name: 'findtest' })
        })
        .then(roles => {
          assert(roles[0])
          //assert.equal(roles.length, 1)
          assert.equal(roles[0].name, 'findtest')
        })
    })
  })
  describe('#update', () => {
    it('should update a set of records', () => {
      return FootprintService.create('Role', { name: 'updatetest' })
        .then(role => {
          assert.equal(role.name, 'updatetest')
          assert(role.id)
          return FootprintService.update(
            'Role',
            { name: 'updatetest' },
            { name: 'updated' }
          )
        })
        .then(roles => {
          assert(roles[0])
          assert.equal(roles[0].name, 'updated')
        })
    })
  })
  describe('#destroy', () => {
    it('should delete a set of records', () => {
      return FootprintService.create('Role', { name: 'destroytest' })
        .then(role => {
          assert.equal(role.name, 'destroytest')
          assert(role.id)
          return FootprintService.destroy('Role', { name: 'destroytest' })
        })
        .then(roles => {
          assert(roles[0])
          assert.equal(roles[0].name, 'destroytest')
          return FootprintService.find('Role', { name: 'destroytest' })
        })
        .then(roles => {
          assert.equal(roles.length, 0)
        })
    })
  })
  describe('#createAssociation', () => {
    it('should insert an associated record', () => {
      let userId
      return FootprintService.create('User', { name: 'createassociationtest' })
        .then(user => {
          assert(user)
          assert(user.id)
          userId = user.id
          return FootprintService.createAssociation('User', user.id, 'roles', {
            name: 'createassociatedrole'
          })
        })
        .then(role => {
          assert(role)
          assert(role.id)
          return FootprintService.find('User', userId, {
            populate: [
              {
                attribute: 'roles',
                criteria: { }
              }
            ]
          })
        })
        .then(user => {
          assert(user)
          assert.equal(user.roles.length, 1)
          assert.equal(user.roles[0].name, 'createassociatedrole')
        })

    })
  })
  describe('#findAssociation', () => {
    it('should find an associated record', () => {
      let userId
      return FootprintService.create('User', { name: 'findassociationtest' })
        .then(user => {
          assert(user)
          assert(user.id)
          userId = user.id
          return FootprintService.createAssociation('User', user.id, 'roles', {
            name: 'findassociatedrole'
          })
        })
        .then(role => {
          assert(role)
          assert(role.id)
          return FootprintService.findAssociation('User', userId, 'roles', { }, {
            populate: [
              {
                attribute: 'user',
                criteria: { }
              }
            ]
          })
        })
        .then(roles => {
          assert(roles)
          assert(roles[0])
          assert.equal(roles[0].user.name, 'findassociationtest')
        })

    })
  })
  describe('#updateAssociation', () => {
    it('should update an associated record', () => {
      let userId
      return FootprintService.create('User', { name: 'updateassociationtest' })
        .then(user => {
          assert(user)
          assert(user.id)
          userId = user.id
          return FootprintService.createAssociation('User', user.id, 'roles', {
            name: 'findassociatedrole'
          })
        })
        .then(role => {
          assert(role)
          assert(role.id)
          return FootprintService.updateAssociation(
            'User',
            userId,
            'roles',
            { user: userId },
            { name: 'updateassociatedrole' }
          )
        })
        .then(roles => {
          assert(roles[0])
          assert.equal(roles[0].name, 'updateassociatedrole')
        })
    })
  })
  describe('#destroyAssociation', () => {
    it('should delete an associated record', () => {
      let userId
      return FootprintService.create('User', { name: 'destroyassociationtest' })
        .then(user => {
          assert(user)
          assert(user.id)
          userId = user.id
          return FootprintService.createAssociation('User', user.id, 'roles', {
            name: 'findassociatedrole'
          })
        })
        .then(role => {
          assert(role)
          assert(role.id)
          return FootprintService.destroyAssociation('User', userId, 'roles', role.id)
        })
        .then(roles => {
          assert(roles)
          return FootprintService.find('User', userId, { populate: [{ attribute: 'roles' }] })
        })
        .then(user => {
          assert.equal(user.roles.length, 0)
        })
    })
  })
})
