import { useState } from "react"
import { Form, redirect } from "react-router-dom"
import Footer from "./footer"

export async function action({ request, params }) {
    const formData = await request.formData()
    const { query } = Object.fromEntries(formData)
    return redirect(`/search?q=${query}`)
}

export function xIconHandler(e, setXIcon) {
    if (e.target.value === "")
        setXIcon(false)
    else
        setXIcon(true)
}

const SearchPage = () => {

    const [showXIcon, setShowXIcon] = useState(false)

    return (
        <div className="search-page">
            <main className="search-page-content">

                <h1 className="search-page-header">
                    <span className="header-logo-game">GAME</span>
                    <span className="header-logo-scraper">SCRAPER</span>
                </h1>

                <Form method="post" className="search-page-search-section">

                    <img src="/search-icon2.svg" alt="search icon" className="search-icon" />

                    <input autoComplete="off" type="text" name="query" className="search-bar" placeholder="Search" onChange={(e) => xIconHandler(e, setShowXIcon)} />

                    <button type="reset" className={`search-clear ${!showXIcon ? 'hidden-but-present' : ''}`}
                        onClick={() => { setShowXIcon(false); }}>
                        <img src="/x-icon2.svg" alt="clear search button" />
                    </button>

                    <button type="submit" className="search-button">
                        <img src="/search-icon2.svg" alt="search icon" />
                    </button>
                </Form>

            </main>
        </div>
    )
}

export default SearchPage