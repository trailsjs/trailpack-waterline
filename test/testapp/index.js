module.exports = {
  api: {
    models: {
      User: {
        attributes: {
          roles: {
            collection: 'Role',
            via: 'user'
          }
        }
      },
      Role: {
        store: 'storeoverride',
        migrate: 'drop',
        attributes: {
          name: 'string',
          user: {
            collection: 'User',
            via: 'roles',
            dominant: true
          }
        }
      }
    }
  },
  config: {
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
}
