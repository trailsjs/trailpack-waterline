const assert = require('assert')
const app = require('./testapp')
const lib = require('../lib')

describe('lib.Transforms', () => {
  describe('#transformModels', () => {
    it('should augment the models with identity and globalId', () => {
      const models = lib.Transforms.transformModels(app)

      assert(models.User)
      assert.equal(models.User.identity, 'user')
      assert.equal(models.User.globalId, 'User')
      assert.equal(models.User.migrate, 'safe')

      assert(models.Role)
      assert.equal(models.Role.identity, 'role')
      assert.equal(models.Role.globalId, 'Role')
      assert.equal(models.Role.migrate, 'alter')
    })
    it('should correctly set the connection', () => {
      const models = lib.Transforms.transformModels(app)

      assert.equal(models.User.connection, 'teststore')
      assert.equal(models.Role.connection, 'storeoverride')
    })
  })

  describe('#transformAdapters', () => {
    it('should transform adapters correctly', () => {
      const adapters = lib.Transforms.transformAdapters(app)

      assert(adapters['waterline-sqlite3'])
      assert(adapters['waterline-sqlite3'].registerConnection)
    })
  })

  describe('#transformConnections', () => {
    it('should transform properly', () => {
      const connections = lib.Transforms.transformConnections(app)

      assert(connections.teststore)
      assert.equal(connections.storeoverride.adapter, 'waterline-sqlite3')
    })
  })

})
