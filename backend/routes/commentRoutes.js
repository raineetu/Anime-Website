import express from 'express';
import { createComment, fetchCommentsForEpisode, deleteComment,updateComment } from '../controller/commentController.js';
import isAuthenticated from "../middleware/authenticateToken.js"; // JWT middleware for authentication

const router = express.Router();

// Route to create a comment
router.post('/', isAuthenticated, createComment); // User ID is set in req.id

// Route to fetch comments for a specific anime episode
router.get('/:animeTitle', fetchCommentsForEpisode);
// Route to delete a comment
router.delete('/:commentId', isAuthenticated, deleteComment); 
//Route to update a comment
router.put('/:commentId', isAuthenticated, updateComment);


export default router;
