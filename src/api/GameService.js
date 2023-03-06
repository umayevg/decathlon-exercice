import axios from "axios";

export default class GameService {

    static async getAll(options = {}) {
        let url = `https://api.rawg.io/api/games?key=${process.env.REACT_APP_API_KEY}&page_size=28`

        if (options.url !== undefined) {
            url = options.url
        }
        const response = await axios.get(url, {
            params: {
                search: options.searchString,
                ordering: options.filter,
                search_precise: true,
                search_exact: true
            }
        })
        const data = await response.data
        console.log(data)
        const next = data.next
        const previous = data.previous

        return [data.results, previous, next];
    }

    static async getById(gameId) {
        return await fetch(`https://api.rawg.io/api/games/${gameId}?key=${process.env.REACT_APP_API_KEY}`);
    }


    static async getScreenshotsByGameId(gameId) {
        return await fetch(`https://api.rawg.io/api/games/${gameId}/screenshots?key=${process.env.REACT_APP_API_KEY}`);
    }
}