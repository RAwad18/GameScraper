/* IMPORTS */
// Dependencies
import { useEffect, useState } from "react"
import { useLoaderData, redirect } from "react-router-dom"
import { getGames } from "../api/api"

// Components
import ErrorMessage from "./results-page/error-message"
import { GameBillet, GamersGate, Steam, WinGameStore } from "./results-page/website-sections"
import ResultsPageHeader from "../components/results-page/header"
import Footer from "./footer"





/* CODE */

// This function is called everytime a 'submit' is done within react-router-dom's <Form> element
// Basically everytime the user submits something to search
// It's main function is really to just change the URL on the client's side
export async function action({ request, params }) {
    const formData = await request.formData()
    const { query } = Object.fromEntries(formData)
    return redirect(`/search?q=${query}`)
}





// This function is called by react-router-dom before it renders the <ResultsPage> component
// This will block anything from happening, that's why I kept the code in here to a minimum.
// All this does is return the search query, which can then be accessed in our <ResultsPage> component via 'useLoaderData()'
export async function loader({ request }) {
    const url = new URL(request.url)
    const query = url.searchParams.get("q")
    return query
}






// This function is called everytime the "query" changes
// It's job is to make a call to the backend and retrieve the data we want
// The parameters contain the query, state, and setState function
// This allows me to write the function outside of the <ResultsPage> component, but also make changes to it's state
async function getData(query, state, setStateFn) {
    // If query is empty, then no need to waste to call the server - confirm that we arent waiting for a response and return the previous results
    if (query === "") {
        setStateFn({
            ...state,
            isLoading: false
        })
        return null
    }

    // Once data is retrieved from the server, set the data as the results and confirm that the request is finished
    let gamesPayload;
    let hasError = false;
    let errorDetails = {};
    try {
        const { data } = await getGames(query);
        gamesPayload = data;
    } catch (e) {
        // Debugging
        console.error(e)

        hasError = true
        errorDetails = {
            code: e.code,
            message: e.message
        }
        gamesPayload = {
            steam: [],
            gamebillet: [],
            wingamestore: [],
            gamersgate: []
        }
    }
    finally {
        setStateFn({
            hasError: hasError,
            errorDetails: errorDetails,
            isLoading: false,
            results: gamesPayload
        })
    }


    // For Testing
    // const data = {
    //     steam: [
    //         {
    //             title: 'ELDEN RING',
    //             price: '$59.99',
    //             image: 'https://cdn.akamai.steamstatic.com/steam/apps/1245620/capsule_sm_120.jpg?t=1683618443',
    //             link: 'https://store.steampowered.com/app/1245620/ELDEN_RING/?snr=1_7_7_151_150_1'
    //         },
    //         {
    //             title: 'ARMORED CORE™ VI FIRES OF RUBICON™',
    //             price: '$59.99',
    //             image: 'https://cdn.akamai.steamstatic.com/steam/apps/1888160/capsule_sm_120.jpg?t=1696573287',
    //             link: 'https://store.steampowered.com/app/1888160/ARMORED_CORE_VI_FIRES_OF_RUBICON/?snr=1_7_7_151_150_1'
    //         },
    //         {
    //             title: 'DARK SOULS™ III',
    //             price: '$59.99',
    //             image: 'https://cdn.akamai.steamstatic.com/steam/apps/374320/capsule_sm_120.jpg?t=1682651227',
    //             link: 'https://store.steampowered.com/app/374320/DARK_SOULS_III/?snr=1_7_7_151_150_1'
    //         },
    //         {
    //             title: 'Perfect New World',
    //             price: 'Free',
    //             image: 'https://cdn.akamai.steamstatic.com/steam/apps/2359600/capsule_sm_120.jpg?t=1698377718',
    //             link: 'https://store.steampowered.com/app/2359600/Perfect_New_World/?snr=1_7_7_151_150_1'
    //         },
    //         {
    //             title: 'Voidborn',
    //             price: '$12.99',
    //             image: 'https://cdn.akamai.steamstatic.com/steam/apps/2072660/capsule_sm_120.jpg?t=1692399254',
    //             link: 'https://store.steampowered.com/app/2072660/Voidborn/?snr=1_7_7_151_150_1'
    //         }
    //     ],
    //     gamebillet: [
    //         {
    //             title: 'Elden Ring',
    //             price: '$52.67',
    //             image: 'https://s3-eu-west-1.amazonaws.com/gb.awsbucket.1/0121162_0.jpeg',
    //             link: 'https://www.gamebillet.com/elden-ring'
    //         },
    //         {
    //             title: 'Elden Ring Deluxe Edition',
    //             price: '$65.95',
    //             image: 'https://s3-eu-west-1.amazonaws.com/gb.awsbucket.1/0121159_0.jpeg',
    //             link: 'https://www.gamebillet.com/elden-ring-deluxe-edition'
    //         }
    //     ],
    //     wingamestore: [
    //         {
    //             title: 'ELDEN RING',
    //             price: '$54.99',
    //             image: 'https://www.wingamestore.com/images_boxshots/240x135/elden-ring-1636044327.png',
    //             link: 'https://www.wingamestore.com/product/13045/ELDEN-RING/'
    //         },
    //         {
    //             title: 'ELDEN RING Deluxe Edition',
    //             price: '$73.99',
    //             image: 'https://www.wingamestore.com/images_boxshots/240x135/elden-ring-deluxe-edition-1636051659.png',
    //             link: 'https://www.wingamestore.com/product/13046/ELDEN-RING-Deluxe-Edition/'
    //         }
    //     ],
    //     gamersgate: [
    //         {
    //             title: 'ELDEN RING',
    //             price: '$59.99',
    //             image: 'https://gamersgatep.imgix.net/d/1/2/e13ee5295fdfc5167d47d7da2b1f53138555521d.jpg?auto=format&w=310',
    //             link: 'https://www.gamersgate.com/product/elden-ring/'
    //         },
    //         {
    //             title: 'ELDEN RING Deluxe Edition',
    //             price: '$79.99',
    //             image: 'https://gamersgatep.imgix.net/d/d/6/af515ad153129a714a860b13071560e6b41216dd.jpg?auto=format&w=310',
    //             link: 'https://www.gamersgate.com/product/elden-ring-deluxe-edition/'
    //         }
    //     ]
    // }


    // setStateFn({
    //     isLoading: true,
    //     results: data
    // })
}





// BIG BOY COMPONENT
const ResultsPage = () => {

    // Default state values
    const [state, setState] = useState({
        hasError: false,
        errorDetails: {},
        isLoading: false,
        results: {
            steam: [],
            gamebillet: [],
            wingamestore: [],
            gamersgate: []
        }
    })

    // Retrieves the 'query' - what we search for
    const query = useLoaderData()

    // Everytime the query changes (and only when the query changes), call the following functions
    // Sets isLoading to true first so that we can display "loading" components (for UI/UX style points)
    useEffect(() => {
        setState({ ...state, hasError: false, isLoading: true })
        getData(query, state, setState)
    }, [query])

    return (
        <>
            <header className="header results-page-header">
                <ResultsPageHeader query={query} />
            </header>
            <main className="results-container">
                <div className="results">
                    {state.hasError ?
                        <ErrorMessage errorDetails={state.errorDetails} />
                        : null
                    }
                    <Steam state={state} />
                    <GameBillet state={state} />
                    <WinGameStore state={state} />
                    <GamersGate state={state} />
                </div>
            </main>
            <footer className="footer footer-results-page">
                <Footer />
            </footer>
        </>
    )
}

export default ResultsPage