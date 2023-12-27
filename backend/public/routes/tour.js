import express from "express";
import {
  touradd,
  tourdelete,
  tourread,
  tourupdate,
} from "../../controllers/tour.js";
import upload from "../../middleware/multerMiddleware.js";
const tour = express.Router();

tour.post("/add", upload, touradd);
tour.get("/", tourread);
tour.put("/update/:id", upload, tourupdate);
tour.delete("/delete/:id", tourdelete);
export default tour;
