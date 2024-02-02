import express from 'express';
import { Sequelize, Transaction } from 'sequelize';
import cors from 'cors';
import helmet from "helmet";
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as fs from 'fs';

import dotenv from 'dotenv'

import { checkReqType } from './middleware/index_middleware.js';
import searchRouter from './routes/search_route.js';

try {

    // Set up Server and DB variables
    const app = express();
    const sequelize = new Sequelize(
        process.env.DATABASE_NAME,
        process.env.DATABASE_USERNAME,
        process.env.DATABASE_PASSWORD,
        {
            host: process.env.DATABASE_HOST,
            port: process.env.DATABASE_PORT,
            dialect: 'mysql',
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000,
            },
            isolationLevel: Transaction.ISOLATION_LEVELS.REPEATABLE_READ,
            define: {
                freezeTableName: true,
            },
            dialectOptions: {
                // multipleStatements: false,
                infileStreamFactory: path => fs.createReadStream(path),
            },
            logging: false,
        },
    );

    // Set up middleware for all requests and endpoints
    app.use(helmet())
    app.use(
        helmet.contentSecurityPolicy({
          useDefaults: true,
          directives: {
            "script-src": ["'self'", "'unsafe-inline'", "example.com"],
            "img-src": ["'self'", "https: data:"],
            "default-src" : ["'self'"],
            "connect-src" : ["'self'", "http://localhost:8080", "https://localhost:8080", "http://gamescraper.ddns.net:8080/", "https://gamescraper.ddns.net:8080/"]
          }
        })
      )

    // Will probably disable this one
    // app.use(cors());
    
    app.use('*', checkReqType)

    const __dirname = path.dirname(fileURLToPath(import.meta.url));

    app.use(express.static(path.resolve(__dirname, './dist')))

    app.get('/', async (req, res) => {
        res.status(200).sendFile(path.join(__dirname+'/dist/index.html'))
    })

    // Pass Sequelize object to all subsequent middleware at the /search endpoint
    app.get('/api/search', async (req, res, next) => {
        try {
            res.locals.sequelize = sequelize;
            res.locals.html = fs.readFileSync(path.resolve(__dirname, './dist/index.html'));
            next();
        } catch (error) {
            console.error(error)
            res.status(404).send(error)
        }
    });

    // For any requests at the /search endpoint, use searchRouter middleware
    app.use('/api/search', searchRouter);

    // Fallback for any errors, React-Router handles the rest.
    app.get('*', async (req, res) => {
        res.status(200).sendFile(path.join(__dirname+'/dist/index.html'))
    })

    // Connect to the DB + Start Server
    await sequelize.authenticate();
    console.log("Successfully Connected to the DB!")
    app.listen(process.env.SERVER_PORT, () => console.log(`Listening on the CHADDY port of ${process.env.SERVER_PORT} 😎`));

} catch (error) {
    console.error(error)
}