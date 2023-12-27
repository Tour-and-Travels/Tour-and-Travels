import express from "express";
import {
  register,
  login,
  userlogin,
  userregister,
} from "../../controllers/auth.js";

const auth = express.Router();

auth.post("/register", register);
auth.post("/login", login);
auth.post("/userregister", userregister);
auth.post("/userlogin", userlogin);
export default auth;
