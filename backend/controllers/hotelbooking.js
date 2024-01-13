import mysql from "mysql";
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "tourdb",
});
const hotelbookingadd = (req, res) => {
  const {
    user_id,
    hotel_id,
    amount,
    check_in_date,
    check_out_date,
    name,
    email,
    phone_no,
    rooms,
    booking_status,
  } = req.body;
  const INSERT_Booking_QUERY = `INSERT INTO hotelbooking (user_id, hotel_id, amount, check_in_date,check_out_date,name,email,phone_no,rooms,booking_status) VALUES (?, ?, ?, ?, ?,?,?,?,?, 1)`;
  db.query(
    INSERT_Booking_QUERY,
    [
      user_id,
      hotel_id,
      amount,
      check_in_date,
      check_out_date,
      name,
      email,
      phone_no,
      rooms,
      booking_status,
    ],
    (error, results) => {
      if (error) {
        res.status(500).send({ message: "Error in booking", error });
      } else {
        res.status(200).send({ message: "Hotel Booking is successful" });
      }
    }
  );
};
const hotelbookingread = (req, res) => {
  const userId = req.params.id;
  const SELECT_BOOKING_QUERY = `SELECT * FROM hotelbooking where user_id = ?`;
  db.query(SELECT_BOOKING_QUERY, [userId], (error, results) => {
    if (error) {
      res.status(500).send({ message: "Error fetching booking", error });
    } else {
      res.status(200).json({ booking: results });
    }
  });
};
const hotelcancelbooking = (req, res) => {
  const bookingId = req.params.id;
  const UPDATE_BOOKING_STATUS_QUERY = `UPDATE hotelbooking SET booking_status = 0 WHERE hotelbooking_id = ?`;

  db.query(UPDATE_BOOKING_STATUS_QUERY, [bookingId], (error, results) => {
    if (error) {
      res.status(500).send({ message: "Error canceling booking", error });
    } else {
      res.status(200).send({ message: "Booking cancelled successfully" });
    }
  });
};

export { hotelbookingadd, hotelbookingread, hotelcancelbooking };
