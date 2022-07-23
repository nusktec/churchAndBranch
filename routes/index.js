var express = require('express');
var router = express.Router();

const { 
    getIndex,
    postRegister 
} = require('../controller/index');


/** To Ping System */
router.get("/",  getIndex);
// To Register Pastor
router.post("/register",  postRegister);

module.exports = router;