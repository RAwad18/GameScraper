import * as fs from 'fs';
import * as cheerio from 'cheerio';
import { Scrape_Logger } from '../logs/logger_functions.js';

async function TwoGameScraper() {

    const site = "TWOGAME";

    // selectors for scraping
    const selectorAll = 'li.product-card';
    const title = 'div.product-image-details h2 a';
    const img = 'div.product-image a img';
    const href = 'div.product-image a';
    const listPrice = 'div.product-image-details div.price-box p.special-price span.price';

    // keeps track of the number of games scraped
    let count = 0;

    // Logging the Start of the Scraping 
    Scrape_Logger(`\t[${new Date().toUTCString()}] ---- SCRAPING "${site}"`, false);

    try {

        // Creates/Overwrites the csv --- sets the column field names
        fs.writeFile("./data/twogame.csv", "title\tprice\timage\tlink\n", err => {
            if (err) {
                throw err;
            }
        });

        // Scrapes All Games - Ends when the page requested doesn't match the number of pages available
        let i = 1;
        // While true loop omg don't freak out!!!!!
        while (true) {

            let response = await fetch(`https://2game.com/us/pc-games?limit=91&mode=grid&p=${i}&isLayerAjax=1`);
            response = await response.text();
            const $ = cheerio.load(response);

            const pageNum = parseInt($('div.pages ol li.current').first().text());

            if (pageNum !== i || pageNum < i)
                break;

            $('body').find(selectorAll)
                .each(function () {

                    const gameTitle = $(this).find(title).text()
                    let price = $(this).find(listPrice).text().replace(/[^\d.-]+/g, '')
                    const image = $(this).find(img).attr("src")
                    const link = href === null ? $(this).attr('href') : $(this).find(href).attr('href')

                    price = price.length > 0 ? `$${price}` : price
                    count++;

                    fs.writeFile("./data/twogame.csv", `${gameTitle}\t${price || 'NULL'}\t${image}\t${link}\n`, { flag: 'a+' }, err => {
                        if (err) {
                            throw err;
                        }
                    });

                })

            console.log(`\t${count} games scraped.`)
            // DO NOT FRIGGIN DIPPIDDY REMOVE
            i++;

        }

        Scrape_Logger(`\t[${new Date().toUTCString()}] ---- SUCCESS! ---- ${count} GAMES SCRAPED.\n`, false)

        return site.toLowerCase();

    } catch (error) {

        Scrape_Logger(`\n\t${error.stack}\n`, false);
        Scrape_Logger(`\t[${new Date().toUTCString()}] ---- ${site} SCRAPING FAILED ---- ${count} GAMES SCRAPED.\n`, false)
        
        return null;

    }

}



export default TwoGameScraper;