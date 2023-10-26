import { useState } from "react"
import { Form, Link } from "react-router-dom"


// Changes state to show the 'clear' button icon - only if there's something within the search bar 
function toggleXIcon(event, setStateFn) {
    if (event.target.value === "")
        setStateFn(false)
    else
        setStateFn(true)
}


const Header = () => {

    // Component State that will either show or hide the .search-clear class
    const [showXIcon, setShowXIcon] = useState(false)



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

                    <input autoComplete="off" type="text" name="query" className="search-bar" placeholder="Search" onChange={(e) => toggleXIcon(e, setShowXIcon)} onFocus={() => { toggleSearchUnderline(setShowSearchUnderline, true) }} onBlur={() => { toggleSearchUnderline(setShowSearchUnderline, false) }} />


                    <button type="reset" className={`search-clear ${!showXIcon ? 'hidden-but-present' : ''}`}
                        onClick={() => { setShowXIcon(false); }}>
                        <img src="/x-icon.svg" alt="clear search button" />
                    </button>



                </div>
            </Form>
        </nav>
    )
}

export default Header