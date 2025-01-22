const mongoose = require("mongoose");

const connectDb = async () => {
  // const conn = await mongoose.connect(process.env.MONGO_URI);
  const conn = await mongoose.connect(process.env.MONGO_URI_CLUSTER);

  console.log(`MongoDB Connected: ${conn.connection.host}`);
};

module.exports = connectDb;
