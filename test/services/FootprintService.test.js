const Pack = require('..')
const api = require('../../api')
const FootprintService = api.services.FootprintService

describe('api.services.FootprintService', () => {
  let pack
  before(() => {
    pack = new Pack(require('./testapp'))
    pack.configure()
    return pack.initialize()
  })

  describe('#create', () => {
    it('should insert a record', () => {
      const Role = pack.orm.collections.role
    })
  })
  describe('#find', () => {
    it('should find a single record', () => {

    })
    it('should find a set of records', () => {

    })
  })
  describe('#update', () => {
    it('should update a single record', () => {

    })
    it('should update a set of records', () => {

    })
  })
  describe('#destroy', () => {
    it('should delete a single record', () => {

    })
    it('should delete a set of records', () => {

    })
  })
  describe('#createAssociation', () => {
    it('should insert an associated record', () => {

    })
  })
  describe('#findAssociation', () => {
    it('should find an associated record', () => {

    })
  })
  describe('#updateAssociation', () => {
    it('should update an associated record', () => {

    })
  })
  describe('#destroyAssociation', () => {
    it('should delete an associated record', () => {

    })
  })

})
