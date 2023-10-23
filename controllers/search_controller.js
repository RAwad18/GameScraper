import * as w from '../util/websites.js'

const scrapeQuery = async (req, res) => {

    console.log("We GOT A QUERY BOYS")
    
    try {
        const query = (req.query.q).toLowerCase();

        const [steam, gamebillet, wingamestore, gamersgate] = await Promise.allSettled([
            w.scrapSteam(query),
            w.scrapGamebillet(query),
            w.scrapWinGameStore(query),
            w.scrapGamersGate(query),
        ])

        console.log({
            steam: steam.value,
            gamebillet: gamebillet.value,
            wingamestore: wingamestore.value,
            gamersgate: gamersgate.value
        });

        res.status(200).json({
            steam: steam.value,
            gamebillet: gamebillet.value,
            wingamestore: wingamestore.value,
            gamersgate: gamersgate.value
        })

    } catch (error) {
        console.log(error)
        res.status(200).send("HIP! HIP! HOORAY! It FAILED! LETS GOOOOOOO!")
    }

}

export default scrapeQuery


