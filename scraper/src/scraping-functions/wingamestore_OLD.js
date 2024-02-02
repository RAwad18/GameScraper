import * as fs from 'fs';
import * as cheerio from 'cheerio';
import { Scrape_Logger } from '../logs/logger_functions.js';

async function WinGameStoreScraper() {

    const site = "WINGAMESTORE";

    // selectors for scraping
    const selectorAll = 'tbody.boxoom .result-row'
    const title = '.atitle'
    const img = 'a.boxhole.img16x9 img'
    const href = '.atitle'
    const listPrice = '.price'

    // keeps track of the number of games scraped
    let count = 0;

    // Logging the Start of the Scraping 
    Scrape_Logger(`\t[${new Date().toUTCString()}] ---- SCRAPING "${site}"`, false);

    try {

        // Creates/Overwrites the csv --- sets the column field names
        fs.writeFile("./data/wingamestore.csv", "title\tprice\timage\tlink\n", err => {
            if (err) {
                throw err;
            }
        });

        // Scrapes All Games - Ends when the page requested doesn't match the number of pages available
        let response = await fetch("https://www.wingamestore.com/genres");
        response = await response.text();
        const $ = cheerio.load(response);

        // Gets All the Categories
        let categories = [];

        $("div#genres-main ul li.genre-block a.overclick")
            .each(function () {
                const link = $(this).attr("href")
                categories.push(link);
            })



        // Map that stores title of every game scraped
        // This is so we can check for duplicates
        // Each game can have multiple categories, so as we go thru all of them some games will appear twice, if not more.
        const GamesSet = new Set();
        // let i = 1;


        // Outer Loop Rotates thru the categories
        for (let category of categories) {

            let response = await fetch(`${category}?page=1&orderby=title&filters=date-0,rating-0,price-0`);
            response = await response.text();
            const $ = cheerio.load(response)

            const pageNum = parseInt(
                $('div.thumblinks').last().find('a.thumblink').last().text()
            )

            // Inner loop runs thru all the pages per category
            for (let i = 1; i <= pageNum; i++) {

                let response = await fetch(`${category}?page=${i}&orderby=title&filters=date-0,rating-0,price-0`);
                response = await response.text();
                const $ = cheerio.load(response)

                $('body').find(selectorAll)
                    .each(function () {

                        const gameTitle = $(this).find(title).text()

                        if (GamesSet.has(gameTitle))
                            return true     // is the same as 'continue' in jquery speak

                        const price = $(this).find(listPrice).text()
                        let image = $(this).find(img).attr("src")
                        const link = href === null ? $(this).attr('href') : $(this).find(href).attr('href')

                        image = 'https://www.wingamestore.com' + image;

                        // Adds title to set + increments the count
                        GamesSet.add(gameTitle);
                        count++;

                        fs.writeFile("./data/wingamestore.csv", `${gameTitle}\t${price || 'NULL'}\t${image}\t${link}\n`, { flag: 'a+' }, err => {
                            if (err) {
                                throw err;
                            }
                        });

                    })
                console.log(`\t${count} games scraped.`)
            }
            console.log("\n\tCategory Changed!\n")
        }
        
        Scrape_Logger(`\t[${new Date().toUTCString()}] ---- SUCCESS! ---- ${count} GAMES SCRAPED.\n`, false)

        return site.toLowerCase();

    } catch (error) {

        Scrape_Logger(`\n\t${error.stack}\n`, false);
        Scrape_Logger(`\t[${new Date().toUTCString()}] ---- ${site} SCRAPING FAILED ---- ${count} GAMES SCRAPED.\n`, false)

        return null;
    }
}



export default WinGameStoreScraper;