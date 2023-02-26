import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [songs, setSongs] = useState([])

  const [title, setTitle] = useState('')
  
  const [artist, setArtist] = useState('')

  const [album, setAlbum] = useState('')

  const [genre, setGenre] = useState('')
  
  const [date, setDate] = useState('')

  useEffect(() => {
    getAllSongs()
  }, []);

  async function getAllSongs() {
    const response = await axios.get('http://127.0.0.1:8000/api/music/');
    const allSongs = response.data
    setSongs(allSongs)
  }

  async function postSong(event){
    event.preventDefault()
    // const songObject = {'title': title, 'artist': artist, 'album': album, 'release_date': date, 'genre': genre}
    const songObject = {title, artist, album, 'release_date': date, genre}
    await axios.post('http://127.0.0.1:8000/api/music/', songObject)
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleArtistChange = (event) => {
    setArtist(event.target.value)
  }

  const handleAlbumChange = (event) => {
    setAlbum(event.target.value)
  }

  const handleGenreChange = (event) => {
    setGenre(event.target.value)
  }

  const handleDateChange = (event) => {
    setDate(event.target.value)
  }

  // As a developer, I want to display the data (song title, album, artist, genre, and release date) from the API within a table on the frontend. 

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
        <form>
          <label>Title</label>
          <input type='text' onChange={(event) => handleTitleChange(event)}/>
          {/* <input type='text' onChange={function(event) {return handleTitleChange(event)}}/> */}
          <label>Artist</label>
          <input type='text' onChange={(event) => handleArtistChange(event)}/>
          <label>Album</label>
          <input type='text' onChange={(event) => handleAlbumChange(event)}/>
          <label>Genre</label>
          <input type='text' onChange={(event) => handleGenreChange(event)}/>
          <label>Release Date</label>
          <input type='date' onChange={(event) => handleDateChange(event)}/>
          {/* <input type='submit'value='Add New Song'/> */}
          <button onClick={(event) => postSong(event)} >Add New Song</button>
        </form>
    </div>
  );
}

export default App;

