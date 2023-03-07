import React from 'react';
import Card from "./Card";
import classes from './Cards.module.css'

const Cards = React.memo(({games, fetchGame}) => {
    return (
        <div className={classes.cards}>
            {games.map(game => (
                <Card key={game.id} game={game} fetchGame={fetchGame}/>
            ))}
        </div>
    );
});

export default Cards;