import express from "express";
import {
  hoteladd,
  hoteldelete,
  hotelread,
  hotelupdate,
  specifichotelread,
} from "../../controllers/hotel.js";

const hotel = express.Router();

hotel.post("/add", hoteladd);
hotel.get("/", hotelread);
hotel.put("/update/:id", hotelupdate);
hotel.delete("/delete/:id", hoteldelete);
hotel.get("/specificread/:id", specifichotelread);
export default hotel;
