import React from 'react';
import classes from "./Modal.module.css";
import Rating from "../Rating/Rating";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {Carousel} from 'react-responsive-carousel';


const Modal = ({visible, setVisible, game, screenshots}) => {
    const rootClasses = [classes.modal]
    if (visible) {
        rootClasses.push(classes.active)
    }


    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={classes.modalContent} onClick={(e) => e.stopPropagation()}>
                <img src={game.background_image} alt={game.name}/>
                <div className={classes.heading}>
                    <h2>{game.name}</h2>
                    <span>{game.metacritic}</span>
                </div>
                <div className="platform">
                    {game.platforms.map(platform => (
                        <span className={classes.platform} key={platform.platform.name}>{platform.platform.name}</span>

                    ))}
                </div>
                <div className={classes.ratings}>
                    {game.ratings.sort((a, b) => b.id - a.id).map(rating =>
                        <Rating key={rating.title} rating={rating}/>
                    )}
                </div>
                <div className={classes.screenshots}>

                    <Carousel>
                        {screenshots.map(image =>
                            <div key={image.id}>
                                <img src={image.image} loading="lazy" alt="Game screenshot"/>
                            </div>
                        )}
                    </Carousel>
                </div>
            </div>
        </div>
    );
};

export default Modal;