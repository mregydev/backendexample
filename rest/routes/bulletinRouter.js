
const models = require('../../DAL/models');
const express = require('express');
const router = express.Router();

const logger=require('../core/logger')

const bulletinService = require('../services/bulletinService')

const bulletinExtractor = require('../core/bulletinExtractor')

router.post('/', async (req, res) => {

  //extract bulletin instance
  let instance = await (bulletinExtractor.getInstance(req))

  try {

    //Add our bulletin instance to database
    let result = await bulletinService.AddInstance(instance)

    if (result) {
      res.send({ Result:true,Id:result })
    }
  }
  catch (ex) {
    logger.log(ex)
    res.status(ex.Code).send({ Result: false, ErrMsg: ex.ErrMsg })
  }

});

router.delete('/:bulletInId', async function (req, res) {

  try {

    //Remove bulletin
    let result = await bulletinService.RemoveInstance(req.params.bulletInId)

    if (result) {
      res.send({ Result: true })
    }
  }
  catch (ex) {
    logger.log(ex)
    res.status(ex.Code).send({ Result: false, ErrMsg: ex.ErrMsg })
  }
});



router.get('/:id', async function (req, res) {
  try {
    let result = await bulletinService.FindOne(req.params.id)

    res.send({ Result: result })
  }
  catch (ex) {
    logger.log(ex)
    res.status(ex.Code).send({ Result: false, ErrMsg: ex.ErrMsg })
  }
})



router.get('/', async function (req, res) {
  try {
    let result = await bulletinService.FetchAll()


    res.send({ Result: result })
  }
  catch (ex) {
    logger.log(ex)
    res.status(ex.Code).send({ Result: false, ErrMsg: ex.ErrMsg })
  }
})

module.exports = router;
