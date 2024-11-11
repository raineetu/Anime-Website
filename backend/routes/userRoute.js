import express from "express";
import { register, login, logout, updateProfile,getAllUsers } from "../controller/userController.js";
import isAuthenticated from "../middleware/authenticateToken.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

// Register route with file upload
router.route("/register").post(upload, register); 

// Login and logout routes
router.route("/login").post(login);
router.route("/logout").post(logout);

// Update profile route with PUT method
router.route("/updateProfile").put(isAuthenticated, upload, updateProfile);

router.get("/users", getAllUsers);


export default router;
