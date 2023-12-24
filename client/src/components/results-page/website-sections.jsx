import LoadingComponent from "./loading"

// Function that loads "No Results"
function NoResults() {
    return (
        <div className="no-results">
            <i>No Results</i>
        </div>
    )
}

// Function that loads the data from payload we recieved
function GameMapper(state, website) {
    return (

        <div className="website-games">
            {state.results[website].map((game, i) => (
                <a href={game.link} target="_blank" key={`game${i}`} className="game-container">
                    <img className="game-image" src={game.image} alt="PIC NO WORKY" />

                    <span className="game-title">
                        {game.title}
                    </span>

                    <span className="game-price">
                        {game.price || <div className="no-price">
                            -
                        </div>}
                    </span>

                </a>
            ))
            }
        </div>

    )
}



// All the code for each "section" or website 
// Checks if loading...displays loading icon if true
// Checks if the array for the website 
export const Steam = ({ state }) => {
    return (
        <section className="website-section steam">
            <h3 className="website-title">
                {state.searchUrls.steam === '' ? "Steam"
                    : <a href={state.searchUrls.steam} target="_blank">
                        Steam
                    </a>
                }
            </h3>
            {state.isLoading
                ? (<LoadingComponent />)
                : state.results.steam.length === 0
                    ? (NoResults())
                    : (
                        GameMapper(state, 'steam')
                    )}
        </section>
    )
}

export const GameBillet = ({ state }) => {
    return (
        <section className="website-section gamebillet">
            <h3 className="website-title">
                {state.searchUrls.gamebillet === '' ? "GameBillet"
                    : <a href={state.searchUrls.gamebillet} target="_blank">
                        GameBillet
                    </a>
                }
            </h3>
            {state.isLoading
                ? (<LoadingComponent />)
                : state.results.gamebillet.length === 0
                    ? (NoResults())
                    : (
                        GameMapper(state, 'gamebillet')
                    )}
        </section>
    )
}

export const WinGameStore = ({ state }) => {
    return (
        <section className="website-section wingamestore">
            <h3 className="website-title">
                {state.searchUrls.wingamestore === '' ? "WinGameStore"
                    : <a href={state.searchUrls.wingamestore} target="_blank">
                        WinGameStore
                    </a>
                }
            </h3>
            {state.isLoading
                ? (<LoadingComponent />)
                : state.results.wingamestore.length === 0
                    ? (NoResults())
                    : (
                        GameMapper(state, 'wingamestore')
                    )}
        </section>
    )
}

export const GamersGate = ({ state }) => {
    return (
        <section className="website-section gamersgate">
            <h3 className="website-title">
                {state.searchUrls.gamersgate === '' ? "GamersGate"
                    : <a href={state.searchUrls.gamersgate} target="_blank">
                        GamersGate
                    </a>
                }
            </h3>
            {state.isLoading
                ? (<LoadingComponent />)
                : state.results.gamersgate.length === 0
                    ? (NoResults())
                    : (
                        GameMapper(state, 'gamersgate')
                    )}
        </section>
    )
}

export const TwoGame = ({ state }) => {
    return (
        <section className="website-section twogame">
            <h3 className="website-title">
                {state.searchUrls.twogame === '' ? "2Game"
                    : <a href={state.searchUrls.twogame} target="_blank">
                        2Game
                    </a>
                }
            </h3>
            {state.isLoading
                ? (<LoadingComponent />)
                : state.results.twogame.length === 0
                    ? (NoResults())
                    : (
                        GameMapper(state, 'twogame')
                    )}
        </section>
    )
}

export const GamesPlanet = ({ state }) => {
    return (
        <section className="website-section gamesplanet">
            <h3 className="website-title">
                {state.searchUrls.gamesplanet === '' ? "GamesPlanet"
                    : <a href={state.searchUrls.gamesplanet} target="_blank">
                        GamesPlanet
                    </a>
                }
            </h3>
            {state.isLoading
                ? (<LoadingComponent />)
                : state.results.gamesplanet.length === 0
                    ? (NoResults())
                    : (
                        GameMapper(state, 'gamesplanet')
                    )}
        </section>
    )
}