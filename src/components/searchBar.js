import React from "react";

const SearchBar = ({placeholder, onTextChange, onSearchSubmit}) => {
    return (
        <div className='block search-bar'>
            <input className='search' type="text" placeholder={placeholder || 'Search...'} onChange={({target}) => {onTextChange(target.value)}}/>
            <i className='fa fa-search submit' onClick={onSearchSubmit}></i>
        </div>
    );
}

export default SearchBar;