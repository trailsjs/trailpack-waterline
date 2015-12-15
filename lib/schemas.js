const joi = require('joi')

module.exports = {
  databaseConfig: joi.object().keys({
    defaultStore: joi.string().required()
  }),

  model: joi.object().keys({
    autoPK: joi.boolean(),
    autoCreatedAt: joi.boolean(),
    autoUpdatedAt: joi.boolean(),
    attributes: joi.object()
  })
}

