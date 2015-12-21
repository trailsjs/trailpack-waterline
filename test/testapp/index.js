const _ = require('lodash')
const smokesignals = require('smokesignals')

module.exports = _.defaultsDeep({
  pkg: {
    name: 'waterline-trailpack-test'
  },
  api: {
    models: {
      User: {
        attributes: {
          name: 'string',
          roles: {
            collection: 'Role',
            via: 'user'
          }
        }
      },
      Role: {
        store: 'storeoverride',
        attributes: {
          name: 'string',
          user: {
            model: 'User'
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
        require('../../') // trailpack-waterline
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

