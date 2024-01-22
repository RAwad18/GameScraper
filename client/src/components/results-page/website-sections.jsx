import { Tooltip } from 'react-tooltip'
import LoadingComponent from "./loading"
import { useState } from 'react'

// Function that tracks mouse movement, set mouse to be 'inactive' after 50ms
function setMouseMove(e, setStateFn) {
    e.preventDefault();
    setStateFn(true);

    let timeout;
    (() => {
        clearTimeout(timeout);
        timeout = setTimeout(() => setStateFn(false), 1000);
    })();
}

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

        <div className="website-games" >
            {state.results[website].map((game) => (
                <a href={game.Link} target="_blank" key={game.Id} className="game-container" data-tooltip-id='my-tooltip' data-tooltip-content={game.Title} data-tooltip-place="top">
                    <Tooltip id="my-tooltip" style={{backgroundColor: 'var(--clr-sky50)', color: 'var(--clr-slate950)'}} delayShow={50}/>
                    <img className="game-image" src={game.Image} alt="PIC NO WORKY" />

                    <span className="game-title">
                        {game.Title}
                    </span>

                    <span className="game-price">
                        {game.Price !== 'NULL' ? game.Price : <div className="no-price">
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
export const TwoGame = ({ state }) => {
    return (
        <section className="website-section twogame">
            <h3 className="website-title">2Game</h3>
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

export const GameBillet = ({ state }) => {
    return (
        <section className="website-section gamebillet">
            <h3 className="website-title">GameBillet</h3>
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

export const GamersGate = ({ state }) => {
    return (
        <section className="website-section gamersgate">
            <h3 className="website-title">GamersGate</h3>
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

export const GamesPlanet = ({ state }) => {
    return (
        <section className="website-section gamesplanet">
            <h3 className="website-title">GamesPlanet</h3>
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

export const Steam = ({ state }) => {
    return (
        <section className="website-section steam">
            <h3 className="website-title">Steam</h3>
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

export const WinGameStore = ({ state }) => {
    return (
        <section className="website-section wingamestore">
            <h3 className="website-title">WinGameStore</h3>
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