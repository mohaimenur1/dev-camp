const express = require("express");
const {
  getAllCourses,
  getSingleCourse,
  getCoursesFromBootcamp,
  createCourse,
  updateCourses,
  deleteCourse,
} = require("../controller/courses");

const router = express.Router({ mergeParams: true });

router.get("/", getAllCourses);
router.get("/:id", getSingleCourse);
router.post("/", createCourse);
router.get("/bootcamp/:bootcampId", getCoursesFromBootcamp);
router.put("/:id", updateCourses);
router.delete("/:id", deleteCourse);

module.exports = router;
