'use strict';

const app = require('../../app');
const request = require('supertest');
const expect = require('assert');

describe('bulletins api test cases :', function () {

  let testBulletin = {
    title: 'test title',
    content: 'test content'
  }

  before(function () {
    return require('../../DAL/models').sequelize.sync();
  });


  it('create bulletin correcltly', function (done) {

    request(app).post(`/v1/bulletin`)
      .field('content', testBulletin.content)
      .field('title', testBulletin.title)
      .attach('logo', `${__dirname}/test.png`).end(

        (err, res) => {

          let result = JSON.parse(res.text)

          expect.equal(result.Result, true)
          expect.ok(result.Id)

          testBulletin.id = result.Id
          done()
        }
      )


  }).timeout(5000)


  it('get all bulletins correcltly', async function () {
    let res = await request(app).get(`/v1/bulletin`)
    expect.equal(res.body.Result.length, 1)
  })

  it('get bulletin correcltly', async function () {
    let res = await request(app).get(`/v1/bulletin/${testBulletin.id}`)
    expect.equal(res.body.Result.title, `'${testBulletin.title}'`)
  });


  it('delete bulletin correcltly', async function () {
    let res = await request(app).delete(`/v1/bulletin/${testBulletin.id}`)

    let models = require('../../DAL/models');

    let bulletins = await models.bulletin.findAll({})

    expect.equal(bulletins.length, 0)
  })

});


