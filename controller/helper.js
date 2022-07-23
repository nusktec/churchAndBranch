const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");


exports.getIndex = asyncHandler(async (req, res, next) => {
    res.status(200).json({
      success: true,
      status: "Hello From Security",
    });
  });