// This file is just a place to organize the routes
// I'll probably remove it in the future if I end up not having that many routes
// 
import express from 'express';
import scrapeQuery from '../controllers/search_controller.js';

const router = express.Router();

router.get("/", scrapeQuery)

export default router
