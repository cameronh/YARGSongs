const {ipcRenderer} = window.require('electron');

const LIST_ENDPOINT = 'https://rhythmverse.co/api/yarg/songfiles/list';
const SEARCH_ENDPOINT = 'https://rhythmverse.co/api/yarg/songfiles/search/live';

/**
 * Fetches song data from the YARG API.
 * @param {Object<string, string|number>} params Query parameters.
 * @param {boolean} useSearch Whether to use the search endpoint.
 * @return {Promise<Object>} API response data.
 */
export async function fetchSongs(params, useSearch) {
  const endpoint = useSearch ? SEARCH_ENDPOINT : LIST_ENDPOINT;
  return ipcRenderer.invoke('fetch-data', endpoint, params);
}

