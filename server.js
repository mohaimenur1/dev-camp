const express = require("express");
const dotenv = require("dotenv");
const bootcampsRouter = require("./routes/bootcamps");

// load env vars
dotenv.config({ path: "./config/config.env" });

// initialize express app
const app = express();

// middleware
const logger = (req, res, next) => {
  console.log(
    `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`
  );
  next();
};

// use middleware
app.use(logger);

app.use("/api/v1/bootcamps", bootcampsRouter);

const PORT = process.env.PORT;

app.listen(PORT, console.log(`Server running in ${PORT}`));
