'use strict'

const testApp = require('./testapp')
const TrailsApp = require('trails')

before(() => {
  global.app = new TrailsApp(testApp)
  return global.app.start().catch(global.app.stop)
})

after(() => {
  return global.app.stop()
})
