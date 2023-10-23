// This is where are the functions that make calls to the backend are defined
import axios from 'axios'

const url = "http://localhost:8080/search/"

export const getGames = (query) => axios.get(url, {params: {q: query}})