const express = require("express");
const {
  getBootcamps,
  getSingleBootcamps,
  createBootcamps,
  updateBootcamps,
  deleteBootcamps,
} = require("../controller/bootcamps");
const router = express.Router();

router.get("/", getBootcamps);

router.get("/:id", getSingleBootcamps);
router.put("/:id", updateBootcamps);

router.post("/", createBootcamps);
router.delete("/:id", deleteBootcamps);

module.exports = router;
