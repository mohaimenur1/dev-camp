const express = require("express");
const dotenv = require("dotenv");
const bootcampsRouter = require("./routes/bootcamps");
const userRegisterRouter = require("./routes/auth");
const connectDb = require("./config/db");
const errorHandler = require("./middleware/error");
const coursesRouter = require("./routes/courses");
const fileUpload = require("express-fileupload");
const path = require("path");
const cookieParser = require("cookie-parser");

// load env vars
dotenv.config({ path: "./config/config.env" });

// connect to database
connectDb();

// initialize express app
const app = express();
app.use(cookieParser());

// middleware
//body perser
app.use(express.json());

app.use(express.static(path.join(__dirname, "public/uploads")));

// middleware
const logger = (req, res, next) => {
  console.log(
    `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`
  );
  next();
};

// use middleware
app.use(logger);
app.use(fileUpload());

app.use("/api/v1/bootcamps", bootcampsRouter);
app.use("/api/v1/courses", coursesRouter);
app.use("/api/v1/auth", userRegisterRouter);

app.get("*", (req, res) => {
  res.send("Invalid Link!");
});

app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, console.log(`Server running in ${PORT}`));
