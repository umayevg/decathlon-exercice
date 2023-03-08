import classes from './Pagination.module.css'

const Pagination = ({prev, next, fetchFunc}) => {
    const prevPage = async () => {
        await fetchFunc({url: prev})
    }

    const nextPage = async () => {
        await fetchFunc({url: next})
    }
    return (
        <div className={classes.pagination}>
            {prev !== null
                ? <button onClick={prevPage}>&laquo; Previous</button>
                : <button disabled>&laquo; Previous</button>
            }
            {next !== null
                ? <button onClick={nextPage}>Next &raquo;</button>
                : <button disabled>Next &raquo;</button>
            }
        </div>
    );
};

export default Pagination;