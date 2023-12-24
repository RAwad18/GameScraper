import * as w from '../util/websites.js'

const scrapeQuery = async (req, res) => {

    console.log("We GOT A QUERY BOYS")

    try {
        const query = (req.query.q).toLowerCase();

        const [steam, gamebillet, wingamestore, gamersgate, twogame, gamesplanet] = await Promise.allSettled([
            w.scrapSteam(query),
            w.scrapGamebillet(query),
            w.scrapWinGameStore(query),
            w.scrapGamersGate(query),
            w.scrapTwoGame(query),
            w.scrapGamesPlanet(query)
        ])

        // console.log({
        //     searchUrls: {
        //         steam: steam.value.searchUrl,
        //         gamebillet: gamebillet.value.searchUrl,
        //         wingamestore: wingamestore.value.searchUrl,
        //         gamersgate: gamersgate.value.searchUrl,
        //         twogame: twogame.value.searchUrl,
        //         gamesplanet: gamesplanet.value.searchUrl
        //     },
        //     results: {
        //         steam: steam.value.results,
        //         gamebillet: gamebillet.value.results,
        //         wingamestore: wingamestore.value.results,
        //         gamersgate: gamersgate.value.results,
        //         twogame: twogame.value.results,
        //         gamesplanet: gamesplanet.value.results
        //     }
        // });

        res.status(200).json({
            searchUrls: {
                steam: steam.value.searchUrl,
                gamebillet: gamebillet.value.searchUrl,
                wingamestore: wingamestore.value.searchUrl,
                gamersgate: gamersgate.value.searchUrl,
                twogame: twogame.value.searchUrl,
                gamesplanet: gamesplanet.value.searchUrl
            },
            results: {
                steam: steam.value.results,
                gamebillet: gamebillet.value.results,
                wingamestore: wingamestore.value.results,
                gamersgate: gamersgate.value.results,
                twogame: twogame.value.results,
                gamesplanet: gamesplanet.value.results
            }
        })

    } catch (error) {
        console.log(error)
        res.status(404).send("HIP! HIP! HOORAY! It FAILED! LETS GOOOOOOO!")
    }

}

export default scrapeQuery


