const _ = require('lodash')

module.exports = {

  /**
   * Augment the model definition with some waterline-required properties
   */
  transformModels (app) {
    const models = app.models
    const dbConfig = app.config.database
    return _.mapValues(models, (model, modelName) => {
      const config = model.constructor.config() || { }
      const schema = model.constructor.schema() || { }

      return {
        identity: modelName.toLowerCase(),
        globalId: modelName,
        tableName: config.tableName || modelName.toLowerCase(),
        connection: config.store || dbConfig.models.defaultStore,
        migrate: config.migrate || dbConfig.models.migrate,
        dynamicFinders: false,
        attributes: schema
      }
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

