module.exports = {
  provides: {
    services: [
      'FootprintService'
    ]
  },

  lifecycle: {
    configure: {
      listen: [ 'trailpack:router:configured' ]
    },
    initialize: {
      listen: [ 'trailpack:router:initialized' ]
    }
  }
}
