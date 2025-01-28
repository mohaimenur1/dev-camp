const mongoose = require("mongoose");
const Course = require("../models/Course");

// get all courses
exports.getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.find(req.query);
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
      bootcamp: new mongoose.Types.ObjectId(req.params.id),
    });
    console.log("bootcamp", getResponse);
    console.log("params", req.params.bootcampId);
    res.status(200).json({
      success: true,
      message: `Successfully get courses from bootcamp id ${req.params.bootcampId}`,
      data: getResponse,
    });
  } catch (error) {
    next(error);
  }
};
