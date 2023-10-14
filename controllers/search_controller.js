import * as w from '../util/websites.js'

// Quick test to see if scrapers work
const scrapeQuery = async (req, res) => {

    console.log("We GOT A QUERY BOYS")
    const query = (req.query.q).toLowerCase();

    try {
        // const [steam, gamebillet, epicgames] = await Promise.allSettled([w.scrapSteam(query), w.scrapGamebillet(query), w.scrapEpicGames(query)])

        // res.status(200).json({steam: steam.value, gamebillet: gamebillet.value, epicgames: epicgames.value})


        // const [steam, gamebillet, wingamestore, gamersgate] = await Promise.allSettled([
        //     w.scrapSteam(query), 
        //     w.scrapGamebillet(query), 
        //     w.scrapWinGameStore(query), 
        //     w.scrapGamersGate(query),
        // ])

        // res.status(200).json({
        //     steam: steam.value, 
        //     gamebillet: gamebillet.value, 
        //     wingamestore: wingamestore.value,
        //     gamersgate: gamersgate.value
        // })

        // const gamersgate = await w.scrapGamersGate(query)
        // res.status(200).json(gamersgate)

        const epicgames = await w.scrapEpicGames(query)
        res.status(200).json({epicgames})

    } catch (error) {
        console.log(error)
        res.status(200).send("HIP! HIP! HOORAY! It FAILED! LETS GOOOOOOO!")
    }

}

export default scrapeQuery


