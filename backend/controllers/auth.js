import mysql from "mysql";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import axios from "axios";
import fs from "fs";
import upload from "../middleware/multerMiddleware.js";
import path from "path";
dotenv.config();
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
const __dirname = path.resolve();
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
        return res.status(400).json({ message: "Incorrect Email or Password" });
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
const userregister = (req, res) => {
  console.log(req.body);
  const { name, email, password, phone_no } = req.body;
  const image = req.file;
  let imageBuffer;
  if (image) {
    console.log(req.file);
    imageBuffer = fs.readFileSync(image.path);
  } else {
    imageBuffer = fs.readFileSync(
      path.join(__dirname, "Assets//user_image.png")
    );
    console.log("abcd");
  }
  const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "tourdb",
  });
  db.query(
    "SELECT email FROM user where email = ?",
    [email],
    async (error, results) => {
      if (error) {
        console.log(error);
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      if (results.length > 0) {
        return res.status(400).json({ message: "Email is already in use" });
      }
      db.query("INSERT INTO user SET ?", {
        name: name,
        email: email,
        phone_no: phone_no,
        password: hashedPassword,
        image: imageBuffer,
      });
      db.query(
        "SELECT * FROM user WHERE email = ?",
        [email],
        async (error, results) => {
          if (error) {
            console.log(error);
            return res
              .status(400)
              .json({ message: "Invalid Email id or Password" });
          } else {
            if (image) {
              fs.unlinkSync(image.path);
            }
            const user = results[0];
            const newUserId = user.user_id;
            console.log(user.email);
            const token = generateToken(newUserId);
            console.log(token);
            const message = "Registration is successful";
            return res.status(201).json({
              message: message,
              token: token,
              user: user,
            });
          }
        }
      );
    }
  );
};
const userlogin = (req, res) => {
  const { email, password } = req.body;

  const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "tourdb",
  });

  db.query(
    "SELECT * FROM user WHERE email = ?",
    [email],
    async (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
      } else if (!email || !password) {
        return res.status(400).json({ message: "Enter all the details" });
      } else if (results.length === 0) {
        return res.status(400).json({ message: "Email is already in use" });
      } else {
        const user = results[0];
        const hashedPassword = user.password;
        const isMatch = await bcrypt.compare(password, hashedPassword);
        console.log(isMatch);
        if (isMatch) {
          const token = generateToken(user.user_id);
          const message = "Login is successful";
          return res.status(201).json({
            message: message,
            token: token,
            user: user,
          });
        } else {
          return res.status(400).json({
            message: "Invalid Email id or Password",
          });
        }
      }
    }
  );
};
const userupdate = (req, res) => {
  const userId = req.params.id;
  const { name, email, phone_no, password } = req.body;
  const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "tourdb",
  });
  let updateUserQuery = "UPDATE user SET name=?, email=?, phone_no=? ";
  let queryParams = [name, email, phone_no];

  if (password) {
    updateUserQuery += ", password=? ";
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error("Error hashing password:", err);
        return res.status(500).json({ message: "Error updating user" });
      }
      queryParams.push(hashedPassword);
      queryParams.push(userId);
      updateUserQuery += "WHERE user_id=?";
      db.query(updateUserQuery, queryParams, (error, results) => {
        if (error) {
          console.error("Error updating user:", error);
          return res.status(500).json({ message: "Error updating user" });
        }
      });
    });
  } else {
    queryParams.push(userId);
    updateUserQuery += "WHERE user_id=?";
    db.query(updateUserQuery, queryParams, (error, results) => {
      if (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ message: "Error updating user" });
      }
    });
  }
  db.query(
    "SELECT * FROM user WHERE email = ?",
    [email],
    async (error, results) => {
      if (error) {
        console.log(error);
        return res
          .status(400)
          .json({ message: "Invalid Email id or Password" });
      } else {
        const user = results[0];
        const newUserId = user.user_id;
        const token = generateToken(newUserId);
        const message = "Upadate is successful";
        return res.status(201).json({
          message: message,
          token: token,
          user: user,
        });
      }
    }
  );
};

const userread = (req, res) => {
  const userId = req.params.id;
  const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "tourdb",
  });
  const SELECT_SINGLE_USER_QUERY = `SELECT * FROM user WHERE user_id = ?`;
  db.query(SELECT_SINGLE_USER_QUERY, [userId], (error, results) => {
    if (error) {
      res.status(500).send({ message: "Error fetching tour details", error });
    } else {
      if (results.length === 0) {
        res.status(404).send({ message: "User not found" });
      } else {
        const token = generateToken(userId);
        const message = "User data fetch is successful";
        return res.status(201).json({
          message: message,
          token: token,
          user: results[0],
        });
      }
    }
  });
};
export { register, login, userregister, userlogin, userupdate, userread };
