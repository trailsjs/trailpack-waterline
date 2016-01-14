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
          return { }
        }
        static schema () {
          return {
            name: 'string',
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


