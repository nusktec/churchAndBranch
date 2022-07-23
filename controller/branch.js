const asyncHandler = require("../middleware/async");
const document = require("../model/document");
const record = require("../model/record");
const ErrorResponse = require("../utils/errorResponse");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const users = require("../model/users");
const { v4: uuidv4 } = require('uuid');
const helper = require("../model/helper");


exports.getIndex = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    status: "success",
    data:"Branch Route Works"
  });
});

// @desc      Get User Detail
// @route     GET /api/v1/branch/whoisme
// @access    Private
exports.getWhoIs = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    status: "success",
    data:req.user
  });
});



// @desc      Get all Documents For a Branch
// @route     GET /api/v1/branch/documents
// @access    Private
exports.getDocuments = asyncHandler(async (req, res, next) => {
  const documents = await document.find({branch:req.user.branch});

  res.status(200).json({
    success: true,
    status: "success",
    data: documents,
  });
});

// @desc      Get all Pending Documents For a Branch
// @route     GET /api/v1/branch/documents/pending/
// @access    Private
exports.getPendingDoc = asyncHandler(async (req, res, next) => {
  const documents = await document.find({approved:false,branch:req.user.branch});

  res.status(200).json({
    success: true,
    status: "success",
    data: documents,
  });
});

// @desc      Get One Document And Its Records
// @route     GET /api/v1/branch/documents
// @access    Private
// @TODO      Fix Speard Might Break
exports.getDocument = asyncHandler(async (req, res, next) => {
  const doc = await document.findOne({_id:req.params.doc});
  const records = await record.find({document:req.params.doc});

  res.status(200).json({
    success: true,
    status: "success",
    data: {...doc._doc,records},
  });
});


// @desc      Create New Document
// @route     POST /api/v1/branch/document/create
// @access    Private
exports.createDocument = asyncHandler(async (req,res,next)=>{
  const data = {
    name: req.body.name,
    branch:req.user.branch,
    creator:req.user._id,
  }
  const doc = await document.create(data)
  res.status(201).json({
    success: true,
    status: "success",
    data: doc,
  });
})

// @desc      Add Record into A Document
// @route     POST /api/v1/branch/document/add/:id{document ID}
// @access    Private
exports.addARecord = asyncHandler(async (req, res, next) => {
  const data = {
    name: req.body.name,
    document:req.params.doc,
    detail:req.body.detail,
  }
  const rec = await record.create(data)
  res.status(201).json({
    success: true,
    status: "success",
    data: rec,
  });
});

// @desc      Delete Document And All Records
// @route     DELETE /api/v1/branch/document/delete/:doc{Document ID}
// @access    Private
exports.deleteDocument = asyncHandler(async (req, res, next) => {
  await document.findByIdAndDelete(req.params.doc);
  await record.deleteMany({document:req.params.doc})

  res.status(200).json({
    success: true,
    status: "success",
    data: {},
  });
});

// @desc      Delete a Record
// @route     DELETE /api/v1/branch/document/remove/:rec{Record ID}
// @access    Private
exports.deleteRecord = asyncHandler(async (req, res, next) => {
  await record.findByIdAndDelete(req.params.rec);

  res.status(200).json({
    success: true,
    status: "success",
    data: {},
  });
});

// @desc      Approve a Document
// @route     PUT /api/v1/branch/document/approved/:doc{Document ID}
// @access    Public
exports.approvedDoc = asyncHandler(async (req, res, next) => {
  const doc = await document.findByIdAndUpdate(req.params.doc, {approved:true}, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    status: "success",
    data: doc,
  });
});

// work On email Later
exports.login = (req,res,next) =>{
  try {

    users.findOne({email:req.body.email.toLowerCase()}).then(user=>{
      if(!user){
        return next(new ErrorResponse("There is no user with that email", 404));
      }else{
        if(user.password == req.body.password){
          const token = jwt.sign({
              id:user._id
            }, process.env.SECERT_KEY,{
              expiresIn:86400, //24 Hours 
          })

          res.status(200).json({
            success: true,
            status: "success",
            data: user,
            access_token: token
          });

        }else{
          return next(new ErrorResponse("Invalid User Password", 401));
        }
      }
    }).catch(err =>{
      new ErrorResponse("There is no user with that email", 500)
    })
  } catch (error) {
    return next(new ErrorResponse("Unexpected Error", 500));
  }
}

// @desc      Creating A Helper
// @route     Get /api/v1/branch/access/create/
// @access    Public
exports.createHelper = asyncHandler(async (req,res,next)=>{
  const data = {
    token: uuidv4(),
    branch:req.user.branch,
    createdBy:req.user._id,
  }
  const helpers = await helper.create(data)
  res.status(201).json({
    success: true,
    status: "success",
    data: helpers,
  });
})


// @desc      Get all Helpers in A Branch
// @route     GET /api/v1/branch//access/manage/
// @access    Private
exports.getHelpers = asyncHandler(async (req, res, next) => {
  const helpers = await helper.find({branch:req.user.branch});

  res.status(200).json({
    success: true,
    status: "success",
    data: helpers,
  });
});

// @desc      Delete a Helper
// @route     DELETE /api/v1/branch/access/revoke/:helper
// @access    Private
exports.deleteHelper = asyncHandler(async (req, res, next) => {
  await helper.findByIdAndDelete(req.params.rec);

  res.status(200).json({
    success: true,
    status: "success",
    data: {},
  });
});