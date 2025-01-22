const mongoose = require("mongoose");
const axios = require("axios");

const BootcampSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
    unique: true,
    trim: true,
    maxLength: [50, "Name can not be more than 50 characters"],
  },
  slug: String,
  description: {
    type: String,
    required: [true, "Please add a description"],
    maxLength: [500, "Description can not be more than 500 characters"],
  },
  website: {
    type: String,
    match: [
      /^(https?:\/\/)?([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})(:[0-9]{1,5})?(\/.*)?$/,
      "Please use a valid URL with HTTP or HTTPS",
    ],
  },
  phone: {
    type: String,
    required: true,
    maxLength: [20, "Phone number can not be longer than 20 characters"],
  },
  address: {
    type: String,
    required: [true, "Please add an address"],
  },
  location: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ["Point"], // 'location.type' must be 'Point'
      // required: true,
    },
    coordinates: {
      type: [Number],
      // required: true,
      index: "2dsphere",
    },
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
  },
  careers: {
    // Array of string
    type: [String],
    required: true,
    enum: [
      "Web Development",
      "Mobile Development",
      "UI/UX",
      "Data Science",
      "Business",
      "Other",
    ],
  },
  averageRating: {
    type: Number,
    min: [1, "Rating must be at least"],
    max: [10, "Rating can not be more than 10"],
  },
  averageCost: Number,
  photo: {
    type: String,
    default: "no-photo.jpg",
  },
  housing: {
    type: Boolean,
    default: false,
  },
  jobAssistance: {
    type: Boolean,
    default: false,
  },
  jobGuarantee: {
    type: Boolean,
    default: false,
  },
  acceptGi: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save middleware for geocoding
BootcampSchema.pre("save", async function (next) {
  try {
    // Call the Positionstack API
    const params = {
      access_key: process.env.GEOCODER_API_KEY, // Ensure this is set in your .env
      query: this.address,
    };

    const response = await axios.get(
      "http://api.positionstack.com/v1/forward",
      { params }
    );

    if (response.data && response.data.data && response.data.data.length > 0) {
      const loc = response.data.data[0]; // Get the first result

      // Set location fields
      this.location = {
        type: "Point",
        coordinates: [loc.longitude, loc.latitude],
        formattedAddress: loc.label,
        street: loc.street || "",
        city: loc.locality || "",
        state: loc.region || "",
        zipcode: loc.postal_code || "",
        country: loc.country || "",
      };

      // Remove the address field as it's no longer needed
      this.address = undefined;
    } else {
      console.log("No geocoding results found");
    }

    next();
  } catch (error) {
    console.error("Error in geocoding:", error.message);
    next(error);
  }
});

module.exports = mongoose.model("Bootcamps", BootcampSchema);
