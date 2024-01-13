import express from "express";
import {
  hotelbookingadd,
  hotelbookingread,
  hotelcancelbooking,
} from "../../controllers/hotelbooking.js";

const hotelbooking = express.Router();
hotelbooking.get("/:id", hotelbookingread);
hotelbooking.post("/add", hotelbookingadd);
hotelbooking.put("/cancel/:id", hotelcancelbooking);
export default hotelbooking;
