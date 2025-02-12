const express = require("express");
const {
  getAllCourses,
  getSingleCourse,
  getCoursesFromBootcamp,
  createCourse,
  updateCourses,
  deleteCourse,
} = require("../controller/courses");
const { protect } = require("../middleware/auth");

const router = express.Router({ mergeParams: true });

router.get("/", getAllCourses);
router.get("/:id", getSingleCourse);
router.post("/", protect, createCourse);
router.get("/bootcamp/:bootcampId", getCoursesFromBootcamp);
router.put("/:id", protect, updateCourses);
router.delete("/:id", protect, deleteCourse);

module.exports = router;
