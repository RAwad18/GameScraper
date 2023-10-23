// All the code for each "section" or website 
// Checks if loading...displays loading icon if true
// Checks if the array for the website 
export const Steam = ({ state }) => {
    return (
        <section className="steam">
            <h3>Steam</h3>
            {state.isLoading
                ? (<i>Loading...</i>)
                : state.results.steam.length === 0
                    ? (<i>No Results</i>)
                    : (
                        <ul>
                            {
                                state.results.steam.map((game) => (
                                    <li>{game.title}</li>
                                ))
                            }
                        </ul>
                    )}
        </section>
    )
}

export const GameBillet = ({ state }) => {
    return (
        <section className="gamebillet">
            <h3>Gamebillet</h3>
            {state.isLoading
                ? (<i>Loading...</i>)
                : state.results.gamebillet.length === 0
                    ? (<i>No Results</i>)
                    : (
                        <ul>
                            {
                                state.results.gamebillet.map((game) => (
                                    <li>{game.title}</li>
                                ))
                            }
                        </ul>
                    )}
        </section>
    )
}

export const WinGameStore = ({ state }) => {
    return (
        <section className="wingamestore">
            <h3>Wingamestore</h3>
            {state.isLoading
                ? (<i>Loading...</i>)
                : state.results.wingamestore.length === 0
                    ? (<i>No Results</i>)
                    : (
                        <ul>
                            {
                                state.results.wingamestore.map((game) => (
                                    <li>{game.title}</li>
                                ))
                            }
                        </ul>
                    )}
        </section>
    )
}

export const GamersGate = ({ state }) => {
    return (
        <section className="gamersgate">
            <h3>Gamersgate</h3>
            {state.isLoading
                ? (<i>Loading...</i>)
                : state.results.gamersgate.length === 0
                    ? (<i>No Results</i>)
                    : (
                        <ul>
                            {
                                state.results.gamersgate.map((game) => (
                                    <li>{game.title}</li>
                                ))
                            }
                        </ul>
                    )}
        </section>
    )
}