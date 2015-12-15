const joi = require('joi')
const lib = require('.')

module.exports = {
  validateDatabaseConfig (config) {
    return new Promise((resolve, reject) => {
      joi.validate(config, lib.Schemas.databaseConfig, (err, value) => {
        if (err) return reject(err)

        return resolve(value)
      })
    })
  }
}

