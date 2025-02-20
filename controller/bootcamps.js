//  @desc   Get all bootcamps
//  @route  Get /api/v1/bootcamps

const Bootcamps = require("../models/Bootcamps");
const ErrorResponse = require("../utils/errorResponse");
const path = require("path");

//  @access Public
exports.getBootcamps = async (req, res, next) => {
  try {
    let apiResponse = Bootcamps.find(req.query);

    if (req.query.name) {
      req.query.name = { $regex: req.query.name, $options: "i" };
      apiResponse = apiResponse.sort({ createdAt: -1 });
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
    const { name, description, address, website, phone, careers } = req.body;

    let fileName = null; // Initialize fileName as null

    // Check if a file was uploaded
    if (req.files && req.files.photo) {
      const { photo } = req.files;

      // Validate file type (ensure it's an image)
      if (!photo.mimetype.startsWith("image")) {
        return res.status(400).json({
          code: 400,
          success: false,
          message: "File is not an image",
        });
      }

      // Define file name
      fileName = `photo_${Date.now()}${path.extname(photo.name)}`;

      // Define upload path
      const uploadPath = path.join(__dirname, "../public/uploads", fileName);

      // Move the file to the upload path
      await photo.mv(uploadPath);
    }

    // Create the bootcamp in the database
    const bootcamp = await Bootcamps.create({
      name,
      description,
      address,
      website,
      phone,
      careers,
      photo: fileName, // Save the file name (or null if no file was uploaded)
      user: req.user.id,
    });

    // Send success response
    res.status(201).json({
      code: 201,
      success: true,
      message: "Bootcamp created successfully!",
      data: bootcamp,
    });
  } catch (err) {
    next(err);
  }
};
//  @desc   update bootcamps
//  @route  put /api/v1/bootcamps/:id
//  @access Private
exports.updateBootcamps = async (req, res, next) => {
  try {
    const updateBootcamp = await Bootcamps.findById(req.params.id);

    if (!updateBootcamp) {
      return res.status(400).json({
        success: false,
        message: "Requested ID does not match any bootcamp",
      });
    }

    // Only admin or the owner publisher can update the bootcamp
    if (
      req.user.role !== "admin" &&
      (req.user.role !== "publisher" ||
        updateBootcamp.user.toString() !== req.user.id)
    ) {
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to update this bootcamp`,
          401
        )
      );
    }

    // Perform the update
    const updatedBootcamp = await Bootcamps.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      code: 200,
      message: "Bootcamp updated successfully",
      data: updatedBootcamp,
    });
  } catch (err) {
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

    // Only admin or the owner publisher can delete the bootcamp
    if (
      req.user.role !== "admin" &&
      (req.user.role !== "publisher" ||
        updateBootcamp.user.toString() !== req.user.id)
    ) {
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to update this bootcamp`,
          401
        )
      );
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
