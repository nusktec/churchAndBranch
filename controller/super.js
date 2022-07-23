const asyncHandler = require("../middleware/async");
const branch = require("../model/branch");
const users = require("../model/users");
const ErrorResponse = require("../utils/errorResponse");



exports.getIndex = asyncHandler(async (req, res, next) => {
    res.status(200).json({
      success: true,
      status: "Hello From Super Admin",
    });
  });


// @desc      Create Branch
// @route     POST /api/v1/super/add/branch/
// @access    Private
exports.createBranch = asyncHandler(async (req,res,next)=>{
  const newBranch = await branch.create(req.body)
  res.status(201).json({
    success: true,
    status: "success",
    data: newBranch,
  });
})

// @desc      Get all Branch
// @route     GET /api/v1/super/branches
// @access    Private
exports.getBranches = asyncHandler(async (req, res, next) => {
  const branches = await branch.find({});

  res.status(200).json({
    success: true,
    status: "success",
    data: branches,
  });
});

// @desc      Get One Branch
// @route     GET /api/v1/super/branch/:id
// @access    Private
exports.getBranch = asyncHandler(async (req, res, next) => {
  const br = await branch.findOne({_id:req.params.id});

  res.status(200).json({
    success: true,
    status: "success",
    data: br,
  });
});

// @desc      Delete Branch
// @route     DELETE /api/v1/super/delete/branch/:id/
// @access    Private
exports.deleteBranch = asyncHandler(async (req, res, next) => {
  await branch.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    status: "success",
    data: {},
  });
});

// @desc      Update Branch
// @route     PUT /api/v1/super/edit/branch/:id/
// @access    Public
exports.updateBranch = asyncHandler(async (req, res, next) => {
  const branches = await branch.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    status: "success",
    data: branches,
  });
});

// @desc      Get all Requests Pending
// @route     GET /api/v1/super/requests
// @access    Private
exports.getRequests = asyncHandler(async (req, res, next) => {
  const requests = await users.find({approved:false});

  res.status(200).json({
    success: true,
    status: "success",
    data: requests,
  });
});

// @desc      Get one Request
// @route     GET /api/v1/super/request/:id
// @access    Private
exports.getRequest = asyncHandler(async (req, res, next) => {
  const request = await users.find({_id:req.params.id});

  res.status(200).json({
    success: true,
    status: "success",
    data: request,
  });
});

// @desc      Update request State to Approved
// @route     PUT /api/v1/super/request/approve/:id/
// @access    Public
exports.updateReqStatusApproved = asyncHandler(async (req, res, next) => {
  const user = await users.findByIdAndUpdate(req.params.id, {approved:true}, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    status: "success",
    data: user,
  });
});

// @desc      Update request state to Rejected
// @route     PUT /api/v1/super/request/rejected/:id/
// @access    Public
exports.updateReqStatusReject = asyncHandler(async (req, res, next) => {
  const user = await users.findByIdAndUpdate(req.params.id, {approved:false}, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    status: "success",
    data: user,
  });
});