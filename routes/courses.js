const express = require("express");
const {
  getAllCourses,
  getSingleCourse,
  getCoursesFromBootcamp,
  createCourse,
} = require("../controller/courses");

const router = express.Router({ mergeParams: true });

router.get("/", getAllCourses);
router.get("/:id", getSingleCourse);
router.post("/", createCourse);
router.get("/bootcamp/:bootcampId", getCoursesFromBootcamp);

module.exports = router;
