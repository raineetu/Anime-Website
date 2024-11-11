import express from 'express';
import { getRecommendations } from '../controller/recommendationController.js';

const router = express.Router();

// Recommendation route
router.get('/:userId', getRecommendations);

export default router;
