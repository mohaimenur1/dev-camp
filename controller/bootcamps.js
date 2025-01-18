//  @desc   Get all bootcamps
//  @route  Get /api/v1/bootcamps
//  @access Public
exports.getBootcamps = (req, res, next) => {
  res
    .status(200)
    .json({ code: 200, message: "Bootcamps data retrive Successfully" });
};

//  @desc   Get single bootcamps
//  @route  Get /api/v1/bootcamps/:id
//  @access Public
exports.getSingleBootcamps = (req, res, next) => {
  res.status(200).json({ code: 201, message: "Get Single bootcamp" });
};

//  @desc   Create bootcamps
//  @route  post /api/v1/bootcamps
//  @access Private
exports.createBootcamps = (req, res, next) => {
  res.status(200).json({ code: 201, message: "Create bootcamp" });
};
//  @desc   update bootcamps
//  @route  put /api/v1/bootcamps/:id
//  @access Private
exports.updateBootcamps = (req, res, next) => {
  res.status(200).json({ code: 201, message: "Update bootcamp" });
};
//  @desc   delete bootcamps
//  @route  delete /api/v1/bootcamps/:id
//  @access Private
exports.deleteBootcamps = (req, res, next) => {
  res.status(200).json({ code: 201, message: "Delete bootcamp" });
};
