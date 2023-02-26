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
        <table>
          <tr>
            <th>Title</th>
            <th>Artist</th>
            <th>Album</th>
            <th>Genre</th>
            <th>Release Date</th>
          </tr>
      {songs.map((song) =>(
          <tr>
            <td>{song?.title}</td>
            <td>{song?.artist}</td>
            <td>{song?.album}</td>
            <td>{song?.genre}</td>
            <td>{song?.release_date}</td>
          </tr>
          
          ))}
        </table>
    </div>
  );
}

export default App;
