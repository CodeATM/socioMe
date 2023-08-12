const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const PORT = 5000;
require("dotenv").config();
const AppError = require("./utils/appError");
const MainErrorHAndler = require("./Controllers/ErrorController");
const { verifyAccess } = require("./middlewares/AuthMiddleware");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect("mongodb://localhost:27017/social", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`databse connected`));

app.get("/test", verifyAccess, (req, res, next) => {
  res.json({ message: "Hello world" });
});

app.use("/user", require("./routes/userRoutes"));
app.use("/post", require("./routes/postRoutes"));
app.use("/comment", require("./routes/commentsRoute"));
app.use("/likes", require("./routes/likeRoutes"));

// app.get("/test", verifyAccess , (req, res, next) => {
//   res.json({ message: "Hello world" });
// });

app.all("*", (req, res, next) => {
  next(new AppError(`can't find this route on the server!!!`, 404));
});

app.use(MainErrorHAndler);

app.listen(PORT, () => {
  console.log(`Backend is running on port ${PORT}`);
});
