import React, { useState, useEffect } from 'react';
import IconSearch from '../Icons/IconSearch.jsx';
import './SearchInput.css';

function SearchInput({ search, setSearch }) {
  const [inputValue, setInputValue] = useState(search);
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(e.target.value);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeout = setTimeout(() => {
      setSearch(value);
    }, 2500);

    setDebounceTimeout(timeout);
  };

  // Cleanup the timeout when the component unmounts
  useEffect(() => {
    return () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
    };
  }, [debounceTimeout]);

  return (
    <div className="search-container">
      <input className="search-input" type="text" placeholder="Search..." value={inputValue} onChange={handleInputChange} />
    </div>
  )
}

export default SearchInput;