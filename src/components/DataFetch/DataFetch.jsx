import React, {useEffect, useState} from 'react';
import './DataFetch.css';
import SongContainer from '../SongContainer/SongContainer.jsx';
import {fetchSongs} from '../../services/songApi.js';

/**
 * Fetches data from the YARG API and renders the song container.
 * @return {JSX.Element}
 */
function DataFetch() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageSize, setPageSize] = useState(25);

  useEffect(() => {
    async function loadData() {
      setLoading(true);

      const params = buildQueryParams(search, page, pageSize, totalRecords);
      const result = await fetchSongs(params, search.length >= 3);

      if (result.error) {
        setError(result.error);
      } else {
        setData(result);
        setTotalPages(result.data.records.total_filtered /
            result.data.records.returned);
        setTotalRecords(result.data.records.total_filtered);
      }

      setLoading(false);
    }

    loadData();
  }, [search, page, pageSize]);

  return (
    <div>
      <SongContainer
        data={data.data}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        setTotalPages={setTotalPages}
        pageSize={pageSize}
        setPageSize={setPageSize}
        search={search}
        setSearch={setSearch}
        loading={loading}
        error={error}
      />
    </div>
  );
}

/**
 * Builds query parameters for the song API.
 * @param {string} search Search text.
 * @param {number} page Current page number.
 * @param {number} pageSize Number of records per page.
 * @param {number} totalRecords Total records available.
 * @return {Object<string, string|number>} Query parameters.
 */
function buildQueryParams(search, page, pageSize, totalRecords) {
  const params = new URLSearchParams();
  params.set('sort[0][sort_by]', 'downloads');
  params.set('sort[0][sort_order]', 'DESC');
  params.set('data_type', 'full');
  params.set('page', String(page));
  params.set('records', String(pageSize === -1 ? totalRecords : pageSize));
  if (search.length >= 3) {
    params.set('text', search);
  }
  return Object.fromEntries(params);
}

export default DataFetch;

