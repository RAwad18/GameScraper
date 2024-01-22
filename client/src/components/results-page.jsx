/* IMPORTS */
// Dependencies
import { useEffect, useState } from "react"
import { useLoaderData, redirect } from "react-router-dom"
import { getGames } from "../api/server"

// Components
import ErrorMessage from "./results-page/error-message"
import { GameBillet, GamersGate, Steam, WinGameStore, TwoGame, GamesPlanet } from "./results-page/website-sections"
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

        console.log(state.results)

        gamesPayload = state.results
    }
    finally {
        setStateFn({
            hasError: hasError,
            errorDetails: errorDetails,
            isLoading: false,
            results: gamesPayload
        })
    }
}





// BIG BOY COMPONENT
const ResultsPage = () => {

    // Default state values
    const [state, setState] = useState({
        hasError: false,
        errorDetails: {},
        isLoading: false,
        results: {
            twogame: [],
            gamebillet: [],
            gamersgate: [],
            gamesplanet: [],
            steam: [],
            wingamestore: [],
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

    // console.log(state.results)

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
                    <div className="results-grid">
                        <Steam state={state} />
                        <GameBillet state={state} />
                        <WinGameStore state={state} />
                        <GamersGate state={state} />
                        <TwoGame state={state} />
                        <GamesPlanet state={state} />
                    </div>
                </div>
            </main>
            <footer className="footer footer-results-page">
                <Footer />
            </footer>
        </>
    )
}

export default ResultsPage