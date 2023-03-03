import './App.css';
import {useEffect, useState} from "react";
import Modal from "./components/UI/Modal/Modal";
import Card from "./components/Card";
import Loader from "./components/UI/Loader/Loader";

function App() {
    const [games, setGames] = useState([])
    const [game, setGame] = useState(null)
    const [screenshots, setScreenshots] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [modal, setModal] = useState(false)
    const [nextLink, setNextLink] = useState(null)
    const [prevLink, setPrevLink] = useState(null)

    const fetchGames = async (url) => {
        setIsLoading(true)
        const response = await fetch(url)
        const data = await response.json()
        if (data.next) {
            setNextLink(prev => data.next)
        }

        if (data.previous) {
            setPrevLink(prev => data.previous)
        }
        setGames(data.results)
        setIsLoading(false)
    }


    const fetchScreenshots = async (gameId) => {
        // https://api.rawg.io/api/games/{game_pk}/screenshots
        const response = await fetch(`https://api.rawg.io/api/games/${gameId}/screenshots?key=8501e887edbc4977af367e387e02e21a`)
        const data = await response.json()

        return data
    }


    const fetchGame = async (gameId) => {
        const response = await fetch(`https://api.rawg.io/api/games/${gameId}?key=8501e887edbc4977af367e387e02e21a`)
        const data = await response.json()
        setGame(data)
        const pics = await fetchScreenshots(data.id)
        setScreenshots(pics.results)
        setModal(true)
    }

    const prevPage = async () => {
        await fetchGames(prevLink)

    }

    const nextPage = async () => {
        await fetchGames(nextLink)
    }


    useEffect(() => {
        fetchGames('https://api.rawg.io/api/games?key=8501e887edbc4977af367e387e02e21a&page_size=40')
    }, [])

    return (
        <div className="container">
            {game && <Modal visible={modal} setVisible={setModal} game={game} screenshots={screenshots}/>}
            {isLoading
                ? <Loader/>
                : <div className="cards">
                    {games.map(game => (
                        <Card key={game.id} game={game} fetchGame={fetchGame}/>
                    ))}
                </div>
            }
            <div className="navigation">
                {prevLink && <button onClick={prevPage}>previous page</button>}
                {nextLink && <button onClick={nextPage}>next page ></button>}
            </div>
        </div>
    );
}

export default App;
