//  @desc   Get all bootcamps
//  @route  Get /api/v1/bootcamps

const Bootcamps = require("../models/Bootcamps");

//  @access Public
exports.getBootcamps = async (req, res, next) => {
  try {
    const getBootcamps = await Bootcamps.find();
    res.status(200).json({
      code: 200,
      count: getBootcamps.length,
      message: "Bootcamps data retrive Successfully",
      data: getBootcamps,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: "An error occurred while fetching data. Please try again later.",
    });
  }
};

//  @desc   Get single bootcamps
//  @route  Get /api/v1/bootcamps/:id
//  @access Public
exports.getSingleBootcamps = async (req, res, next) => {
  try {
    const singleBootcamp = await Bootcamps.findById(req.params.id);
    res.status(200).json({ code: 200, message: "Get Single bootcamp" });

    if (!singleBootcamp) {
      return res.status(404).json({
        success: false,
        message: `Resource not found with id: ${req.params.id}`,
      });
    }
  } catch (error) {
    res.status(404).json({
      success: false,
      message: `Resource not found with id: ${req.params.id}`,
    });
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
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Bootcamp name never been dublicate!" });
  }
};
//  @desc   update bootcamps
//  @route  put /api/v1/bootcamps/:id
//  @access Private
exports.updateBootcamps = async (req, res, next) => {
  try {
    const updateBootcamp = await Bootcamps.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidatorsr: true,
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
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      message: "Requested id is not match",
    });
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
    res.status(200).json({ code: 201, message: "Delete bootcamp" });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Requested id is not match!",
    });
  }
};
