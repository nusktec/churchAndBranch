var express = require('express');
var router = express.Router();

const { 
    getIndex 
} = require('../controller/helper');


/** */
router.get("/",  getIndex);
router.get("/login",  getIndex);
router.get("/documents",  getIndex);
router.get("/documents/:id",  getIndex);
router.get("/add/record",  getIndex);
router.get("/edit/record",  getIndex);

module.exports = router;