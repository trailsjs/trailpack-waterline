const _ = require('lodash')

module.exports = {

  /**
   * Augment the model definition with some waterline-required properties
   */
  transformModels (app) {
    const models = app.api.models
    const dbConfig = app.config.database
    return _.mapValues(models, (model, modelName) => {
      return _.defaultsDeep({ }, model, {
        identity: modelName.toLowerCase(),
        globalId: modelName,
        tableName: model.tableName || modelName.toLowerCase(),
        connection: model.store || dbConfig.models.defaultStore,
        migrate: model.migrate || dbConfig.models.migrate,
        dynamicFinders: false
      })
    })
  },

  /**
   * Transform the Trails.js "stores" config into a Waterline "adapters" object
   */
  transformAdapters (app) {
    const stores = app.config.database.stores
    const adapters = _.pluck(stores, 'adapter')
    return _.indexBy(adapters, 'identity')
  },

  /**
   * Transform the Trails.js "stores" config into a sails-like connections
   * object.
   */
  transformConnections (app) {
    const stores = app.config.database.stores
    return _.mapValues(stores, store => {
      return _.defaults({
        adapter: store.adapter.identity
      }, store)
    })
  },

  /**
   * Transform the resulting waterline orm definition into a globalId-indexed
   * map.
   */
  transformWaterlineOrm (orm) {
    return _.transform(orm.collections, (result, model) => {
      if (model.globalId) result[model.globalId] = model
    })
  }
}

