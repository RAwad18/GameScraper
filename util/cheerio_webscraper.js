import * as cheerio from 'cheerio'

const cheerioScraper = async (url, selectorAll, title, img, href, listPrice) => {

    const listOfGames = []
    const response = await fetch(url)
    const $ = cheerio.load(await response.text())

    $('body').find(selectorAll).slice(0, 5)
        .each(function() {

            const game = {}

            game.title = $(this).find(title).text()
            game.price = $(this).find(listPrice).text()
            game.image = $(this).find(img).attr("src")
            game.link = href === null ? $(this).attr('href') : $(this).find(href).attr('href')

            listOfGames.push(game)
            
        })

        // debugging purposes
        // console.log(listOfGames)

        return listOfGames;

}

export default cheerioScraper