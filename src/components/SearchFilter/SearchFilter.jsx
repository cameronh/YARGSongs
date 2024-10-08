import React, { useState } from 'react';
import './SearchFilter.css';

function SearchFilter({ pageSize, setPageSize }) {
  const options = [25, 50, 75, 100, 250, -1];

  return (
    <div className="search-filter-container">
      <label>Songs per page: </label>
      <select value={pageSize} onChange={e => setPageSize(e.target.value)}>
        {options.map((x, i) => (
          <option key={i} value={x}>
            {x === -1 ? 'All' : x}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SearchFilter;