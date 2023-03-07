import './App.css';
import {useCallback, useEffect, useState} from "react";
import Modal from "./components/UI/Modal/Modal";
import Loader from "./components/UI/Loader/Loader";
import Pagination from "./components/UI/Pagination/Pagination";
import Cards from "./components/Cards";
import Form from "./components/UI/Form/Form";
import GameService from "./api/GameService";
import Header from "./components/UI/Header/Header";

function App() {
    const [games, setGames] = useState([])
    const [game, setGame] = useState(null)
    const [screenshots, setScreenshots] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [modal, setModal] = useState(false)
    const [nextLink, setNextLink] = useState(null)
    const [prevLink, setPrevLink] = useState(null)


    const fetchGames = async (options) => {
        setIsLoading(true)
        const [results, previous, next] = await GameService.getAll(options)
        setNextLink(prev => next)
        setPrevLink(prev => previous)
        setGames(results)
        setIsLoading(false)
    }


    const fetchScreenshots = useCallback(async (gameId) => {
        // https://api.rawg.io/api/games/{game_pk}/screenshots
        const response = await fetch(`https://api.rawg.io/api/games/${gameId}/screenshots?key=${process.env.REACT_APP_API_KEY}`)
        return await response.json()
    }, [])


    const fetchGame = useCallback(async (gameId) => {
        const response = await fetch(`https://api.rawg.io/api/games/${gameId}?key=${process.env.REACT_APP_API_KEY}`)
        const data = await response.json()
        setGame(data)
        const pics = await fetchScreenshots(data.id)
        setScreenshots(pics.results)
        setModal(true)
    }, [fetchScreenshots])

    const prevPage = async () => {
        await fetchGames({url: prevLink})

    }

    const nextPage = async () => {
        await fetchGames({url: nextLink})
    }


    useEffect(() => {
        fetchGames()
    }, [])


    return (
        <>
            <Header/>
            <div className="container">
                <Form fetchFun={fetchGames}/>

                {game && <Modal visible={modal} setVisible={setModal} game={game} screenshots={screenshots}/>}

                {isLoading
                    ? <Loader title="Loading..."/>
                    : <Cards games={games} fetchGame={fetchGame}/>
                }

                {!isLoading && nextLink !== null && (
                    <Pagination nextLink={nextLink} nextPage={nextPage} prevLink={prevLink} prevPage={prevPage}/>
                )}

                {!isLoading && games.length < 1 && (
                    <Loader title="No games found."/>
                )}
            </div>
        </>
    );
}

export default App;
