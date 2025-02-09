const mongoose = require("mongoose");

const connectDb = async () => {
  // const conn = await mongoose.connect(process.env.MONGO_URI);
  const conn = await mongoose.connect(process.env.MONGO_URI_CLUSTER);

  if (conn) {
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } else {
    console.log(`MongoDB Connected: Failed`);
  }
};

module.exports = connectDb;
