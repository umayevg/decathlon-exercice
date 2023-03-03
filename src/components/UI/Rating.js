import React from 'react';

const Rating = ({rating}) => {

    let starsString = ''

    if (rating.title === 'exceptional') {
        starsString = '&#11088;&#11088;&#11088;&#11088;'
    }
    if (rating.title === 'recommended') {
        starsString = '&#11088;&#11088;&#11088;'
    }

    if (rating.title === 'meh') {
        starsString = '&#11088;&#11088;'
    }

    if (rating.title === 'skip') {
        starsString = '&#11088;'
    }

    return (
        <div className="rating">
            <div dangerouslySetInnerHTML={{__html: starsString}}/>
            <div className="fill">
                <div className="bg" style={{width: rating.percent + '%'}}></div>
            </div>
            <div>{rating.percent}%</div>
        </div>
    )

};

export default Rating;