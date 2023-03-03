import React from 'react';
import classes from "./Modal.module.css";
import Rating from "../Rating";


const Modal = ({children, visible, setVisible, game}) => {

    const rootClasses = [classes.modal]
    if (visible) {
        rootClasses.push(classes.active)
    }

    if (!game)
        return ''

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={classes.modalContent}>
                <img src={game.background_image} alt=""/>
                <h2>{game.name}</h2>
                {game.platforms.map(platform => (
                    <span className="platform" key={platform.platform.name}>{platform.platform.name}</span>

                ))}
                <div className="ratings">
                    {game.ratings.sort((a, b) => b.id - a.id).map(rating =>
                        <Rating rating={rating}/>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal;