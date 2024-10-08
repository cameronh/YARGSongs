import React, { useState } from 'react';
import SongList from '../SongList/SongList.jsx';
import './SongContainer.css';
import SearchInput from '../SearchInput/SearchInput.jsx';
import Pagination from '../Pagination/Pagination.jsx';

function SongContainer({ data, page, setPage, totalPages, setTotalPages, search, setSearch, loading, error }) {

  return (
    <div className=".container">
      <div className="filter">
        <div className="files">
          <h1>{!loading && !error ? data.records.total_filtered : 0}</h1>
          <p>files</p>
        </div>
        <div className="search">
          <SearchInput search={search} setSearch={setSearch} />
        </div>
      </div>
      <hr />
      {error ? <div>Error: {error.message}</div> : loading ? <div className="spinner-container">
        <h1>Loading...</h1>
        <div className="spinner"></div>
      </div> : <div>
        <SongList songs={data.songs} />
        <Pagination page={page} setPage={setPage} totalPages={totalPages} setTotalPages={setTotalPages}  />
      </div>
      }

    </div>
  )
}

export default SongContainer;