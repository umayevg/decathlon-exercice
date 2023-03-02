import './App.css';
import {useEffect, useState} from "react";
import Modal from "./components/UI/Modal/Modal";
import Card from "./components/Card";

function App() {
    const [games, setGames] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const fetchGames = async () => {
        setIsLoading(true)

        const response = await fetch('https://api.rawg.io/api/games?key=8501e887edbc4977af367e387e02e21a&page_size=30&count=100')

        const data = await response.json()

        console.log(data.results[0])

        setGames(data.results)
        setIsLoading(false)
    }


    const fetchGame = async (gameId) => {

        const response = await fetch(`https://api.rawg.io/api/games/${gameId}?key=8501e887edbc4977af367e387e02e21a`)

        const data = await response.json()

        console.log(data)
    }


    useEffect(() => {
        fetchGames()
    }, [])

    return (
        <div className="App">
            <div className="container">
                {/*<Modal>*/}
                {/*    <h2>Card name</h2>*/}
                {/*</Modal>*/}
                <div className="cards">
                    {games.map(game => (
                        /*
                        <div className="card" key={game.name} onClick={() => fetchGame(game.id)}>
                            <img src={game.background_image} alt="" height="200" loading="lazy" decoding={"async"}
                                 style={{contentVisibility: 'auto'}}/>
                            <div className="card-content">
                                <h3>{game.name}</h3>
                                <div className="platforms">
                                    {game.platforms.map(platform => (
                                        <span key={platform.platform.name}>{platform.platform.name}</span>

                                    ))}
                                </div>
                                <div className="tags">
                                    {game.tags.slice(0, 2).map(tag => (
                                        <span key={tag.name}>{tag.name}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        */
                        <Card key={game.id} game={game} fetchGame={fetchGame}/>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
