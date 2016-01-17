const joi = require('joi')

module.exports = {
  databaseConfig: joi.object().keys({
    orm: joi.string(),
    models: joi.object().keys({
      defaultStore: joi.string().required(),
      migrate: joi.string()
    }),
    stores: joi.object()
  }),

  models: joi.object().keys({
    autoPK: joi.boolean(),
    autoCreatedAt: joi.boolean(),
    autoUpdatedAt: joi.boolean(),
    attributes: joi.object()
  })
}

