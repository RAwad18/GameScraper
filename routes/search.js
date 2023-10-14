import express from 'express';
import scrapeQuery from '../controllers/search_controller.js';

const router = express.Router();

router.get("/", scrapeQuery)

export default router
