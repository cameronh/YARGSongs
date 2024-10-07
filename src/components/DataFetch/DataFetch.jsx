import React, { useEffect, useState } from 'react';
import SongList from '../SongList/SongList.jsx';
const { ipcRenderer } = window.require('electron');

//https://rhythmverse.co/api/yarg/songfiles/list

const formData = new URLSearchParams();
formData.append('sort[0][sort_by]', 'downloads');
formData.append('sort[0][sort_order]', 'DESC');
formData.append('data_type', 'full');
formData.append('text', 'Alice in Chains');
formData.append('page', 1);
formData.append('records', 25);

const formDataObj = Object.fromEntries(formData);

function DataFetch() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const result = await ipcRenderer.invoke('fetch-data', 'https://rhythmverse.co/api/yarg/songfiles/search/live', formDataObj);
      if (result.error) {
        setError(result.error);
      } else {
        setData(result);
      }
      setLoading(false);
    }

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Fetched Data</h1>
      <SongList songs={data.data.songs} />
    </div>
  );
}
//<pre>{JSON.stringify(data.data.songs, null, 2)}</pre>
export default DataFetch;