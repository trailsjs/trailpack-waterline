const _ = require('lodash')

module.exports = {

  /**
   * Augment the model definition with some waterline-required properties
   */
  transformModels (app) {
    const models = app.models
    return _.mapValues(models, (model, modelName) => {
      const config = model.constructor.config(app) || { }
      const schema = model.constructor.schema(app) || { }

      return {
        identity: modelName.toLowerCase(),
        globalId: modelName,
        tableName: config.tableName || modelName.toLowerCase(),
        connection: config.store,
        migrate: config.migrate || app.config.get(`stores.${config.store}.migrate`),
        dynamicFinders: false,
        attributes: schema,
        beforeCreate: config.beforeCreate,
        afterCreate: config.afterCreate,
        beforeUpdate: config.beforeUpdate,
        afterUpdate: config.afterUpdate,
        beforeValidate: config.beforeValidate,
        afterValidate: config.afterValidate,
        beforeDestroy: config.beforeDestroy,
        afterDestroy: config.afterDestroy
      }

    })
  },

  /**
   * Transform the Trails.js "stores" config into a Waterline "adapters" object
   */
  transformAdapters (app) {
    const stores = app.config.stores
    const adapters = _.map(stores, 'adapter')
    return _.keyBy(adapters, 'identity')
  },

  /**
   * Transform the Trails.js "stores" config into a sails-like connections
   * object.
   */
  transformConnections (app) {
    const stores = app.config.stores
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

