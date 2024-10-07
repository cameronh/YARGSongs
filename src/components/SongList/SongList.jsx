import React from 'react';
import './SongList.css'; // External CSS for styling
const { ipcRenderer } = window.require('electron');

function SongList({ songs }) {
  return (
    <div className="song-list">
      {songs.map((song, index) => (
        <div key={index} className="song-card">
          <div className="song-image">
            <img src={`https://rhythmverse.co${song.data.album_art}`} alt={song.data.title} />
          </div>
          <div className="song-details">
            <h2>{song.data.title}</h2>
            <p><strong>{song.data.artist}</strong></p>
            <p>{song.data.album}</p>
            <p>{song.data.year} • {song.data.genre}</p>
            <p>{formatDuration(song.data.song_length)}</p>
          </div>
          <div className="song-difficulty">
            <div className="instrument">
              <img src="/path/to/drum-icon.png" alt="Drums" />
              {renderDifficultyCircles(song.file.diff_drums)}
            </div>
            <div className="instrument">
              <img src="/path/to/guitar-icon.png" alt="Guitar" />
              {renderDifficultyCircles(song.file.diff_guitar)}
            </div>
            <div className="instrument">
              <img src="/path/to/bass-icon.png" alt="Bass" />
              {renderDifficultyCircles(song.file.diff_bass)}
            </div>
            <div className="instrument">
              <img src="/path/to/vocals-icon.png" alt="Vocals" />
              {renderDifficultyCircles(song.file.diff_vocals)}
            </div>
          </div>
          <div className="song-uploader">
            <img src={`https://rhythmverse.co${song.file.user_avatar}`} alt={song.file.user} className="uploader-avatar" />
            <p><strong>{song.file.user}</strong></p>
            <p>{song.file.releases} songs</p>
            <p>{song.file.upload_date}</p>
          </div>
          <div className="song-download">
            <button onClick={() => {handleDownload(song.file.download_page_url_full)}}>Download</button>
            <p>{song.file.downloads}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function handleDownload(url) {}

// Function to render difficulty circles based on the level (0-5)
function renderDifficultyCircles(level) {
  const maxLevel = 5;

  // Ensure level is a number; if it's missing or invalid, treat it as 0
  const parsedLevel = parseInt(level, 10);
  const actualLevel = !isNaN(parsedLevel) && parsedLevel >= 0 && parsedLevel <= maxLevel ? parsedLevel : 0;

  const circles = [];
  for (let i = 0; i < maxLevel; i++) {
    circles.push(
      <span key={i} className={i < actualLevel ? 'filled' : ''}>&#9679;</span>
    );
  }
  return circles;
}

// Function to format the song duration from seconds to "mm:ss"
function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export default SongList;