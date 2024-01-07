import mysql from "mysql";
import fs from "fs";
import upload from "../middleware/multerMiddleware.js";
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "tourdb",
});

const touradd = (req, res) => {
  const {
    hotel_id,
    category,
    description,
    maximum_occupancy,
    Price,
    Tagline,
    Duration,
    Starting_date,
    Ending_date,
  } = req.body;
  const image = req.file;
  console.log(req.file); // Assuming the image is uploaded using Multer middleware
  const imageBuffer = fs.readFileSync(image.path); // Read the uploaded image
  // console.log(imageBuffer);
  const INSERT_tour_QUERY = `INSERT INTO tour (hotel_id, category, description, maximum_occupancy,image,Price,Tagline,Duration,Starting_date,Ending_date) VALUES (?, ?,?, ?, ?, ?, ?, ?, ?, ?)`;
  db.query(
    INSERT_tour_QUERY,
    [
      hotel_id,
      category,
      description,
      maximum_occupancy,
      imageBuffer,
      Price,
      Tagline,
      Duration,
      Starting_date,
      Ending_date,
    ],
    (error, results) => {
      if (error) {
        res.status(500).send({ message: "Error adding tour", error });
      } else {
        fs.unlinkSync(image.path);
        res.status(200).send({ message: "Tour added successfully" });
      }
    }
  );
};

const tourread = (req, res) => {
  const SELECT_tourS_QUERY = `SELECT * FROM tour`;
  db.query(SELECT_tourS_QUERY, (error, results) => {
    if (error) {
      res.status(500).send({ message: "Error fetching tours", error });
    } else {
      res.status(200).json({ tours: results });
    }
  });
};

const tourupdate = (req, res) => {
  const tour_id = req.params.id;
  const {
    hotel_id,
    category,
    description,
    maximum_occupancy,
    Price,
    Tagline,
    Duration,
    Starting_date,
    Ending_date,
  } = req.body;
  const image = req.file; // Assuming the image is uploaded using Multer middleware

  // Check if the image is present in the request
  if (image) {
    // Read the uploaded image file into a buffer
    const imageBuffer = fs.readFileSync(image.path);

    // Update query with the image
    const UPDATE_tour_QUERY = `UPDATE tour SET hotel_id = ?, category = ?, description = ?, image = ?   Price = ?,
    Tagline = ?,
    maximum_occupancy = ?,
    Duration = ?,
    Starting_date = ?,
    Ending_date = ? WHERE tour_id = ?`;

    db.query(
      UPDATE_tour_QUERY,
      [
        hotel_id,
        category,
        description,
        maximum_occupancy,
        imageBuffer,
        Price,
        Tagline,
        Duration,
        Starting_date,
        Ending_date,
        tour_id,
      ],
      (error, results) => {
        if (error) {
          res.status(500).send({ message: "Error updating tour", error });
        } else {
          // Remove the temporary file if needed
          fs.unlinkSync(image.path);
          res.status(200).send({ message: "Tour updated successfully" });
        }
      }
    );
  } else {
    // Update query without the image
    const UPDATE_tour_NO_IMAGE_QUERY = `UPDATE tour SET hotel_id = ?, category = ?, description = ? Price = ?,
    Tagline = ?,
    maximum_occupancy = ?,
    Duration = ?,
    Starting_date = ?,
    Ending_date = ? WHERE tour_id = ?`;

    db.query(
      UPDATE_tour_NO_IMAGE_QUERY,
      [hotel_id, category, description, maximum_occupancy, tour_id],
      (error, results) => {
        if (error) {
          res.status(500).send({ message: "Error updating tour", error });
        } else {
          res.status(200).send({ message: "Tour updated successfully" });
        }
      }
    );
  }
};

const tourdelete = (req, res) => {
  const tour_id = req.params.id;
  const DELETE_tour_QUERY = `DELETE FROM tour WHERE tour_id = ?`;
  db.query(DELETE_tour_QUERY, [tour_id], (error, results) => {
    if (error) {
      res.status(500).send({ message: "Error deleting tour", error });
    } else {
      res.status(200).send({ message: "Tour deleted successfully" });
    }
  });
};
const specifictourread = (req, res) => {
  const tour_id = req.params.id;
  const SELECT_SINGLE_TOUR_QUERY = `SELECT * FROM tour WHERE tour_id = ?`;
  db.query(SELECT_SINGLE_TOUR_QUERY, [tour_id], (error, results) => {
    if (error) {
      res.status(500).send({ message: "Error fetching tour details", error });
    } else {
      if (results.length === 0) {
        res.status(404).send({ message: "Tour not found" });
      } else {
        res.status(200).json({ tour: results[0] });
      }
    }
  });
};
export { touradd, tourread, tourupdate, tourdelete, specifictourread };
