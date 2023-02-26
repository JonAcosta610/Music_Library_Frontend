import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [songs, setSongs] = useState([])
  // console.log(songs)
  useEffect(() => {
    getAllSongs()
  }, []);

  async function getAllSongs() {
    const response = await axios.get('http://127.0.0.1:8000/api/music/');
    const allSongs = response.data
    setSongs(allSongs)
  }

  async function postSong(){
    const response = await axios.post('http://127.0.0.1:8000/api/music/');
  }
  console.log(songs)
  return (
    <div>
      <h1>Music Library</h1>
      {songs.map((song) =>(
        <div>
          <p>{song?.title}</p>
          <p>{song?.artist}</p>
          <p>{song?.album}</p>
          <p>{song?.genre}</p>
          <p>{song?.release_date}</p>
          <hr/>
        </div>
        ))}
    </div>
  );
}

export default App;
