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
    let Model = this.api.models[modelName]
    return Model.create(values)
  },
  
  /**
   * Create a model, with provided id
   *
   * @param modelName The name of the model to create
   * @param values The model's values
   * @param id to assign to the model
   * @return Promise
   */
  createWithId (modelName, values, id) {
    let Model = this.api.models[modelName]

  },

  /**
   * Find all models that satisfy the given criteria
   *
   * @param modelName The name of the model
   * @param criteria The criteria that filter the model resultset
   * @return Promise
   */
  find (modelName, criteria) {
    let Model = this.api.models[modelName]

  },

  /**
   * Find a particular (single) model by id
   *
   * @param modelName The name of the model
   * @param id The id of the model to return
   * @return Promise
   */
  findOne (modelName, id) {
    let Model = this.api.models[modelName]

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
  update (modelName, criteria, values, id) {
    let Model = this.api.models[modelName]

  },

  /*
   * Destroy (delete) the model, or models, that match the given criteria.
   *
   * @param modelName The name of the model
   * @param criteria The criteria that determine which models are to be updated
   * @param [id] A optional model id; overrides "criteria" if both are specified.
   * @return Promise
   */
  destroy (modelName, criteria, id) {
    let Model = this.api.models[modelName]

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
    let ParentModel = this.api.models[parentModelName]
    let ChildModel = ParentModel.attributes[childAttributeName].
    return FootprintService.create(

  },

  /**
   * Create a model, assign it the given id, and associate it with its parent
   * model.
   *
   * @param parentModelName The name of the model's parent
   * @param childAttributeName The name of the model to create
   * @param parentId The id (required) of the parent model
   * @param childId The id (required) of the child model
   * @param values The model's values
   * @return Promise
   */
  createAssociationWithId (parentModelName, parentId, childAttributeName, childId, values) {
    let Model = this.api.models[childAttributeName]

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
    let Model = this.api.models[childAttributeName]

  },

  /**
   * Find a particular model by id, and which is associated with the given
   * Parent Model.
   *
   * @param parentModelName The name of the model's parent
   * @param parentId The id (required) of the parent model
   * @param childAttributeName The name of the model to create
   * @param childId The id of the model
   * @param criteria The search criteria
   * @return Promise
   */
  findOneAssociation (parentModelName, parentId, childAttributeName, childId) {
    let Model = this.api.models[childAttributeName]

  },

  /**
   * Find a particular model by id, and which is associated with the given
   * Parent Model.
   *
   * @param parentModelName The name of the model's parent
   * @param parentId The id (required) of the parent model
   * @param childAttributeName The name of the model to create
   * @param criteria The search criteria
   * @return Promise
   */
  updateAssociation (parentModelName, parentId, childAttributeName, criteria, values) {
    let Model = this.api.models[childAttributeName]

  },

  /**
   * Find a particular model by id, and which is associated with the given
   * Parent Model.
   *
   * @param parentModelName The name of the model's parent
   * @param parentId The id (required) of the parent model
   * @param childAttributeName The name of the model to create
   * @param criteria The search criteria
   * @return Promise
   */
  destroyAssociation (parentModelName, parentId, childAttributeName, childId) {
    let Model = this.api.models[childAttributeName]

  }
}
