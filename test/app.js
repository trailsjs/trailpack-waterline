const _ = require('lodash')
const smokesignals = require('smokesignals')
const Model = require('trails/lib/Model')

module.exports = _.defaultsDeep({
  pkg: {
    name: 'waterline-trailpack-test'
  },
  api: {
    models: {
      User: class User extends Model {
        static config () {
          return {
            store: 'teststore'
          }
        }
        static schema () {
          return {
            name: 'string',
            password: 'string',
            displayName: 'string',
            roles: {
              collection: 'Role',
              via: 'user'
            }
          }
        }
      },
      Role: class Role extends Model {
        static config () {
          return {
            store: 'storeoverride'
          }
        }
        static schema () {
          return {
            name: 'string',
            user: {
              model: 'User'
            }
          }
        }
      },
      ModelCallbacks: class ModelCallbacks extends Model {
        static config () {
          return {
            store: 'teststore',
            beforeCreate: function(values, cb){
              values.beforeCreate += 1
              cb()
            },
            afterCreate: function(values, cb){
              values.afterCreate += 1
              cb()
            },
            beforeUpdate: function(values, cb){
              values.beforeUpdate += 1
              cb()
            },
            afterUpdate: function(values, cb){
              values.afterUpdate += 1
              cb()
            },
            beforeValidate: function(values, cb){
              values.beforeValidate += 1
              cb()
            },
            afterValidate: function(values, cb){
              values.afterValidate += 1
              cb()
            },
            beforeDestroy: function(values, cb){
              cb()
            },
            afterDestroy: function(values, cb){
              cb()
            }
          }
        }
        static schema () {
          return {
            name: 'string',
            beforeCreate: 'integer',
            afterCreate: 'integer',
            beforeUpdate: 'integer',
            afterUpdate: 'integer',
            beforeValidate: 'integer',
            afterValidate: 'integer'
          }
        }
      }
    }
  },
  config: {
    main: {
      packs: [
        require('../') // trailpack-waterline
      ]
    },
    stores: {
      teststore: {
        adapter: require('waterline-sqlite3'),
        migrate: 'drop'
      },
      storeoverride: {
        adapter: require('waterline-sqlite3'),
        otherConfig: true,
        migrate: 'drop'
      }
    }
  }
}, smokesignals.FailsafeConfig)
