import * as fs from 'fs';
import * as cheerio from 'cheerio';
import { Scrape_Logger } from '../logs/logger_functions.js';

async function SteamScraper() {

    const site = "STEAM";

    // selectors for scraping
    const selectorAll = '.search_result_row';
    const title = '.title';
    const img = 'img';
    const href = null;
    const listPrice = '.discount_final_price';

    // keeps track of the number of games scraped
    let count = 0;

    // Declaring response and total variables outside of the try-catch
    let total;

    // Logging the Start of the Scraping 
    Scrape_Logger(`\t[${new Date().toUTCString()}] ---- SCRAPING "${site}"`, false);

    try {

        // retrieving total number of items (i.e Find out when we should end the for loop)
        let response = await fetch("https://store.steampowered.com/search/results/?query&start=0&count=50&dynamic_data=&sort_by=Name_ASC&ignore_preferences=1&snr=1_7_7_230_7&category1=998&supportedlang=english&infinite=1");

        response = await response.json();

        total = response.total_count;

        // Creates/Overwrites the csv --- sets the column field names
        fs.writeFile("./data/steam.csv", "title\tprice\timage\tlink\n", err => {
            if (err) {
                throw err;
            }
        });


        // Keeps count of # of retries
        let iFailedOn;
        let retry = 0;

        // For-Loop, scrapes all games
        for (let i = 0; i < total; i += 50) {

            let response = await fetch(`https://store.steampowered.com/search/results/?query&start=${i}&count=50&dynamic_data=&sort_by=Name_ASC&ignore_preferences=1&snr=1_7_7_230_7&category1=998&supportedlang=english&infinite=1`);

            let $;


            // Steam has failed before for mysterious reasons...
            // So we want to limit the number of retries, but only if we're retrying on the same set of games (i.e the value of i)
            // Retries are limited to 5 times per set of games
            try {
                response = await response.json();
                $ = cheerio.load(response.results_html);
                retry = 0;
            } catch (error) {

                if (retry > 4 && i === iFailedOn) throw error;

                Scrape_Logger(`FAILED AT ${count} GAMES SCRAPED. RETRYING...`);
                iFailedOn = i;
                i -= 50;
                retry++;
                continue;
            }

            // Scraping the HTML
            $('body').find(selectorAll)
                .each(function () {

                    const gameTitle = $(this).find(title).text()
                    if (gameTitle === "")
                        return true;   // this is continue, but in JQuery speak

                    const price = $(this).find(listPrice).text()
                    const image = $(this).find(img).attr("src")
                    const link = href === null ? $(this).attr('href') : $(this).find(href).attr('href')

                    count++;

                    fs.writeFile("./data/steam.csv", `${gameTitle}\t${price || 'NULL'}\t${image}\t${link}\n`, { flag: 'a+' }, err => {
                        if (err) {
                            throw err;
                        }
                    });

                })
                console.log(`\t${count} / ${total} games scraped.`)
        }

        Scrape_Logger(`\t[${new Date().toUTCString()}] ---- SUCCESS! ---- ${count} GAMES SCRAPED.\n`, false)

        return site.toLowerCase();

    } catch (error) {

        Scrape_Logger(`\n\t${error.stack}\n`, false);
        Scrape_Logger(`\t[${new Date().toUTCString()}] ---- ${site} SCRAPING FAILED ---- ${count} GAMES SCRAPED.\n`, false)

        return null;
    }
}


export default SteamScraper;