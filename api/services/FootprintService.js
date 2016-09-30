'use strict'

const _ = require('lodash')
const Service = require('trails-service')

/**
 * Trails Service that maps abstract ORM methods to their respective Waterine
 * methods. This service can be thought of as an "adapter" between trails and
 * Waterline. All methods return native ES6 Promises.
 */
module.exports = class FootprintService extends Service {

  /**
   * Create a model, or models. Multiple models will be created if "values" is
   * an array.
   *
   * @param modelName The name of the model to create
   * @param values The model's values
   * @return Promise
   */
  create (modelName, values, options) {
    const Model = this.app.orm[modelName] || this.app.packs.waterline.orm.collections[modelName]

    return Model.create(values)
  }

  /**
   * Find all models that satisfy the given criteria. If a primary key is given,
   * the return value will be a single Object instead of an Array.
   *
   * @param modelName The name of the model
   * @param criteria The criteria that filter the model resultset
   * @return Promise
   */
  find (modelName, criteria, options) {
    const Model = this.app.orm[modelName] || this.app.packs.waterline.orm.collections[modelName]
    const modelOptions = _.defaultsDeep({ }, options,
        _.get(this.app.config, 'footprints.models.options'))
    let query

    if (!options) {
      options = { }
    }
    if (!_.isPlainObject(criteria) || options.findOne === true) {
      query = Model.findOne(criteria)
    }
    else {
      if (modelOptions.defaultLimit && options.limit === undefined) {
        query = Model.find(_.defaults(criteria, {
          limit: modelOptions.defaultLimit
        }))
      }
      else {
        query = Model.find(criteria, options)
      }
    }

    if (_.isString(modelOptions.populate)) {
      query = query.populate(modelOptions.populate)
    }
    else {
      _.each(modelOptions.populate, association => {
        if (_.isString(association)) {
          query = query.populate(association)
        }
        else {
          query = query.populate(association.attribute, association.criteria || { })
        }
      })
    }

    return query
  }

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
    const Model = this.app.orm[modelName] || this.app.packs.waterline.orm.collections[modelName]
    let query

    if (!options) {
      options = { }
    }
    if (_.isPlainObject(criteria)) {
      if (options.limit !== undefined) {
        query = Model.update(_.defaults(criteria, {
          limit: options.limit
        }), values)
      }
      else {
        query = Model.update(criteria, values)
      }
    }
    else {
      query = Model.update(criteria, values).then(results => results[0])
    }

    return query
  }

  /*
   * Destroy (delete) the model, or models, that match the given criteria.
   *
   * @param modelName The name of the model
   * @param criteria The criteria that determine which models are to be updated
   * @return Promise
   */
  destroy (modelName, criteria, options) {
    const Model = this.app.orm[modelName] || this.app.packs.waterline.orm.collections[modelName]
    let query

    if (_.isPlainObject(criteria)) {
      query = Model.destroy(criteria)
    }
    else {
      query = Model.destroy(criteria).then(results => results[0])
    }

    return query
  }

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
    const parentModel = this.app.orm[parentModelName] ||
        this.app.packs.waterline.orm.collections[parentModelName]
    const childAttribute = parentModel.attributes[childAttributeName]
    const childModelName = childAttribute.model || childAttribute.collection
    const mergedValues = _.extend({ [childAttribute.via]: parentId }, values)

    return this.create(childModelName, mergedValues, options)
  }

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
    const parentModel = this.app.orm[parentModelName] ||
        this.app.packs.waterline.orm.collections[parentModelName]
    const childAttribute = parentModel.attributes[childAttributeName]
    const childModelName = childAttribute.model || childAttribute.collection
    const childModel = this.app.orm[childModelName] ||
        this.app.packs.waterline.orm.collections[childModelName]

    if (!_.isPlainObject(criteria)) {
      criteria = {
        [childModel.primaryKey]: criteria
      }
      options = _.defaults({ findOne: true }, options)
    }

    // query within the "many" side of the association
    if (childAttribute.via) {
      const mergedCriteria = _.extend({ [childAttribute.via]: parentId }, criteria)
      return this.find(childModelName, mergedCriteria, options)
    }

    // query the "one" side of the association
    const mergedOptions = _.extend({
      populate: [{
        attribute: childAttributeName,
        criteria: criteria
      }]
    }, options)
    return this.find(parentModelName, parentId, mergedOptions)
      .then(parentRecord => parentRecord[childAttributeName])
  }

  /**
   * Update models by criteria, and which is associated with the given
   * Parent Model.
   *
   * @param parentModelName The name of the model's parent
   * @param parentId The id (required) of the parent model
   * @param childAttributeName The name of the model to create
   * @param criteria The search criteria
   * @return Promise
   */
  updateAssociation (parentModelName, parentId, childAttributeName, criteria, values, options) {
    const parentModel = this.app.orm[parentModelName] ||
        this.app.packs.waterline.orm.collections[parentModelName]
    const childAttribute = parentModel.attributes[childAttributeName]
    const childModelName = childAttribute.model || childAttribute.collection
    const childModel = this.app.orm[childModelName] ||
        this.app.packs.waterline.orm.collections[childModelName]

    if (!_.isPlainObject(criteria)) {
      criteria = {
        [childModel.primaryKey]: criteria
      }
      options = _.defaults({ findOne: true }, options)
    }

    if (childAttribute.via) {
      const mergedCriteria = _.extend({ [childAttribute.via]: parentId }, criteria)
      return this.update(childModelName, mergedCriteria, values, options)
    }

    const childValues = { [childAttributeName]: values }
    return this.update(parentModelName, parentId, childValues, options)
      .then(parentRecord => {
        const childId = parentRecord[childAttributeName]
        return this.find(childModelName, childId)
      })
  }

  /**
   * Destroy models by criteria, and which is associated with the
   * given Parent Model.
   *
   * @param parentModelName The name of the model's parent
   * @param parentId The id (required) of the parent model
   * @param childAttributeName The name of the model to create
   * @param criteria The search criteria
   * @return Promise
   */
  destroyAssociation (parentModelName, parentId, childAttributeName, criteria, options) {
    const parentModel = this.app.orm[parentModelName] ||
        this.app.packs.waterline.orm.collections[parentModelName]
    const childAttribute = parentModel.attributes[childAttributeName]
    const childModelName = childAttribute.model || childAttribute.collection
    const childModel = this.app.orm[childModelName] ||
        this.app.packs.waterline.orm.collections[childModelName]

    if (!_.isPlainObject(criteria)) {
      criteria = {
        [childModel.primaryKey]: criteria
      }
    }

    // query within the "many" side of the association
    if (childAttribute.via) {
      const mergedCriteria = _.extend({ [childAttribute.via]: parentId }, criteria)
      return this.destroy(childModelName, mergedCriteria, options)
        .then(records => {
          return _.map(records, record => {
            return {
              [childModel.primaryKey]: record[childModel.primaryKey]
            }
          })
        })
    }

    // query the "one" side of the association
    return this
      .findAssociation(parentModelName, parentId, childAttributeName, criteria, options)
      .then(record => {
        return this.destroy(childModelName, record[childModel.primaryKey])
      })
      .then(destroyedRecord => {
        return {
          [childModel.primaryKey]: destroyedRecord[childModel.primaryKey]
        }
      })
  }
}
