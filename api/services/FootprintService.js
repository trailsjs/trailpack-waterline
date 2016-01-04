'use strict'

const _ = require('lodash')

/**
 * Trails Service that maps abstract ORM methods to their respective Waterine
 * methods. This service can be thought of as an "adapter" between trails and
 * Waterline. All methods return native ES6 Promises.
 */
const FootprintService = module.exports = {

  /**
   * Create a model, or models. Multiple models will be created if "values" is
   * an array.
   *
   * @param modelName The name of the model to create
   * @param values The model's values
   * @return Promise
   */
  create (modelName, values, options) {
    const Model = this.orm[modelName] || this.packs.waterline.orm.collections[modelName]

    return new Promise((resolve, reject) => {
      Model.create(values).then(resolve).catch(reject)
    })
  },

  /**
   * Find all models that satisfy the given criteria. If a primary key is given,
   * the return value will be a single Object instead of an Array.
   *
   * @param modelName The name of the model
   * @param criteria The criteria that filter the model resultset
   * @return Promise
   */
  find (modelName, criteria, options) {
    const Model = this.orm[modelName] || this.packs.waterline.orm.collections[modelName]
    const modelOptions = _.defaultsDeep({ }, _.get(this.config, 'footprints.models.options'), options)
    let query

    if (_.isPlainObject(criteria)) {
      if (modelOptions.defaultLimit) {
        query = Model.find(_.defaults(criteria, {
          limit: modelOptions.defaultLimit
        }))
      }
      else {
        query = Model.find(criteria)
      }
    }
    else {
      query = Model.findOne(criteria)
    }

    /*
    if (modelOptions.populate === true) {
      query = query.populateAll()
    }
    */

    _.each(modelOptions.populate, association => {
      query = query.populate(association.attribute, association.where || { })
    })

    return new Promise((resolve, reject) => {
      query.then(resolve).catch(reject)
    })
  },

  /**
   * Update an existing model, or models, matched by the given by criteria, with
   * the given values. If the criteria given is the primary key, then return
   * exactly the object that is updated; otherwise, return an array of objects.
   *
   * @param modelName The name of the model
   * @param criteria The criteria that determine which models are to be updated
   * @param [id] A optional model id; overrides "criteria" if both are specified.
   * @return Promise
   */
  update (modelName, criteria, values, options) {
    const Model = this.orm[modelName] || this.packs.waterline.orm.collections[modelName]
    const modelOptions = _.defaultsDeep({ }, _.get(this.config, 'footprints.models.options'), options)
    let query

    if (_.isPlainObject(criteria)) {
      if (modelOptions.defaultLimit) {
        query = Model.update(_.defaults(criteria, {
          limit: modelOptions.defaultLimit
        }), values)
      }
      else {
        query = Model.update(criteria, values)
      }
    }
    else {
      query = Model.update(criteria, values)
        .then(results => results[0])
    }

    return new Promise((resolve, reject) => {
      query.then(resolve).catch(reject)
    })
  },

  /*
   * Destroy (delete) the model, or models, that match the given criteria.
   *
   * @param modelName The name of the model
   * @param criteria The criteria that determine which models are to be updated
   * @return Promise
   */
  destroy (modelName, criteria, options) {
    const Model = this.orm[modelName] || this.packs.waterline.orm.collections[modelName]

    return new Promise((resolve, reject) => {
      Model.destroy(criteria)
        .then(resolve)
        .catch(reject)
    })
  },

  /**
   * Create a model, and associate it with its parent model.
   *
   * @param parentModelName The name of the model's parent
   * @param childAttributeName The name of the model to create
   * @param parentId The id (required) of the parent model
   * @param values The model's values
   * @return Promise
   */
  createAssociation (parentModelName, parentId, childAttributeName, values, options) {
    const childAttribute = this.orm[parentModelName].attributes[childAttributeName]
    const childModelName = childAttribute.model || childAttribute.collection
    const mergedValues = _.extend({ [childAttribute.via]: parentId }, values)

    return FootprintService.create(childModelName, mergedValues, options)
  },

  /**
   * Find all models that satisfy the given criteria, and which is associated
   * with the given Parent Model.
   *
   * @param parentModelName The name of the model's parent
   * @param childAttributeName The name of the model to create
   * @param parentId The id (required) of the parent model
   * @param criteria The search criteria
   * @return Promise
   */
  findAssociation (parentModelName, parentId, childAttributeName, criteria, options) {
    const childAttribute = this.orm[parentModelName].attributes[childAttributeName]
    const childModelName = childAttribute.model || childAttribute.collection
    const mergedCriteria = _.extend({ [childAttribute.via]: parentId }, criteria)

    return FootprintService.find(childModelName, mergedCriteria, options)
  },

  /**
   * Update a particular model by id, and which is associated with the given
   * Parent Model.
   *
   * @param parentModelName The name of the model's parent
   * @param parentId The id (required) of the parent model
   * @param childAttributeName The name of the model to create
   * @param criteria The search criteria
   * @return Promise
   */
  updateAssociation (parentModelName, parentId, childAttributeName, criteria, values, options) {
    const childAttribute = this.orm[parentModelName].attributes[childAttributeName]
    const childModelName = childAttribute.model || childAttribute.collection
    const mergedCriteria = _.extend({ [childAttribute.via]: parentId }, criteria)

    return FootprintService.update(childModelName, mergedCriteria, values, options)
  },

  /**
   * Destroy a particular model by id, and which is associated with the given
   * Parent Model.
   *
   * @param parentModelName The name of the model's parent
   * @param parentId The id (required) of the parent model
   * @param childAttributeName The name of the model to create
   * @param criteria The search criteria
   * @return Promise
   */
  destroyAssociation (parentModelName, parentId, childAttributeName, childId, options) {
    const childAttribute = this.orm[parentModelName].attributes[childAttributeName]
    const childModelName = childAttribute.model || childAttribute.collection

    return FootprintService.destroy(childModelName, childId, options)
  }
}

