module.exports = {
  api: {
    models: {
      User: { },
      Role: {
        store: 'storeoverride',
        migrate: 'alter'
      }
    }
  },
  config: {
    database: {
      stores: {
        teststore: {
          adapter: require('waterline-sqlite3'),
        },
        storeoverride: {
          adapter: require('waterline-sqlite3'),
          otherConfig: true
        }
      },
      models: {
        defaultStore: 'teststore',
        migrate: 'safe'
      }
    }
  }
}
