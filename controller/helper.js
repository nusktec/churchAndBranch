const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");


exports.getIndex = asyncHandler(async (req, res, next) => {
    res.status(200).json({
      success: true,
      status: "Hello From Security",
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