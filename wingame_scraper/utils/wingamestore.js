import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import AdblockerPlugin from 'puppeteer-extra-plugin-adblocker';
import * as fs from 'fs';


async function WinGameStoreScraper() {

    puppeteer.use(StealthPlugin());
    puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

    const url = "https://www.wingamestore.com/genres"

    const browser = await puppeteer.launch({ headless: "new" });
    let count = 0;

    try {

        // Creates/Overwrites the csv --- sets the column field names
        fs.writeFile("./data/wingamestore.csv", "title\tprice\timage\tlink\n", err => {
            if (err) {
                throw err;
            }
        });

        const page = await browser.newPage();
        await page.goto(url);

        const categories = await page.evaluate(() => {

            const CategoryBoxes = document.querySelectorAll('a.overclick');

            return Array.from(CategoryBoxes).map((Box) => {
                const linkToCategory = Box.href;
                return linkToCategory
            })

        })

        const SetOfGames = new Set();

        for (let category of categories) {

            await page.goto(`${category}?page=1&orderby=title&filters=date-0,rating-0,price-0`)

            let lastPageNumber;

            try {
                lastPageNumber = await page.evaluate(() => {

                    const thumblinks = document.querySelectorAll('div.thumblinks')

                    const pages = thumblinks[thumblinks.length - 1].querySelectorAll('a.thumblink')

                    return parseInt(pages[pages.length - 1].innerText);

                })
            } catch (error) {
                lastPageNumber = 1;
            }


            for (let i = 1; i <= lastPageNumber; i++) {

                await page.goto(`${category}?page=${i}&orderby=title&filters=date-0,rating-0,price-0`);

                const GamesOnPage = await page.evaluate(() => {

                    const allGamesOnPage = Array.from(document.querySelectorAll('tr.result-row'));

                    return Array.from(allGamesOnPage).map((game) => {
                        const title = game.querySelector('td.detail a.atitle').innerText;
                        const price = game.querySelector('td.cost .price').innerText;
                        const link = game.querySelector('td.detail a.atitle').href;
                        const image = game.querySelector('td.box.valign-t a.boxhole img').src;
                        return { title, price, link, image };
                    })

                })

                for (let game of GamesOnPage) {
                    if (SetOfGames.has(game.title))
                        continue;

                    SetOfGames.add(game.title);
                    fs.writeFile("./data/wingamestore.csv", `${game.title}\t${game.price || 'NULL'}\t${game.image}\t${game.link}\n`, { flag: 'a+' }, err => {
                        if (err) {
                            throw err;
                        }
                    });
                    count++;
                }

                console.log(`\t${count} games scraped.`);

            }

            console.log("\n\tCategory Changed!\n");

        }

        return true;

    } catch (error) {
        console.log(error);
        return false;
    }
    finally {
        await browser.close();
    }

}

export default WinGameStoreScraper;