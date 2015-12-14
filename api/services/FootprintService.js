const _ = require('lodash')

/**
 * Trails Service that maps abstract ORM methods to their respective Waterine
 * methods. All methods return native ES6 Promises.
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
  create (modelName, values) {
    const Model = this.api.models[modelName]

    return new Promise((resolve, reject) => {
      Model.create(values).then(resolve).catch(reject)
    })
  },
  
  /**
   * Find all models that satisfy the given criteria
   *
   * @param modelName The name of the model
   * @param criteria The criteria that filter the model resultset
   * @return Promise
   */
  find (modelName, criteria) {
    const Model = this.api.models[modelName]
    const modelOptions = this.config.footprints.models.options

    let query = Model.find(_.defaults(criteria, {
      limit: modelOptions.defaultLimit
    }))

    if (modelOptions.populate === true) {
      query = query.populateAll()
    }

    return new Promise((resolve, reject) => {
      query.then(resolve).catch(reject)
    })
  },

  /**
   * Find a particular (single) model by id
   *
   * @param modelName The name of the model
   * @param id The id of the model to return
   * @return Promise
   */
  findOne (modelName, id) {
    const Model = this.api.models[modelName]

    return FootprintService.find({ id: id })
  },

  /**
   * Update an existing model, or models, matched by the given by criteria, with
   * the given values.
   *
   * @param modelName The name of the model
   * @param criteria The criteria that determine which models are to be updated
   * @param [id] A optional model id; overrides "criteria" if both are specified.
   * @return Promise
   */
  update (modelName, criteria, values) {
    const Model = this.api.models[modelName]
    const modelOptions = this.config.footprints.models.options

    return new Promise((resolve, reject) => {
      Model.update(_.defaults(criteria, {
          limit: modelOptions.defaultLimit
        }))
        .then(resolve)
        .catch(reject)
    })
  },

  /*
   * Destroy (delete) the model, or models, that match the given criteria.
   *
   * @param modelName The name of the model
   * @param criteria The criteria that determine which models are to be updated
   * @return Promise
   */
  destroy (modelName, criteria) {
    const Model = this.api.models[modelName]
    const modelOptions = this.config.footprints.models.options

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
  createAssociation (parentModelName, parentId, childAttributeName, values) {
    const childAttribute = this.api.models[parentModelName].attributes[childAttributeName]
    const childModelName = childAttribute.model || childAttribute.collection
    const mergedValues = _.extend({ [childAttribute.via]: parentId }, values)

    return FootprintService.create(childModelName, mergedValues)
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
  findAssociation (parentModelName, parentId, childAttributeName, criteria) {
    const childAttribute = this.api.models[parentModelName].attributes[childAttributeName]
    const childModelName = childAttribute.model || childAttribute.collection
    const mergedCriteria = _.extend({ [childAttribute.via]: parentId }, criteria)

    return FootprintService.find(childModelName, mergedCriteria)
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
  updateAssociation (parentModelName, parentId, childAttributeName, criteria, values) {
    const childAttribute = this.api.models[parentModelName].attributes[childAttributeName]
    const childModelName = childAttribute.model || childAttribute.collection
    const mergedCriteria = _.extend({ [childAttribute.via]: parentId }, criteria)

    return FootprintService.update(childModelName, mergedCriteria, values)
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
  destroyAssociation (parentModelName, parentId, childAttributeName, childId) {
    const childAttribute = this.api.models[parentModelName].attributes[childAttributeName]
    const childModelName = childAttribute.model || childAttribute.collection
    const mergedCriteria = _.extend({ [childAttribute.via]: parentId }, criteria)

    return FootprintService.find(childModelName, mergedCriteria)
  }
}

