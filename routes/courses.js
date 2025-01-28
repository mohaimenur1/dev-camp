const express = require("express");
const {
  getAllCourses,
  getSingleCourse,
  getCoursesFromBootcamp,
} = require("../controller/courses");

const router = express.Router({ mergeParams: true });

router.get("/bootcamp/:bootcampId", getCoursesFromBootcamp);
router.get("/", getAllCourses);
router.get("/:id", getSingleCourse);

module.exports = router;
