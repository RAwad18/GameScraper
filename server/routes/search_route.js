import express from 'express';
import bodyParser from 'body-parser';
import { checkForQuery, addSearchFn } from '../middleware/search_route_middleware.js';
import { retrieveFromCurrent, retrieveFromOld } from '../controllers/search_controller.js';

const searchRouter = express.Router();

// For all GET requests at the "/" endpoint, use the searchController to handle/process them
// this is really the "search/" endpoint

// searchRouter.get('/search', bodyParser.json({ limit: "30mb", extended: true }));
searchRouter.get('/search', bodyParser.urlencoded({ limit: "30mb", extended: true }));
searchRouter.get("/", checkForQuery)            // Checks if a query param is passed --- if not, reject the request 
searchRouter.get("/", addSearchFn)
searchRouter.get("/", retrieveFromCurrent)          // Attempts to retrieve the most recent data, calls next() if anything 'fails'
searchRouter.get("/", retrieveFromOld)          // Attempts to retrieve older data if called

export default searchRouter;
