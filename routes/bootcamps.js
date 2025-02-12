const express = require("express");
const {
  getBootcamps,
  getSingleBootcamps,
  createBootcamps,
  updateBootcamps,
  deleteBootcamps,
} = require("../controller/bootcamps");
const { protect, authorize } = require("../middleware/auth");
const router = express.Router();

router.get("/", getBootcamps);

router.get("/:id", getSingleBootcamps);
router.put("/:id", protect, authorize("publisher", "admin"), updateBootcamps);

router.post("/", protect, authorize("publisher", "admin"), createBootcamps);
router.delete(
  "/:id",
  protect,
  authorize("publisher", "admin"),
  deleteBootcamps
);

module.exports = router;
