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
  const { hotel_id, category, description } = req.body;
  const image = req.file;
  console.log(req.file); // Assuming the image is uploaded using Multer middleware
  const imageBuffer = fs.readFileSync(image.path); // Read the uploaded image
  // console.log(imageBuffer);
  const INSERT_tour_QUERY = `INSERT INTO tour (hotel_id, category, description, image) VALUES (?, ?, ?, ?)`;
  db.query(
    INSERT_tour_QUERY,
    [hotel_id, category, description, imageBuffer],
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
  const { hotel_id, category, description } = req.body;
  const image = req.file; // Assuming the image is uploaded using Multer middleware

  // Check if the image is present in the request
  if (image) {
    // Read the uploaded image file into a buffer
    const imageBuffer = fs.readFileSync(image.path);

    // Update query with the image
    const UPDATE_tour_QUERY = `UPDATE tour SET hotel_id = ?, category = ?, description = ?, image = ? WHERE tour_id = ?`;

    db.query(
      UPDATE_tour_QUERY,
      [hotel_id, category, description, imageBuffer, tour_id],
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
    const UPDATE_tour_NO_IMAGE_QUERY = `UPDATE tour SET hotel_id = ?, category = ?, description = ? WHERE tour_id = ?`;

    db.query(
      UPDATE_tour_NO_IMAGE_QUERY,
      [hotel_id, category, description, tour_id],
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

export { touradd, tourread, tourupdate, tourdelete };
