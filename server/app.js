require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

const mongoose = require("mongoose");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const userRoute = require("./router/user.route");
const courseRoute = require("./router/course.route");
const adminRoute = require("./router/admin.route");
const siteInfoRoute = require("./router/site.route");
const teacherRoute = require("./router/teacher.route");
const studentRoute = require("./router/student.route");
const slidesRoute = require("./router/slide.route");

const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("Hello, world!");
});
// Static file serve

app.use("/user", userRoute);
app.use("/course", courseRoute);
app.use("/admin", adminRoute);
app.use("/siteinfo", siteInfoRoute);
app.use("/teacher", teacherRoute);
app.use("/student", studentRoute);
app.use("/slides", slidesRoute);

app.use((req, res) => {
  res.status(404).send("Route not found");
});

module.exports = app;
