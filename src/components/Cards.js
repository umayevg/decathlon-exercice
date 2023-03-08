import {useEffect, useState} from 'react';
import Card from "./Card";
import classes from './Cards.module.css'
import Loader from './UI/Loader/Loader';
import Pagination from './UI/Pagination/Pagination';
import Modal from "./UI/Modal/Modal";
import GameService from "../api/GameService";
import Form from "./UI/Form/Form";

const Cards = () => {
    const [games, setGames] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [modal, setModal] = useState({visible: false, game: null, screenshots: null})
    const [links, setLinks] = useState({prevLink: null, nextLink: null})

    const fetchGames = async (options) => {
        setIsLoading(true)
        const [results, previous, next] = await GameService.getAll(options)
        setLinks(prevState => {
            return {prevState, prevLink: previous, nextLink: next}
        })
        setGames(results)
        setIsLoading(false)
    }


    const onCardClickHandler = async (game) => {
        const gameScreenshots = await GameService.getScreenshotsByGameId(game.id)
        setModal({visible: true, game: game, screenshots: gameScreenshots})
    }

    useEffect(() => {
        fetchGames()
    }, [])

    return (
        <>
            {modal.game && <Modal visible={modal} setVisible={setModal}/>}

            <Form fetchFun={fetchGames}/>

            {isLoading
                ? <Loader title="Loading..."/>
                : <div className={classes.cards}>
                    {games.map(game => (
                        <Card key={game.id} game={game} cardClickFunc={onCardClickHandler}/>
                    ))}
                </div>
            }

            {!isLoading && links.nextLink !== null && (
                <Pagination prev={links.prevLink} next={links.nextLink} fetchFunc={fetchGames}/>
            )}

            {!isLoading && games.length < 1 && (
                <Loader title="No games found."/>
            )}
        </>
    );
};

export default Cards;