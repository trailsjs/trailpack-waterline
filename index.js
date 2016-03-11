'use strict'

const _ = require('lodash')
const DatastoreTrailpack = require('trailpack-datastore')
const Waterline = require('waterline')
const lib = require('./lib')

/**
 * Waterline Trailpack
 *
 * Allow the trails application to interface with the Waterline ORM. Similar to
 * the Sails "orm" hook, but cleaner and less crazy.
 *
 * @see {@link https://github.com/balderdashy/sails/blob/master/lib/hooks/orm/build-orm.js}
 */
module.exports = class WaterlineTrailpack extends DatastoreTrailpack {

  /**
   * Validate the database config, and api.model definitions
   */
  validate () {
    return Promise.all([
      lib.Validator.validateDatabaseConfig(this.app.config.database)
      //lib.Validator.validateModels(this.app.api.models)
    ])
  }

  /**
   * Merge configuration into models, load Waterline collections.
   */
  configure () {
    this.app.config.database.orm = 'waterline'

    _.merge(this.app.config, lib.FailsafeConfig)

    this.wl = new Waterline()
  }

  /**
   * Initialize Waterline. This will compile the schema and connect to the
   * database.
   */
  initialize () {
    this.models = lib.Transformer.transformModels(this.app)
    this.adapters = lib.Transformer.transformAdapters(this.app)
    this.connections = lib.Transformer.transformConnections(this.app)

    _.map(this.models, model => {
      this.wl.loadCollection(Waterline.Collection.extend(model))
    })

    const wlConfig = { adapters: this.adapters, connections: this.connections }
    return new Promise((resolve, reject) => {
      this.wl.initialize(wlConfig, (err, orm) => {
        if (err) return reject(err)

        this.orm = orm
        this.app.orm = lib.Transformer.transformWaterlineOrm(this.orm)
        resolve()
      })
    })
  }

  unload () {
    return new Promise((resolve, reject) => {
      this.wl.teardown(resolve)
    })
  }

  constructor (app) {
    super(app, {
      config: require('./config'),
      pkg: require('./package'),
      api: require('./api')
    })
  }
}

