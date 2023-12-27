import mysql from "mysql";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const register = (req, res) => {
  // console.log(req.body);
  const { name, email, password, confirmPassword } = req.body;
  const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "tourdb",
  });
  db.query(
    "SELECT email FROM admin where email = ?",
    [email],
    async (error, results) => {
      if (error) {
        console.log(error);
      }
      const hashPassword = await bcrypt.hash(password, 8);
      if (results.length > 0) {
        return res.status(400).json({ message: "Email is already in use" });
      }
      db.query("INSERT INTO admin SET ?", {
        name: name,
        email: email,
        password: hashPassword,
      });
      db.query(
        "SELECT * FROM admin WHERE email = ?",
        [email],
        async (error, results) => {
          if (error) {
            console.log(error);
            return res
              .status(400)
              .json({ message: "Invalid Email id or Password" });
          } else {
            const newUserId = results.admin_id;
            // console.log(results.email);
            const token = generateToken(newUserId);
            const message = "Registration is successful";
            return res.status(201).json({
              message: message,
              token: token,
              admin: results,
            });
          }
        }
      );
    }
  );
};
const login = (req, res) => {
  const { email, password } = req.body;

  const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "tourdb",
  });

  db.query(
    "SELECT * FROM admin WHERE email = ?",
    [email],
    async (error, results) => {
      if (error) {
        console.log(error);
      } else if (!email || !password) {
        return res.status(400).json({ message: "Enter all the details" });
      } else if (results.length === 0) {
        return res
          .status(400)
          .json({ message: "Invalid Email id or Password" });
      } else {
        const admin = results[0];
        // console.log(admin.password);
        // console.log(password);
        const isMatch = await bcrypt.compare(password, admin.password);
        if (isMatch) {
          const token = generateToken(admin.admin_id);
          const message = "Login is successful";
          // res.redirect(`/?message=${message}&token=${token}`);
          return res.status(201).json({
            message: message,
            token: token,
            admin: admin,
          });
        } else {
          return res.status(400).json({ message: "Email is already in use" });
        }
      }
    }
  );
};

export { register, login };
