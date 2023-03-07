import React, {useRef} from 'react';
import classes from './Form.module.css'

const Form = ({fetchFun}) => {
    const nameInputRef = useRef('')
    const filterInputRef = useRef('')

    const formChangeHandler = (e) => {
        e.preventDefault()
        const searchInputString = nameInputRef.current.value
        const selectedFilter = filterInputRef.current.value
        fetchFun({searchString: searchInputString, filter: selectedFilter})
    }


    function debounce(func, timeout = 300) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(this, args);
            }, timeout);
        };
    }

    const debouncedFormChangeHandler = debounce(formChangeHandler);
    return (
        <>
            <form onChange={debouncedFormChangeHandler}>
                <div className={classes.row}>
                    <input ref={nameInputRef} type="search" placeholder="Search..."/>
                </div>
                <div className={classes.row}>
                    <select ref={filterInputRef}>
                        <option value="">Select sorting</option>
                        <option value="name">Name &uarr;</option>
                        <option value="released">Released date &uarr;</option>
                        <option value="rating">Rating &uarr;</option>
                        <option value="metacritic">Popularity &uarr;</option>
                        <option value="-name">Name &darr;</option>
                        <option value="-released">Released date &darr;</option>
                        <option value="-rating">Rating &darr;</option>
                        <option value="-metacritic">Popularity &darr;</option>
                    </select>
                </div>
            </form>
        </>
    );
};

export default Form;