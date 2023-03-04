import React from 'react';

const Pagination = ({prevLink, nextLink, prevPage, nextPage}) => {
    return (
        <div className="navigation">
            {prevLink !== null
                ? <button onClick={prevPage}>&laquo; Previous</button>
                : <button disabled>&laquo; Previous</button>
            }
            {nextLink !== null
                ? <button onClick={nextPage}>Next &raquo;</button>
                : <button disabled>Next &raquo;</button>
            }
        </div>
    );
};

export default Pagination;