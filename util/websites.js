import cheerioScraper from "./cheerio_webscraper.js"
import puppeteerScraper from "./puppeteer_webscraper.js"

export const scrapGamebillet = async (game) => {

    // Turning user input into valid url query
    let query = game.replaceAll(" ", "+")
    const url = `https://www.gamebillet.com/search?q=${query}`

    // Variables for scrapping
    const selectorAll = '.row .grid-row-items .grid-item'
    const title = 'h3 a'
    const img = 'img'
    const href = 'h3 a'
    const listPrice = '.buy-wrapper span'

    // Calling scraper function
    const results = await cheerioScraper(url, selectorAll, title, img, href, listPrice)

    results.map(ggGame => ggGame.link = `https://www.gamebillet.com${ggGame.link}`)

    // Debugging
    // console.log(results)
    return results;
}

export const scrapWinGameStore = async (game) => {

    // Turning user input into valid url query
    let query = game.replaceAll(" ", "+")
    const url = `https://www.wingamestore.com/search/?SearchWord=${query}`

    // Variables for scrapping
    const selectorAll = 'tbody.boxoom .result-row'
    const title = '.atitle'
    const img = 'a.boxhole.img16x9 img'
    const href = '.atitle'
    const listPrice = '.price'

    // Calling scraper function
    const results = await cheerioScraper(url, selectorAll, title, img, href, listPrice)

    results.map(ggGame => ggGame.image = `https://www.wingamestore.com${ggGame.image}`)

    return results;

}

export const scrapGamersGate = async (game) => {

    // Turning user input into valid url query
    let query = game.replaceAll(" ", "+")
    const url = `https://www.gamersgate.com/games/?query=${query}`

    // Variables for scrapping
    const selectorAll = 'div.column.catalog-item'
    const title = 'div.catalog-item--title a'
    const img = 'div.catalog-item--image img'
    const href = 'div.catalog-item--title a'
    const listPrice = 'div.catalog-item--price span'

    // Calling scraper function
    const results = await cheerioScraper(url, selectorAll, title, img, href, listPrice)

    results.map(ggGame => {
        ggGame.price = ggGame.price.replace(/ /g, "")
        ggGame.link = `https://www.gamersgate.com${ggGame.link}`
    })

    // Debugging
    // console.log(results)
    return results;

}

export const scrapSteam = async (game) => {

    // Turning user input into valid url query
    let query = game.replaceAll(" ", "+")
    const url = `https://store.steampowered.com/search/?term=${query}`

    // Variables for scrapping
    const selectorAll = '.search_result_row';
    const title = '.title';
    const img = 'img';
    const href = null;
    const listPrice = '.discount_final_price';

    // Calling scraper function
    const results = await cheerioScraper(url, selectorAll, title, img, href, listPrice)

    return results;
}

/* NO LONGER IN USE */
// export const scrapEpicGames = async (game) => {

//     // Turning user input into valid url query
//     let query = game.replaceAll(" ", "%20")
//     const url = `https://store.epicgames.com/en-US/browse?q=${query}&sortBy=relevancy&sortDir=DESC&category=Game&count=40&start=0`

//     // Variables for scrapping
//     const selectorAll = 'li.css-lrwy1y';
//     const title = 'div.css-rgqwpc';
//     const img = 'div.css-uwwqev img';
//     const href = 'a.css-g3jcms';
//     const listPrice = 'span.css-119zqif';

//     // Calling scraper function
//     const results = await puppeteerScraper(url, selectorAll, title, img, href, listPrice)

//     return results;
// }