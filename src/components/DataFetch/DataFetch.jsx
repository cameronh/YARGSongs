import React, { useEffect, useState } from 'react';
import './DataFetch.css';
import SongContainer from '../SongContainer/SongContainer.jsx';
const { ipcRenderer } = window.require('electron');

//https://rhythmverse.co/api/yarg/songfiles/list

const listEndpoint = 'https://rhythmverse.co/api/yarg/songfiles/list'
const searchEndpoint = 'https://rhythmverse.co/api/yarg/songfiles/search/live'

const formData = new URLSearchParams();
formData.append('sort[0][sort_by]', 'downloads');
formData.append('sort[0][sort_order]', 'DESC');
formData.append('data_type', 'full');
formData.append('text', '');
formData.append('page', 1);
formData.append('records', 25);

function DataFetch() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      formData.set('page', page);
      if (search.length < 3) {
        formData.delete('text');
      } else {
        formData.set('text', search);
      }

      const formDataObj = Object.fromEntries(formData);
      const result = await ipcRenderer.invoke('fetch-data', search.length < 3 ? listEndpoint : searchEndpoint, formDataObj);

      if (result.error) {
        setError(result.error);
      } else {
        setData(result);
        setTotalPages(result.data.records.total_filtered / result.data.records.returned)
      }

      setLoading(false);
    }

    fetchData();
  }, [search, page]);

  return (
    <div>
      <SongContainer 
        data={data.data}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        setTotalPages={setTotalPages}
        search={search} setSearch={setSearch}
        loading={loading}
        error={error}
      />
    </div>
  );
}

export default DataFetch;