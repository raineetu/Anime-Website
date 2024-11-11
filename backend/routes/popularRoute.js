// userRoute.js
import express from 'express';
import isAuthenticated from "../middleware/authenticateToken.js"; // Ensure the path is correct
import { getPopularAnime } from '../controller/popularController.js';

const router = express.Router();

router.get('/', isAuthenticated, getPopularAnime); // Protect this route with isAuthenticated middleware

export default router;
