import mysql from "mysql";
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "tourdb",
});

const bookingadd = (req, res) => {
  const {
    user_id,
    tour_id,
    amount,
    people,
    booking_date,
    name,
    email,
    phone_no,
  } = req.body;
  const INSERT_Booking_QUERY = `INSERT INTO booking (user_id, tour_id, amount, people, booking_date, name,email,phone_no,booking_status) VALUES (?, ?, ?, ?, ?,?, ?, ?,1)`;
  db.query(
    INSERT_Booking_QUERY,
    [user_id, tour_id, amount, people, booking_date, name, email, phone_no],
    (error, results) => {
      if (error) {
        res.status(500).send({ message: "Error in booking", error });
      } else {
        res.status(200).send({ message: "Booking is successful" });
      }
    }
  );
};
const bookingread = (req, res) => {
  const userId = req.params.id;
  const SELECT_BOOKING_QUERY = `SELECT booking_id,user_id,booking.tour_id,people,amount,booking_date,booking_status,hotel.hotel_id,hotel_name,location,name, email,phone_no FROM booking JOIN tour ON tour.tour_id = booking.tour_id JOIN hotel ON tour.hotel_id = hotel.hotel_id where user_id = ?`;
  db.query(SELECT_BOOKING_QUERY, [userId], (error, results) => {
    if (error) {
      res.status(500).send({ message: "Error fetching booking", error });
    } else {
      res.status(200).json({ booking: results });
    }
  });
};
const cancelbooking = (req, res) => {
  const bookingId = req.params.id;
  const UPDATE_BOOKING_STATUS_QUERY = `UPDATE booking SET booking_status = 0 WHERE booking_id = ?`;

  db.query(UPDATE_BOOKING_STATUS_QUERY, [bookingId], (error, results) => {
    if (error) {
      res.status(500).send({ message: "Error canceling booking", error });
    } else {
      res.status(200).send({ message: "Booking cancelled successfully" });
    }
  });
};
const specificbookingread = (req, res) => {
  const booking_id = req.params.id;
  const SELECT_SINGLE_BOOKING_QUERY = `SELECT * FROM booking WHERE booking_id = ?`;
  db.query(SELECT_SINGLE_BOOKING_QUERY, [booking_id], (error, results) => {
    if (error) {
      res.status(500).send({ message: "Error fetching tour details", error });
    } else {
      if (results.length === 0) {
        res.status(404).send({ message: "Tour not found" });
      } else {
        res.status(200).json({ booking: results[0] });
      }
    }
  });
};
const updatebooking = (req, res) => {
  const bookingId = req.params.id;
  const { name, email, phone_no, numOfPeople, amount, booking_date } = req.body;
  const UPDATE_BOOKING_QUERY = `
    UPDATE booking
    SET name = ?, email = ?, phone_no = ?, people = ?, amount = ?, booking_date = ? WHERE booking_id = ?
  `;

  db.query(
    UPDATE_BOOKING_QUERY,
    [name, email, phone_no, numOfPeople, amount, booking_date, bookingId],
    (error, results) => {
      if (error) {
        res.status(500).send({ message: "Error updating booking", error });
      } else {
        if (results.affectedRows === 0) {
          res.status(404).send({ message: "Booking not found" });
        } else {
          res.status(200).send({ message: "Booking updated successfully" });
        }
      }
    }
  );
};
export {
  bookingadd,
  bookingread,
  cancelbooking,
  specificbookingread,
  updatebooking,
};
