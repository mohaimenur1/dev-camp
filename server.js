const express = require("express");
const dotenv = require("dotenv");
const bootcampsRouter = require("./routes/bootcamps");
const connectDb = require("./config/db");
const errorHandler = require("./middleware/error");

// load env vars
dotenv.config({ path: "./config/config.env" });

// connect to database
connectDb();

// initialize express app
const app = express();

// middleware
//body perser
app.use(express.json());

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
app.get("*", (req, res) => {
  res.send("Invalid Link!");
});

app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, console.log(`Server running in ${PORT}`));
