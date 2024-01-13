import express from "express";
import {
  bookingadd,
  bookingread,
  cancelbooking,
  specificbookingread,
  updatebooking,
} from "../../controllers/booking.js";

const booking = express.Router();
booking.get("/:id", bookingread);
booking.get("/specificread/:id", specificbookingread);
booking.post("/add", bookingadd);
booking.put("/cancel/:id", cancelbooking);
booking.put("/update/:id", updatebooking);
export default booking;
