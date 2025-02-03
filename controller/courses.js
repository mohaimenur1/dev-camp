const mongoose = require("mongoose");
const Course = require("../models/Course");

// get all courses
exports.getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.find(req.query).populate("bootcamp");
    res.status(200).json({
      success: true,
      message: "Successfully retrive data",
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    next(error);
  }
};

// get a single course
exports.getSingleCourse = async (req, res, next) => {
  try {
    const getApiResponse = await Course.findById(req.params.id);
    res.status(200).json({
      success: true,
      message: "Retrive Single Course",
      data: getApiResponse,
    });
  } catch (error) {
    next(error);
  }
};

// get course based on bootcamps
exports.getCoursesFromBootcamp = async (req, res, next) => {
  try {
    // const bootcampId = new mongoose.Types.ObjectId(req.params.id);
    const getResponse = await Course.find({
      bootcamp: new mongoose.Types.ObjectId(req.params.bootcampId),
    }).populate("bootcamp");
    res.status(200).json({
      success: true,
      message: `Successfully get courses from bootcamp id ${req.params.bootcampId}`,
      data: getResponse,
    });
  } catch (error) {
    next(error);
  }
};

// create course
exports.createCourse = async (req, res, next) => {
  try {
    let getResponse = await Course.create(req.body);
    res.status(201).json({
      success: true,
      message: "Course create successfully",
      data: getResponse,
    });
  } catch (error) {
    next(error);
  }
};

//  @desc   update courses
//  @route  put /api/v1/course/:id
//  @access Private
exports.updateCourses = async (req, res, next) => {
  try {
    const updateCourse = await Course.findByIdAndUpdate(
      req.params.id, //who's id
      req.body, // what thing to send
      {
        new: true,
        runValidatorsr: true, // options
      }
    );

    if (!updateCourse) {
      return res.status(400).json({
        sucess: false,
        message: "Requested id is not match",
      });
    }
    res
      .status(200)
      .json({ code: 200, message: "Update bootcamp", data: updateCourse });
  } catch (err) {
    // return res.status(400).json({
    //   sucess: false,
    //   message: "Requested id is not match",
    // });
    next(err);
  }
};

//  @desc   delete courses
//  @route  delete /api/v1/courses/:id
//  @access Private
exports.deleteCourse = async (req, res, next) => {
  try {
    const deleteCourse = await Course.findByIdAndDelete(req.params.id);
    if (!deleteCourse) {
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
