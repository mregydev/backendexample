
const commentsService = require('../../../rest/services/commentsService')

const commentsModel = require('../../../DAL/models').comment;

const sinon = require('sinon')

const expect = require('assert')

const Messages = require('../../../rest/core/Messages')


describe('comments service test cases', () => {

    describe('AddComment test cases', (done) => {

        let instance = { content: 'test comment', user: 'mregydev', bulletinId: 3 }

        let createStub = sinon.stub(commentsModel, 'create').returns({ id: 2 })

        it('should call create method of commentsmodel', (done) => {
            {
                commentsService.AddComment(instance)
                expect.equal(createStub.calledOnce, true)
                done()
            }
        })
    })



    describe('RemoveComment test cases', (done) => {

        let destroyStub = sinon.stub(commentsModel, 'destroy').returns({ id: 2 })

        it('should call destroy method of commentsmodel', (done) => {
            {
                commentsService.RemoveComment(2)
                expect.equal(destroyStub.calledOnce, true)
                done()
            }
        })
    })


    describe('FetchAllComments test cases', (done) => {


        let findAllStub = sinon.stub(commentsModel, 'findAll').returns({ id: 2 })

        it('should call findAll method of commentsmodel', (done) => {
            {
                commentsService.FetchAllComments(2)
                expect.equal(findAllStub.calledOnce, true)
                done()
            }
        })
    })



    describe('IsValid test cases', (done) => {

        it('should return false in case title not found', (done) => {
            {
                let res = commentsService.IsValid({ content: 'test content' })

                expect.equal(res.value, false)

                expect.equal(res.ErrMsg, Messages.UserNotValid)

                done()
            }
        })

        it('should return false in case content not found', (done) => {
            {
                let res = commentsService.IsValid({ user: 'mregydev' })

                expect.equal(res.value, false)

                expect.equal(res.ErrMsg, Messages.ContentNotFound)

                done()
            }
        })




        it('should return true in notmal case', (done) => {
            {
                let res = commentsService.IsValid({ content: 'content', user: 'mregydev', bulletinId: 2 })

                expect.equal(res.value, true)

                done()
            }
        })
    })


})