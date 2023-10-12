import * as w from './websites.js'

// Quick test to see if scrapers work
const main = async() => {
    const [steam, epicGames, gamebillet] = await Promise.allSettled([w.scrapSteam("Elden Ring"), w.scrapEpicGames("Elder Scrolls"), w.scrapGamebillet("Elden Ring")])
    
    console.log(steam)
    console.log(epicGames)
    console.log(gamebillet)
}

main()
console.log("100% Legal Scraping has started 😎")


