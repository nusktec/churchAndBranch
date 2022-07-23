var express = require('express');
var router = express.Router();

const { 
    getIndex, getDocument 
} = require('../controller/helper');


/** */
router.get("/",  getIndex);
router.post("/login",  getIndex);
router.get("/documents",  getIndex);
router.get("/document/:id", getDocument);
router.post("/add/record",  getIndex);
router.put("/edit/record",  getIndex);

module.exports = router;