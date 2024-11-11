import express from 'express';
import { getDetails, postDetails, updateDetails } from '../controller/animecontroller.js'; // Ensure correct path and import postDetails

const router = express.Router();

// Route to get details by letter (place this before the optional id route)
router.get('/letter/:letter', getDetails);

// Route to get details by ID (optional parameter)
router.get('/:id?', getDetails);

// Route to post new anime details
router.post('/', postDetails);

router.put('/:id', updateDetails);


export default router;
