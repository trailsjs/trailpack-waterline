'use strict'

const _ = require('lodash')
const smokesignals = require('smokesignals')
const Model = require('trails-model')

module.exports = _.defaultsDeep({
  pkg: {
    name: 'waterline-trailpack-test'
  },
  api: {
    models: {
      User: class User extends Model {
        static config () {
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
      BeforeCreate: class BeforeCreate extends Model {
        static config () {
          return {
            beforeCreate: function(values, cb){
              values.name = values.name + ' beforeCreate';
              cb()
            }
          }
        }
        static schema () {
          return {
            name: 'string'
          }
        }
      },
      AfterCreate: class BeforeCreate extends Model {
        static config () {
          return {
            afterCreate: function(values, cb){
              values.name = values.name + ' afterCreate';
              cb()
            }
          }
        }
        static schema () {
          return {
            name: 'string'
          }
        }
      },
      BeforeUpdate: class BeforeCreate extends Model {
        static config () {
          return {
            beforeUpdate: function(values, cb){
              values.name = values.name + ' beforeUpdate';
              cb()
            }
          }
        }
        static schema () {
          return {
            name: 'string'
          }
        }
      },
      AfterUpdate: class BeforeCreate extends Model {
        static config () {
          return {
            afterUpdate: function(values, cb){
              values.name = values.name + ' afterUpdate';
              cb()
            }
          }
        }
        static schema () {
          return {
            name: 'string'
          }
        }
      },
      BeforeValidate: class BeforeCreate extends Model {
        static config () {
          return {
            beforeValidate: function(values, cb){
              values.name = values.name + ' beforeValidate';
              cb()
            }
          }
        }
        static schema () {
          return {
            name: 'string'
          }
        }
      },
      AfterValidate: class BeforeCreate extends Model {
        static config () {
          return {
            afterValidate: function(values, cb){
              values.name = values.name + ' afterValidate';
              cb()
            }
          }
        }
        static schema () {
          return {
            name: 'string'
          }
        }
      },
      BeforeDestroy: class BeforeCreate extends Model {
        static config () {
          return {
            beforeDestroy: function(values, cb){
              values.name = values.name + ' beforeDestroy';
              console.log('"beforeDestroy"')
              cb()
            }
          }
        }
        static schema () {
          return {
            name: 'string'
          }
        }
      },
      AfterDestroy: class BeforeCreate extends Model {
        static config () {
          return {
            afterDestroy: function(values, cb){
              values.name = values.name + ' afterDestroy';
              cb()
            }
          }
        }
        static schema () {
          return {
            name: 'string'
          }
        }
      }
    }
  },
  config: {
    main: {
      packs: [
        smokesignals.Trailpack,
        require('trailpack-core'),
        require('../') // trailpack-waterline
      ]
    },
    database: {
      stores: {
        teststore: {
          adapter: require('waterline-sqlite3')
        },
        storeoverride: {
          adapter: require('waterline-sqlite3'),
          otherConfig: true
        }
      },
      models: {
        defaultStore: 'teststore',
        migrate: 'drop'
      }
    }
  }
}, smokesignals.FailsafeConfig)


