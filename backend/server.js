import express from "express";
import colors from "colors";
import mysql from "mysql";
import path from "path";
import router from "./public/routes/pages.js";
import auth from "./public/routes/auth.js";
import hotel from "./public/routes/hotel.js";
import tour from "./public/routes/tour.js";
import booking from "./public/routes/booking.js";
import hotelbooking from "./public/routes/hotelbooking.js";

// import { isAuthenticated } from "./middleware/authMiddleware.js";
const app = express();
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "tourdb",
});
const __dirname = path.resolve();
const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set("view engine", "hbs");
db.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Mysql tour database is connected...");
  }
});
app.use("/", router);
app.use("/auth", auth);
app.use("/hotel", hotel);
app.use("/tour", tour);
app.use("/booking", booking);
app.use("/hotelbooking", hotelbooking);
const port = 5000;
const server = app.listen(
  port,
  console.log(`The server started at port ${port}`.blue.bold)
);
