import express from "express";
import {
  register,
  login,
  userlogin,
  userregister,
  userupdate,
  userread,
} from "../../controllers/auth.js";
import upload from "../../middleware/multerMiddleware.js";
const auth = express.Router();

auth.post("/register", register);
auth.post("/login", login);
auth.post("/userregister", upload, userregister);
auth.post("/userlogin", userlogin);
auth.put("/userupdate/:id", userupdate);
auth.get("/userread/:id", userread);
export default auth;
