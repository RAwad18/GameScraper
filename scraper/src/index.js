// IMPORTS
import { Sequelize } from 'sequelize';
import * as fs from 'fs';
import schedule from 'node-schedule'

import { UpdateLogFiles, Scrape_Logger, SQL_Logger } from './logs/logger_functions.js';
import UpdateTables from './sql-functions/update-tables.js';
import SteamScraper from './scraping-functions/steam.js';
import GameBilletScraper from './scraping-functions/gamebillet.js';
import GamesPlanetScraper from './scraping-functions/gamesplanet.js';
import GamersGateScraper from './scraping-functions/gamersgate.js';
import TwoGameScraper from './scraping-functions/2game.js';

import dotenv from 'dotenv'

// END OF IMPORTS

console.log("Starting program...waiting for the designated time.")
// Run this program everyday at 1:15pm
// Change it back to: '15 18 * * *' --- need to add +5 because container uses UTC timezone (+5 hours ahead)
schedule.scheduleJob('15 18 * * *',
    async () => {

        
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

        // "Rearranges" the log files --- what was 'current' and 'old' yesterday, becomes 'old' and 'oldest' today - respectively
        UpdateLogFiles();

        // This variable will contain the results of our scraping functions
        // If a scraping function is successful, it will return the name of the website it scraped in lowercase...
        // Which corresponds to the SQL table for that respective website.
        // If a scraping function fails, then it will return null
        // The array might look something like this...
        // [ steam, gamebillet, null, ... ]
        const arrayOfScrapers = [SteamScraper, GameBilletScraper, GamesPlanetScraper, GamersGateScraper, TwoGameScraper]
        const arrayOfCSVs = [];
        let retries = 0;

        // Attempt to scrape all the websites
        try {
            Scrape_Logger(`[${new Date().toUTCString()}] ---- STARTING SCRAPING OPERATIONS\n`, false)

            for(let i = 0; i < arrayOfScrapers.length; i++){
                try {
                    
                    arrayOfCSVs.push(await arrayOfScrapers[i]())
                    retries = 0;

                } catch (error) {

                    if(retries > 2)
                        continue;

                    retries++;
                    i--;
                    
                }
            }

            Scrape_Logger(`[${new Date().toUTCString()}] ---- ENDING OF SCRAPING OPERATIONS\n`, false)
        } catch (error) {
            console.error(error)
            Scrape_Logger(`\n\t${error.stack}`, false)
            Scrape_Logger(`[${new Date().toUTCString()}] ---- FAILURE DURING SCRAPING OPERATIONS\n`, false)
        }


        // Updating the database
        try {

            // Attempt to connect to the database...
            await SQL_Logger(`[${new Date().toUTCString()}] ---- CONNECTING TO THE DATABASE...\n`, false)
            await sequelize.authenticate();


            for (const csv of arrayOfCSVs) {

                // If a value within the arrayOfCSVs is false, log to the scrape_log file which website needs to be rescraped
                if (csv === null) {
                    scrapeError = true;
                    continue;
                }

                // Try to update the SQL tables
                // On failure, log out which tables need to be retried
                // This doesn't include any CSV's who's value was null
                try {
                    await UpdateTables(sequelize, csv)
                } catch (error) {
                    sqlError = true;
                    continue;
                }
            }


        } catch (error) {
            SQL_Logger(`\n\t${error.stack}`, false)
            SQL_Logger(`\n\tCRITICAL FAILURE: ${error.name}: ${error.message.toUpperCase()}`, false)

        } finally {
            await sequelize.close();
            SQL_Logger(`[${new Date().toUTCString()}] ---- DISCONNECTED: Connection to the DB has been closed.\n`, false)

        }

    }
)