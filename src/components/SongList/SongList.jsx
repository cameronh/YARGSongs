import React, { useState } from 'react';
import './SongList.css';
import IconTimeOutline from '../Icons/IconTimeOutline.jsx';
const { ipcRenderer } = window.require('electron');

function SongList({ songs }) {
  // State to keep track of which songs are being downloaded
  const [downloadingSongs, setDownloadingSongs] = useState({});

  const handleDownload = async (url, index) => {
    setDownloadingSongs(prevState => ({
      ...prevState,
      [index]: true // Mark this song as downloading
    }));

    try {
      await ipcRenderer.invoke('download-file', url);
      console.log('File downloaded successfully');
    } catch (error) {
      console.error('Error downloading file:', error);
    } finally {
      setDownloadingSongs(prevState => ({
        ...prevState,
        [index]: false // Reset loading state when done
      }));
    }
  };

  return (
    <div className="song-list">
      {Array.isArray(songs) && songs.length > 0 ? songs.map((song, index) => (
        <div key={index} className={`song-card ${index % 2 === 0 ? 'even' : 'odd'}`}>
          <div className="song-image">
            <img src={`https://rhythmverse.co${song.data.album_art}`} onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = "https://rhythmverse.co/assets/media/placeholders/album.png";
            }} />
          </div>
          <div className="song-details">
            <h2>{song.data.title}</h2>
            <p className="artist">{song.data.artist}</p>
            <p className="album">{song.data.album}</p>
            <div className="song-length">
              <p>
                <IconTimeOutline />
                {formatDuration(song.data.song_length)}

              </p>
            </div>
          </div>
          <div className="song-genre">
            <p className="genre">{song.file.file_genre}</p>
            <p className="date">{song.file.file_year}</p>
            <p className="decade">The {song.file.file_decade}'s</p>
          </div>
          <div className="song-difficulty">
            {renderInstrument('drums', song.file.diff_drums)}
            {renderInstrument('guitar', song.file.diff_guitar)}
            {renderInstrument('bass', song.file.diff_bass)}
            {song.file.vocals_lyrics_only != 1 ? song.data.vocal_parts && parseInt(song.data.vocal_parts) >= 3 ? renderInstrument('vocals3', song.file.diff_vocals) : renderInstrument('vocals', song.file.diff_vocals) : ''}
            {renderInstrument('keys', song.file.diff_keys)}
          </div>
          <div className="song-uploader">
            <div className="uploader">
              <img src={`https://rhythmverse.co${song.file.author.avatar_path}`} className="uploader-avatar" onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = "https://rhythmverse.co/assets/media/placeholders/album.png";
              }} />
              <div className="column">
                <p><strong>{song.file.user}</strong></p>
                <p className="songs-released">{song.file.author.releases} songs</p>
              </div>
            </div>
            <p className="upload-date">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
                <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clipRule="evenodd" />
              </svg>
              {new Date(song.file.record_updated).toLocaleString()}
            </p>
          </div>
          <div className="song-download">
            {downloadingSongs[index] ? (
              <div className="loading"><div className="spinner"></div></div>
            ) : (
              <button onClick={() => handleDownload(song.file.download_url, index)} className="download-btn">
                <img src={'https://rhythmverse.co/assets/media/games/yarg.png'} />
                Download
              </button>
            )}
            <div className="download-stats">
              <p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                  <path fillRule="evenodd" d="M10.5 3.75a6 6 0 0 0-5.98 6.496A5.25 5.25 0 0 0 6.75 20.25H18a4.5 4.5 0 0 0 2.206-8.423 3.75 3.75 0 0 0-4.133-4.303A6.001 6.001 0 0 0 10.5 3.75Zm2.25 6a.75.75 0 0 0-1.5 0v4.94l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V9.75Z" clipRule="evenodd" />
                </svg>
                {song.file.downloads}
              </p>
              <p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                  <path fillRule="evenodd" d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 0 1-3.476.383.39.39 0 0 0-.297.17l-2.755 4.133a.75.75 0 0 1-1.248 0l-2.755-4.133a.39.39 0 0 0-.297-.17 48.9 48.9 0 0 1-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97ZM6.75 8.25a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 0 1.5h-9a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H7.5Z" clipRule="evenodd" />
                </svg>
                {song.file.comments}
              </p>
            </div>
          </div>
        </div>
      )) : <h1>No results found.</h1>}
    </div>
  );
}

function renderInstrument(instrument, level) {
  if (parseInt(level, 10) <= 0 || level == undefined) return ''
  return (
    <div className="instrument">
      <img src={`https://rhythmverse.co/assets/media/instruments/${instrument}_small.png`} alt={instrument} />
      {renderDifficultyCircles(level)}
    </div>
  );
}

function renderDifficultyCircles(level) {
  const maxLevel = 5;

  // Check if the level is -1 and return "---"
  if (level === -1) {
    return <div className="no-difficulty">---</div>;
  }

  const parsedLevel = parseInt(level, 10) || 0;

  return (
    <div className="difficulty-circles">
      {[...Array(maxLevel)].map((_, i) => (
        <span
          key={i}
          className={
            i < parsedLevel - 1
              ? parsedLevel - 1 > 5
                ? 'filled-red'
                : 'filled'
              : ''
          }
        >
          &#9679;
        </span>
      ))}
    </div>
  );
}

function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export default SongList;
