const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const session = require("express-session");
const multer = require("multer");

const sequelize = require("./src/utils/config/database")

dotenv.config();

const authRoutes = require("./src/routes/auth");
const taskRoutes = require("./src/routes/task");

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

//only allowing particular file uploads
// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype === "image/png" ||
//     file.mimetype === "image/jpeg" ||
//     file.mimetype === "image/jpg"
//   ) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(
  multer({ storage: fileStorage }).single("attachment")
);
app.use(
    session({
      secret: "confidential",
      resave: false,
      saveUninitialized: false
    })
  );
app.use(authRoutes);
app.use(taskRoutes);

sequelize
.sync()
.then(()=>{
    app.listen(process.env.PORT);
    console.log(`Server started at port ${process.env.PORT}`);
})
.catch(err => console.log(err))

