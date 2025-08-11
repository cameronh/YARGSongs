import React from 'react';
import SongList from '../SongList/SongList.jsx';
import './SongContainer.css';
import SearchInput from '../SearchInput/SearchInput.jsx';
import Pagination from '../Pagination/Pagination.jsx';

/**
 * Displays song results with pagination and search controls.
 * @param {Object} props Component properties.
 * @param {Object} props.data Song data from the API.
 * @param {number} props.page Current page number.
 * @param {Function} props.setPage Setter for page number.
 * @param {number|null} props.totalPages Total available pages.
 * @param {Function} props.setTotalPages Setter for total pages.
 * @param {number} props.pageSize Number of records per page.
 * @param {Function} props.setPageSize Setter for page size.
 * @param {string} props.search Current search query.
 * @param {Function} props.setSearch Setter for search query.
 * @param {boolean} props.loading Loading state flag.
 * @param {?Error} props.error API error if any.
 * @return {JSX.Element}
 */
function SongContainer({data, page, setPage, totalPages, setTotalPages, pageSize,
  setPageSize, search, setSearch, loading, error}) {
  return (
    <div className="container">
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
      {error ? (
        <div>Error: {error.message}</div>
      ) : loading ? (
        <div className="spinner-container">
          <h1>Loading...</h1>
          <div className="spinner"></div>
        </div>
      ) : (
        <div>
          <SongList songs={data.songs} />
          <Pagination page={page} setPage={setPage} totalPages={totalPages}
            setTotalPages={setTotalPages} pageSize={pageSize}
            setPageSize={setPageSize} />
        </div>
      )}
    </div>
  );
}

export default SongContainer;

