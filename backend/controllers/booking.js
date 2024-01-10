import mysql from "mysql";
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "tourdb",
});

const bookingadd = (req, res) => {
  const { user_id, tour_id, amount, people, booking_date } = req.body;
  const INSERT_Booking_QUERY = `INSERT INTO booking (user_id, tour_id, amount, people, booking_date) VALUES (?, ?, ?, ?, ?)`;
  db.query(
    INSERT_Booking_QUERY,
    [user_id, tour_id, amount, people, booking_date],
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
  const SELECT_BOOKING_QUERY = `SELECT * FROM booking where user_id = ?`;
  db.query(SELECT_BOOKING_QUERY, [userId], (error, results) => {
    if (error) {
      res.status(500).send({ message: "Error fetching booking", error });
    } else {
      res.status(200).json({ booking: results });
    }
  });
};
export { bookingadd, bookingread };
