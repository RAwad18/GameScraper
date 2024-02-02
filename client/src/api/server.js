// This is where are the functions that make calls to the backend are defined
import axios from 'axios'

const instance = axios.create({
    baseURL: "https://gamescraper.ddns.net:8080/api/search",
    timeout: 10000,
})

export const getGames = (query) => instance.get('/', {params: {q: query}})