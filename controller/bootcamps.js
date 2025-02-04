//  @desc   Get all bootcamps
//  @route  Get /api/v1/bootcamps

const Bootcamps = require("../models/Bootcamps");
const ErrorResponse = require("../utils/errorResponse");

//  @access Public
exports.getBootcamps = async (req, res, next) => {
  try {
    let apiResponse = Bootcamps.find(req.query);

    if (req.query.name) {
      req.query.name = { $regex: req.query.name, $options: "i" };
      apiResponse = apiResponse.sort(req.query.sort);
    }

    const getBootcamps = await apiResponse;
    console.log("query params:", req.query);
    res.status(200).json({
      code: 200,
      count: getBootcamps.length,
      message: "Bootcamps data retrive Successfully",
      data: getBootcamps,
    });
  } catch (err) {
    next(err);
  }
};

//  @desc   Get single bootcamps
//  @route  Get /api/v1/bootcamps/:id
//  @access Public
exports.getSingleBootcamps = async (req, res, next) => {
  try {
    const singleBootcamp = await Bootcamps.findById(req.params.id);

    if (!singleBootcamp) {
      return next(
        new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
      );
    }

    res.status(200).json({
      code: 200,
      message: "Get Single bootcamp",
      data: singleBootcamp,
    });
  } catch (err) {
    // next(
    //   new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    // );
    next(err);
  }
};

//  @desc   Create bootcamps
//  @route  post /api/v1/bootcamps
//  @access Private
exports.createBootcamps = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamps.create(req.body);
    res.status(201).json({
      code: 201,
      success: true,
      message: "Create bootcamp",
      data: bootcamp,
    });
  } catch (err) {
    // res
    //   .status(400)
    //   .json({ success: false, message: "Bootcamp name never been dublicate!" });
    next(err);
  }
};
//  @desc   update bootcamps
//  @route  put /api/v1/bootcamps/:id
//  @access Private
exports.updateBootcamps = async (req, res, next) => {
  try {
    const updateBootcamp = await Bootcamps.findByIdAndUpdate(
      req.params.id, //who's id
      req.body, // what thing to send
      {
        new: true,
        runValidatorsr: true, // options
      }
    );

    if (!updateBootcamp) {
      return res.status(400).json({
        sucess: false,
        message: "Requested id is not match",
      });
    }
    res
      .status(200)
      .json({ code: 200, message: "Update bootcamp", data: updateBootcamp });
  } catch (err) {
    // return res.status(400).json({
    //   sucess: false,
    //   message: "Requested id is not match",
    // });
    next(err);
  }
};
//  @desc   delete bootcamps
//  @route  delete /api/v1/bootcamps/:id
//  @access Private
exports.deleteBootcamps = async (req, res, next) => {
  try {
    const deleteBootcamp = await Bootcamps.findByIdAndDelete(req.params.id);
    if (!deleteBootcamp) {
      return res.status(400).json({
        success: false,
        message: "Requested id is not match!",
      });
    }
    res.status(200).json({ code: 200, message: "Delete bootcamp" });
  } catch (err) {
    // return res.status(400).json({
    //   success: false,
    //   message: "Requested id is not match!",
    // });
    next(err);
  }
};
