const assert = require('assert')
//const app = require('../app')
const lib = require('../../lib')

describe('lib.Transformer', () => {
  describe('#transformModels', () => {
    it('should augment the models with identity and globalId', () => {
      const models = lib.Transformer.transformModels(global.app)

      assert(models.User)
      assert.equal(models.User.identity, 'user')
      assert.equal(models.User.globalId, 'User')
      assert.equal(models.User.migrate, 'drop')

      assert(models.Role)
      assert.equal(models.Role.identity, 'role')
      assert.equal(models.Role.globalId, 'Role')
      assert.equal(models.Role.migrate, 'drop')
    })
    it('should correctly set the connection', () => {
      const models = lib.Transformer.transformModels(global.app)

      assert.equal(models.User.connection, 'teststore')
      assert.equal(models.Role.connection, 'storeoverride')
    })
  })

  describe('#transformAdapters', () => {
    it('should transform adapters correctly', () => {
      const adapters = lib.Transformer.transformAdapters(global.app)

      assert(adapters['waterline-sqlite3'])
      assert(adapters['waterline-sqlite3'].registerConnection)
    })
  })

  describe('#transformConnections', () => {
    it('should transform properly', () => {
      const connections = lib.Transformer.transformConnections(global.app)

      assert(connections.teststore)
      assert.equal(connections.storeoverride.adapter, 'waterline-sqlite3')
    })
  })

})
