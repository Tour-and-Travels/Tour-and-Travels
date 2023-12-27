import mysql from "mysql";
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "tourdb",
});

const bookingadd = (req, res) => {
  const { user_id, tour_id } = req.body;
  const INSERT_Booking_QUERY = `INSERT INTO booking (user_id, tour_id) VALUES (?, ?)`;
  db.query(INSERT_Booking_QUERY, [user_id, tour_id], (error, results) => {
    if (error) {
      res.status(500).send({ message: "Error in booking", error });
    } else {
      res.status(200).send({ message: "Booking is successful" });
    }
  });
};
export { bookingadd };
