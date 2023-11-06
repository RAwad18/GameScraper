import { useState } from "react"
import { Form, Link } from "react-router-dom"


const Header = ({ query }) => {

    // Component State that will either show or hide the .search-clear class

    const [searchQuery, setSearchQuery] = useState(query)

    const [showXIcon, setShowXIcon] = useState(searchQuery === "" ? false : true)

    return (
        <nav className="container header-container">
            <h3 className="header-logo">
                <Link to={`/`} className="link">
                    <span className="header-logo-game">GAME</span>
                    <span className="header-logo-scraper">SCRAPER</span>
                </Link>
            </h3>
            <Form method="post" className="search-section-wrapper">
                <div className="search-section">
                    <img src="/search-icon.svg" alt="search icon" className="search-icon" />

                    <input autoComplete="off" type="text" name="query" className="search-bar" placeholder="Search"
                        value={searchQuery} onChange={(e) => {
                            setSearchQuery(e.target.value);
                        }} />


                    <button type="reset" className={`search-clear ${searchQuery === "" ? 'hidden-but-present' : ''}`}
                        onClick={() => { setShowXIcon(false); setSearchQuery(""); }}>
                        <img src="/x-icon.svg" alt="clear search button" />
                    </button>

                    <button type="submit" className="search-submit">
                        <img src="/search-icon.svg" alt="search icon" />
                    </button>

                </div>
            </Form>
        </nav>
    )
}

export default Header