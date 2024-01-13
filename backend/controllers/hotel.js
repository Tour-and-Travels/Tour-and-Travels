import mysql from "mysql";
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "tourdb",
});

const hoteladd = (req, res) => {
  const { hotel_name, location } = req.body;
  const INSERT_HOTEL_QUERY = `INSERT INTO hotel (hotel_name, location) VALUES (?, ?)`;
  db.query(INSERT_HOTEL_QUERY, [hotel_name, location], (error, results) => {
    if (error) {
      res.status(500).send({ message: "Error adding hotel", error });
    } else {
      res.status(200).send({ message: "Hotel added successfully" });
    }
  });
};
const hotelread = (req, res) => {
  const SELECT_HOTELS_QUERY = `SELECT * FROM hotel`;
  db.query(SELECT_HOTELS_QUERY, (error, results) => {
    if (error) {
      res.status(500).send({ message: "Error fetching hotel", error });
    } else {
      res.status(200).json({ hotels: results });
    }
  });
};

const hotelupdate = (req, res) => {
  const hotelId = req.params.id;
  const { hotel_name, location } = req.body;
  const UPDATE_HOTEL_QUERY = `UPDATE hotel SET hotel_name = ?, location = ? WHERE hotel_id = ?`;
  db.query(
    UPDATE_HOTEL_QUERY,
    [hotel_name, location, hotelId],
    (error, results) => {
      if (error) {
        res.status(500).send({ message: "Error updating hotel", error });
      } else {
        res.status(200).send({ message: "Hotel updated successfully" });
      }
    }
  );
};
// Delete a hotel
const hoteldelete = (req, res) => {
  const hotelId = req.params.id;
  const DELETE_HOTEL_QUERY = `DELETE FROM hotel WHERE hotel_id = ?`;
  db.query(DELETE_HOTEL_QUERY, [hotelId], (error, results) => {
    if (error) {
      res.status(500).send({ message: "Error deleting hotel", error });
    } else {
      res.status(200).send({ message: "Hotel deleted successfully" });
    }
  });
};
const specifichotelread = (req, res) => {
  const hotel_id = req.params.id;
  const SELECT_SINGLE_HOTEL_QUERY = `SELECT * FROM hotel WHERE hotel_id = ?`;
  db.query(SELECT_SINGLE_HOTEL_QUERY, [hotel_id], (error, results) => {
    if (error) {
      res.status(500).send({ message: "Error fetching tour details", error });
    } else {
      if (results.length == 0) {
        res.status(404).send({ message: "Hotel not found" });
      } else {
        res.status(200).json({ hotels: results[0] });
      }
    }
  });
};
export { hoteladd, hotelread, hotelupdate, hoteldelete, specifichotelread };
