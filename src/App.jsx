import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [songs, setSongs] = useState([])
  const [title, setTitle] = useState('') 
  const [artist, setArtist] = useState('')
  const [album, setAlbum] = useState('')
  const [genre, setGenre] = useState('') 
  const [date, setDate] = useState('')
  const [category, setCategory] = useState('')
  const [choice, setChoice] = useState([])
  const [edit, setEdit] = useState(null)
  const [categoriedArray, setCategoriedArray] = useState([])

  useEffect(() => {
    getAllSongs()
  }, []);

  useEffect(() => {
    setCategoryArray(songs)
  }, [category]);

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
  async function editSong(){
    const editSongObject = {title, artist:"WeekDay", album, 'release_date': date, genre};
    await axios.put('http://127.0.0.1:8000/api/music/', editSongObject)
      .then(response => setEdit(response.data.edit));
  }
  async function deleteSong(song){
    await axios.delete(`http://127.0.0.1:8000/api/music/${song.id}/`)
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

  const handleCategoryChange = (event) => {
    setCategory(event.target.value)
  }
  
  const handleChoiceChange = (event) => {
    setChoice(songs.filter((song) => song[category] === event.target.value))
  }

  const displaySongs = (songsArr) => {
    return songsArr.map((song) =>(
      <tr>
        <td>{song?.title}</td>
        <td>{song?.artist}</td>
        <td>{song?.album}</td>
        <td>{song?.genre}</td>
        <td>{song?.release_date}</td>
        <button onClick={() => editSong()}>Edit</button>
        <button onClick={() => deleteSong(song)}>Delete</button>
      </tr>
      ))
  }

  // As a developer, I want to display the data (song title, album, artist, genre, and release date) from the API within a table on the frontend. 
  const setCategoryArray = (arr) => {
    const categoryArray = arr.reduce((accumulator, currentValue) => {
      if(!accumulator.includes(currentValue[category])) {
        accumulator.push(currentValue[category])
      }
      return accumulator
    }, [])
    setCategoriedArray(categoryArray)
  }
  
  return (
    <div>
        <h1>Music Library</h1>
        <label for='songs'>Filter: </label>
        <select name='categories' value={category} onChange={handleCategoryChange}>
          <option value="">Select your category</option>
          <option value='title'>Title</option>
          <option value='artist'>Artist</option>
          <option value='genre'>Genre</option>
          <option value='album'>Album</option>
          <option value='release_date'>Release Date</option>
        </select>
        <select name='choice' onChange={handleChoiceChange}>
          <option value="">Select the {category}</option>
          {categoriedArray.map((categoryValue) => (
            <option>{categoryValue}</option>
          ))}
        </select>
        <table>
          <tr>  
            <th>Title</th>
            <th>Artist</th>
            <th>Album</th>
            <th>Genre</th>
            <th>Release Date</th>
          </tr>
          {choice.length > 0 ? displaySongs(choice): displaySongs(songs)}
        </table>
        <form>
          <label>Title </label>
          <input type='text' onChange={(event) => handleTitleChange(event)}/>
          {/* <input type='text' onChange={function(event) {return handleTitleChange(event)}}/> */}
          <label> Artist </label>
          <input type='text' onChange={(event) => handleArtistChange(event)}/>
          <label> Album </label>
          <input type='text' onChange={(event) => handleAlbumChange(event)}/>
          <label> Genre </label>
          <input type='text' onChange={(event) => handleGenreChange(event)}/>
          <label> Release Date </label>
          <input type='date' onChange={(event) => handleDateChange(event)}/>
          {/* <input type='submit'value='Add New Song'/> */}
          <button onClick={(event) => postSong(event)} >Add New Song</button>
        </form>
    </div>
  );
}

export default App;

