import webscraper from "./webscraper.js";

export const scrapGamebillet = async (game) => {

    // Turning user input into valid url query
    let query = game.replaceAll(" ", "+")
    const url = `https://www.gamebillet.com/search?q=${query}`

    // Variables for scrapping
    const selectorAll = '.row .grid-row-items .grid-item';
    const title = 'h3 a';
    const img = 'img';
    const href = 'a';
    const listPrice = '.buy-wrapper span';

    // Calling scraper function
    const results = await webscraper(url, selectorAll, title, img, href, listPrice)

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
    const results = await webscraper(url, selectorAll, title, img, href, listPrice)

    return results;
}

export const scrapEpicGames = async (game) => {

    // Turning user input into valid url query
    let query = game.replaceAll(" ", "%20")
    const url = `https://store.epicgames.com/en-US/browse?q=${query}&sortBy=relevancy&sortDir=DESC&category=Game&count=40&start=0`

    // Variables for scrapping
    const selectorAll = 'li.css-lrwy1y';
    const title = 'div.css-rgqwpc';
    const img = 'div.css-uwwqev img';
    const href = 'a.css-g3jcms';
    const listPrice = 'span.css-119zqif';

    // Calling scraper function
    const results = await webscraper(url, selectorAll, title, img, href, listPrice)

    return results;
}