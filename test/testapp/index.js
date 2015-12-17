module.exports = {
  api: {
    models: {
      User: { },
      Role: {
        store: 'storeoverride',
        migrate: 'drop',
        attributes: {
          name: 'string'
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
