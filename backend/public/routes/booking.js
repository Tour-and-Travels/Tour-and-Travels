import express from "express";
import {
  bookingadd,
  bookingread,
  cancelbooking,
} from "../../controllers/booking.js";

const booking = express.Router();
booking.get("/:id", bookingread);
booking.post("/add", bookingadd);
booking.put("/cancel/:id", cancelbooking);
export default booking;
