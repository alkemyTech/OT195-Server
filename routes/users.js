var express = require('express');
var router = express.Router();
const {User} = require('../models');
const {validateJWT} = require("../middlewares/validate-JWT");
const {adminValidate} = require("../middlewares/adminValidate");


/* GET users listing. */
router.get('/', validateJWT, adminValidate, async(req, res)=> {
  try {
    const dbUsers = await User.findAll()
    res.status(200).json({results:dbUsers, ok:true});
  } catch (error) {
    res.status(400).json({msg:error.message, ok:false});
  }
});

module.exports = router;
