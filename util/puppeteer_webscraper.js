import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth"
import AdblockerPlugin from "puppeteer-extra-plugin-adblocker"

// Reusable function for scraping - write once, use forever - or however it goes
// This will return up to 5 results - and it returns the game's title, price, image, and link to actually buy it
const puppeteerScraper = async (url, selectorAll, title, img, href, listPrice) => {

    let results;

    // These plugins let us
    //      1. not be stopped by security (epic games hates scrapers/bots)
    //      2. no ads = less bandwidth = more speed
    puppeteer.use(StealthPlugin())              
    puppeteer.use(AdblockerPlugin({ blockTrackers: true }))
    
    const browser = await puppeteer.launch({ headless: 'new' })

    try {
        const page = await browser.newPage()
        await page.goto(url, {waitForSelector: selectorAll, timeout: 10000})
        // await page.waitForSelector(selectorAll);

        results = await page.evaluate((selectorAll, title, img, href, listPrice) => {
            const videoGames = Array.from(document.querySelectorAll(selectorAll)).slice(0, 5).map(game => {
                let name, image, link, price;
                try {
                    name = game.querySelector(title).innerText
                    image = game.querySelector(img).src
                    link = game.querySelector(href).href
                    price = game.querySelector(listPrice).innerText
                } catch (error) {
                    // console.error(error)
                }
                return { name, image, link, price }
            })

            return videoGames;
        }, selectorAll, title, img, href, listPrice)

    } catch (error) {
        console.log(error)
    }
    finally {
        await browser.close();
        // For debugging
        console.log(results)
        return results;
    }
}

export default puppeteerScraper;