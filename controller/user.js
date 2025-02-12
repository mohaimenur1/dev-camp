//  @desc   Create users
//  @route  post /api/v1/auth/user

const userModel = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

//  @access Private
exports.registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const user = await userModel.create({
      name,
      email,
      password,
      role,
    });

    sendTokenResponse(user, 200, res);
  } catch (err) {
    next(err);
  }
};

//  @desc   Login user
//  @route  post /api/v1/auth/login
//  @access Private
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return next(
        new ErrorResponse("Please Provider an email and password", 400)
      );
    }

    // check for user
    const user = await userModel.findOne({ email }).select("+password");

    // not user
    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    // check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    sendTokenResponse(user, 200, res);
  } catch (err) {
    next(err);
  }
};

// get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
  });
};

//  @desc   Get current logged in user
//  @route  post /api/v1/auth/me
//  @access Private
exports.getMe = async (req, res, next) => {
  const user = await userModel.findById(req.user.id);

  res.status(200).json({
    code: 200,
    success: true,
    data: user,
  });
};
