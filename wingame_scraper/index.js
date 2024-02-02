import { Sequelize } from 'sequelize';
import WinGameStoreScraper from './utils/wingamestore.js';
import * as fs from 'fs';
import UpdateTables from './utils/update-tables.js';

// All the data needed in order to connect to our DB
const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USERNAME,
    process.env.DATABASE_PASSWORD,
    {
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        dialect: 'mysql',
        define: {
            freezeTableName: true,
        },
        dialectOptions: {
            // multipleStatements: false,
            infileStreamFactory: path => fs.createReadStream(path),
        }
    },
);

let wingameSuccess = true;

// try {
//     wingameSuccess = await WinGameStoreScraper();
// } catch (error) {
//     console.error(error)
// }

async function ConnectAndUpdate() {
    try {
        await sequelize.authenticate();
        await UpdateTables(sequelize, 'wingamestore');
    } catch (error) {
        console.log("FAILED TO UPDATE TABLES")
        console.error(error)
    } finally {
        await sequelize.close();
    }
}

if (wingameSuccess) {
    ConnectAndUpdate();
} else {
    console.log("FAILED TO SCRAPE WINGAMESTORE :(")
}

