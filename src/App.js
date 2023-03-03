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

    const fetchGames = async () => {
        setIsLoading(true)
        const response = await fetch('https://api.rawg.io/api/games?key=8501e887edbc4977af367e387e02e21a&page_size=40')
        const data = await response.json()
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


    useEffect(() => {
        fetchGames()
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
        </div>
    );
}

export default App;
