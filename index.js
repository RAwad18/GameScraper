import express from 'express';
import bodyParser from 'body-parser';
// import cors from 'cors';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

import searchRouter from './routes/search.js';

const app = express()

app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
// app.use(cors())

app.use('/search', searchRouter)

app.listen(8080, () => console.log("Listening on the CHADDY port of 8080 😎"))