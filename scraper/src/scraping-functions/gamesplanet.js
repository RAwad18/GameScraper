import * as fs from 'fs';
import * as cheerio from 'cheerio';
import { Scrape_Logger } from '../logs/logger_functions.js';

async function GamesPlanetScraper() {

    const site = "GAMESPLANET";

    // selectors for scraping
    const selectorAll = 'div.row.game_list';
    const title = 'h4.pt-1.mb-1';
    const img = 'div.col-4.pl-0 img.border.border-secondary';
    const href = 'h4.pt-1.mb-1 a.d-block';
    const listPrice = 'div.gp-prices span.prices span.price_current';

    // keeps track of the number of games scraped
    let count = 0;

    // Logging the Start of the Scraping 
    Scrape_Logger(`\t[${new Date().toUTCString()}] ---- SCRAPING "${site}"`, false);

    try {

        // retrieving total number of items (i.e Find out when we should end the for loop)
        let response = await fetch("https://us.gamesplanet.com/search?d=asc&page=1&s=name");
        response = await response.text();
        const $ = cheerio.load(response);
        const total = parseInt(
            $('body').find("ul.pagination li:nth-last-child(2)").find("a").text()
        );

        // Creates/Overwrites the csv --- sets the column field names
        fs.writeFile("./data/gamesplanet.csv", "title\tprice\timage\tlink\n", err => {
            if (err) {
                throw err;
            }
        });

        // SCRAPES ALL GAMES
        for (let i = 1; i <= total; i++) {

            let response = await fetch(`https://us.gamesplanet.com/search?d=asc&page=${i}&s=name`);
            response = await response.text();
            const $ = cheerio.load(response);

            $('body').find(selectorAll)
                .each(function () {

                    const gameTitle = $(this).find(title).text()
                    const price = $(this).find(listPrice).text()
                    const image = $(this).find(img).attr("src")
                    let link = href === null ? $(this).attr('href') : $(this).find(href).attr('href')

                    link = "https://us.gamesplanet.com" + link

                    count++;

                    fs.writeFile("./data/gamesplanet.csv", `${gameTitle}\t${price || 'NULL'}\t${image}\t${link}\n`, { flag: 'a+' }, err => {
                        if (err) {
                            throw err;
                        }
                    });
                })

            console.log(`\t${count} games scraped.`)
        }

        Scrape_Logger(`\t[${new Date().toUTCString()}] ---- SUCCESS! ---- ${count} GAMES SCRAPED.\n`, false)

        return site.toLowerCase();

    } catch (error) {

        Scrape_Logger(`\n\t${error.stack}\n`, false);
        Scrape_Logger(`\t[${new Date().toUTCString()}] ---- ${site} SCRAPING FAILED ---- ${count} GAMES SCRAPED.\n`, false)

        return null;
    }
}



export default GamesPlanetScraper;