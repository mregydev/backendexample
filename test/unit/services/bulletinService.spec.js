const Messages =require('../../../rest/core/Messages')

const bulletinService = require('../../../rest/services/bulletinService')

const bulletinModel = require('../../../DAL/models').bulletin;

const sinon = require('sinon')

const expect = require('assert')

describe('bulletin service test cases', () => {

    describe('AddInstance test cases', (done) => {

        let instance = { title: 'test title', content: 'test content', logourl: 'drjeljrlexd.png' }

        let createStub = sinon.stub(bulletinModel, 'create').returns({ id: 2 })

        it('should call create method of bulletinmodel', (done) => {
            {
                bulletinService.AddInstance(instance)
                expect.equal(createStub.calledOnce, true)
                done()
            }
        })
    })

    describe('FindOne test cases', (done) => {

        let findStub = sinon.stub(bulletinModel, 'find')

        it('should call find method of bulletinmodel', (done) => {
            {
                bulletinService.FindOne(2)
                expect.equal(findStub.calledOnce, true)
                done()
            }
        })
    })


    describe('FetchAll test cases', (done) => {

       
        it('should call findAll method of bulletinmodel', (done) => {
            {
                let findAllStub = sinon.stub(bulletinModel, 'findAll')

                bulletinService.FetchAll()
                expect.equal(findAllStub.calledOnce, true)
                done()
            }
        })
    })

    describe('IsValid test cases', (done) => {
        
        it('should return false in case title not found', (done) => {
            {
                let res=bulletinService.IsValid({content:'test content'})

                expect.equal(res.value, false)

                expect.equal(res.ErrMsg, Messages.TitleNotValid)
                
                done()
            }
        })

        it('should return false in case content not found', (done) => {
            {
                let res=bulletinService.IsValid({title:'test content'})

                expect.equal(res.value, false)

                expect.equal(res.ErrMsg, Messages.ContentNotFound)
                
                done()
            }
        })


        it('should return false in logourl content not found', (done) => {
            {
                let res=bulletinService.IsValid({content:'content', title:'test content'})

                expect.equal(res.value, false)

                expect.equal(res.ErrMsg, Messages.LogoNotFound)
                
                done()
            }
        })


        it('should return true in notmal case', (done) => {
            {
                let res=bulletinService.IsValid({content:'content', title:'test content',logourl:"logourl"})

                expect.equal(res.value, true)

                done()
            }
        })
    })

    describe('RemoveInstance test cases', (done) => {

        let destroyStub = sinon.stub(bulletinModel, 'destroy')

        it('should call find method of bulletinmodel', (done) => {
            {
                bulletinService.RemoveInstance(2)
                expect.equal(destroyStub.calledOnce, true)
                done()
            }
        })
    })
})