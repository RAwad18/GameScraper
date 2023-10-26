/* IMPORTS */
// Dependencies
import { useEffect, useState } from "react"
import { useLoaderData, redirect } from "react-router-dom"
import { getGames } from "../api/api"

// Components
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
    const { data } = await getGames(query);
    setStateFn({
        isLoading: false,
        results: data
    })
}





// BIG BOY COMPONENT
const ResultsPage = () => {

    // Default state values
    const [state, setState] = useState({
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
        setState({ ...state, isLoading: true })
        getData(query, state, setState)
    }, [query])

    return (
        <>
            <header className="header results-page-header">
                <ResultsPageHeader />
            </header>
            <main className="results-section">
                <Steam state={state} />
                <GameBillet state={state} />
                <WinGameStore state={state} />
                <GamersGate state={state} />
            </main>
            <Footer />
        </>
    )
}

export default ResultsPage