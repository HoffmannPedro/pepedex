import React from 'react';
import '../styles/SearchBar.css';

export default function SearchBar({ searchTerm, onSearchChange, onSearchClick, disabled }) {

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            onSearchClick();
        }
    }

    return (
        <div className='search-container'>
            <input
                className='search-input'
                type="text"
                disabled={disabled}
                value={searchTerm}
                onChange={e => onSearchChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder='Name or ID'
            />
            <button
                className='search-button'
                onClick={onSearchClick}
                disabled={disabled}
            >
                Search
            </button>

        </div>
    )
}
