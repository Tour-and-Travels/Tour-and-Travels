import express from "express";
import { bookingadd, bookingread } from "../../controllers/booking.js";

const booking = express.Router();
booking.get("/:id", bookingread);
booking.post("/add", bookingadd);
export default booking;
