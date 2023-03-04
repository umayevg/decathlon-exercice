import axios from "axios";

export default class GameService {

    static async getAll(options = {}) {
        let url = `https://api.rawg.io/api/games?key=${process.env.REACT_APP_API_KEY}&page_size=28`

        if (options.url !== undefined) {
            url = options.url
        }
        const response = await axios.get(url, {
            params: {
                search: options.searchString !== undefined ? options.searchString : undefined
            }
        })
        const data = await response.data
        const next = data.next
        const previous = data.previous

        return [data.results, previous, next];
    }

    static async getById(gameId) {
        const response = await fetch(`https://api.rawg.io/api/games/${gameId}?key=${process.env.REACT_APP_API_KEY}`)

        return response;
    }


    static async getScreenshotsByGameId(gameId) {
        const response = await fetch(`https://api.rawg.io/api/games/${gameId}/screenshots?key=${process.env.REACT_APP_API_KEY}`)

        return response;
    }
}