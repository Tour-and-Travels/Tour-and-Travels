import express from "express";
import {
  hoteladd,
  hoteldelete,
  hotelread,
  hotelupdate,
} from "../../controllers/hotel.js";

const hotel = express.Router();

hotel.post("/add", hoteladd);
hotel.get("/", hotelread);
hotel.put("/update/:id", hotelupdate);
hotel.delete("/delete/:id", hoteldelete);
export default hotel;
