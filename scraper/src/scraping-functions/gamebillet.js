import * as fs from 'fs';
import * as cheerio from 'cheerio';
import { Scrape_Logger } from '../logs/logger_functions.js';

async function GameBilletScraper() {

    const site = "GAMEBILLET";

    // selectors for scraping
    const selectorAll = '.row .grid-row-items .grid-item'
    const title = 'h3 a'
    const img = 'img'
    const href = 'h3 a'
    const listPrice = '.buy-wrapper span'

    // keeps track of the number of games scraped
    let count = 0;

    // Logging the Start of the Scraping 
    Scrape_Logger(`\t[${new Date().toUTCString()}] ---- SCRAPING "${site}"`, false);

    try {

        // retrieving total number of items (i.e Find out when we should end the for loop)
        let response = await fetch("https://www.gamebillet.com/allproducts?orderby=5&pagenumber=1");
        response = await response.text();
        const $ = cheerio.load(response);
        const total = parseInt($('body').find(".total-pages").text().slice(-3));

        // Creates/Overwrites the csv --- sets the column field names
        fs.writeFile("./data/gamebillet.csv", "title\tprice\timage\tlink\n", err => {
            if (err) {
                throw err;
            }
        });

        // For-Loop, scrapes all games
        for (let i = 1; i <= total; i++) {
            let response = await fetch(`https://www.gamebillet.com/allproducts?orderby=5&pagenumber=${i}`)

            response = await response.text();
            const $ = cheerio.load(response);

            $('body').find(selectorAll)
                .each(function () {

                    const gameTitle = $(this).find(title).text()
                    const price = $(this).find(listPrice).text()
                    const image = $(this).find(img).attr("src")
                    let link = href === null ? $(this).attr('href') : $(this).find(href).attr('href')

                    link = "https://www.gamebillet.com" + link

                    count++;

                    fs.writeFile("./data/gamebillet.csv", `${gameTitle}\t${price || 'NULL'}\t${image}\t${link}\n`, { flag: 'a+' }, err => {
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


export default GameBilletScraper;