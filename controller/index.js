const asyncHandler = require("../middleware/async");
const users = require("../model/users");
const ErrorResponse = require("../utils/errorResponse");


exports.getIndex = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    status: "System Is online",
  });
});

// @desc      Create New Request
// @route     POST /api/v1/register
// @access    Public
exports.postRegister = asyncHandler(async (req, res, next) => {
  const user = await users.create(req.body)
  res.status(201).json({
    success: true,
    status: "success",
    data:user
  });
});