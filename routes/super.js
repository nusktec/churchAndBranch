var express = require('express');
var router = express.Router();
const { protect } = require('../middleware/authgraud');


//Auth Graud
const auth = (req,res,next)=>{
    console.log("middleware");
    next()
}

const { 
    getIndex,
    createBranch, 
    getBranches, 
    deleteBranch,
    updateBranch,
    getRequest,
    getRequests,
    updateReqStatusReject,
    updateReqStatusApproved,
    getBranch
} = require('../controller/super');


/** */
router.get("/",  getIndex);

router.post("/add/branch", protect, createBranch);

router.get("/branches", protect, getBranches);

router.get("/branch/:id", protect, getBranch);

router.delete("/delete/branch/:id/", protect, deleteBranch);

router.put("/edit/branch/:id/", protect, updateBranch);

router.get("/requests", protect, getRequests);

router.get("/request/:id", protect, getRequest);

router.put("/request/approve/:id/", protect, updateReqStatusApproved);

router.put("/request/reject/:id/", protect, updateReqStatusReject);


module.exports = router;