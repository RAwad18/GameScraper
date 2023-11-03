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
                        {game.price}
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
            <h3 className="website-title">Steam</h3>
            {state.isLoading
                ? (<i>Loading...</i>)
                : state.results.steam.length === 0
                    ? (<i>No Results</i>)
                    : (
                        GameMapper(state, 'steam')
                    )}
        </section>
    )
}

export const GameBillet = ({ state }) => {
    return (
        <section className="website-section gamebillet">
            <h3 className="website-title">Gamebillet</h3>
            {state.isLoading
                ? (<i>Loading...</i>)
                : state.results.gamebillet.length === 0
                    ? (<i>No Results</i>)
                    : (
                        GameMapper(state, 'gamebillet')
                    )}
        </section>
    )
}

export const WinGameStore = ({ state }) => {
    return (
        <section className="website-section wingamestore">
            <h3 className="website-title">Wingamestore</h3>
            {state.isLoading
                ? (<i>Loading...</i>)
                : state.results.wingamestore.length === 0
                    ? (<i>No Results</i>)
                    : (
                        GameMapper(state, 'wingamestore')
                    )}
        </section>
    )
}

export const GamersGate = ({ state }) => {
    return (
        <section className="website-section gamersgate">
            <h3 className="website-title">Gamersgate</h3>
            {state.isLoading
                ? (<i>Loading...</i>)
                : state.results.gamersgate.length === 0
                    ? (<i>No Results</i>)
                    : (
                        GameMapper(state, 'gamersgate')
                    )}
        </section>
    )
}