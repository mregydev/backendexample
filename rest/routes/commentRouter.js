
const models = require('../../DAL/models');
const express = require('express');
const router = express.Router();

const commentService = require('../services/commentsService')


const logger=require('../core/logger')


router.post('/', async (req, res) => {

  //extract comment instance
  let instance = req.body

  try {
    //Add comment to database
    let result = await commentService.AddComment(instance)

    if (result) {
      res.send({ Result: true,Id:result })
    }
  }
  catch (ex) {
    logger.log(ex)
    res.status(ex.Code).send({ Result: false, ErrMsg: ex.ErrMsg })
  }

});

router.delete('/:commentId', async function (req, res) {
  try {

    //Remove comment
    let result = await commentService.RemoveComment(req.params.commentId)

    if (result) {
      res.send({ Result: true })
    }
  }
  catch (ex) {
    logger.log(ex)
    res.status(ex.Code).send({ Result: false, ErrMsg: ex.ErrMsg })
  }
});




router.get('/:bulletin_Id', async function (req, res) {
  try {

    let result = await commentService.FetchAllComments(req.params.bulletin_Id)

    res.send({ Result: result })
  }
  catch (ex) {
    logger.log(ex)
    res.status(ex.Code).send({ Result: false, ErrMsg: ex.ErrMsg })
  }
})

module.exports = router;
