import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './Components/SearchBar/SearchBar';
import MusicTable from './Components/MusicTable/Musictable';
import CreateSong from './Components/CreateSong/CreateSong';
import ImagePresenter from './Components/ImagePresenter/ImagePresenter';
import './Style.css';
import musicImage from './Assests/MusicImage.jpg';

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
      <tr class='table-data'>
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
    <div class='main-page'>
        <h1 class='table-name'>Music Library</h1>
        <ImagePresenter image={musicImage} altText={'image of music notes'}/>
        <SearchBar 
          category={category} 
          categoriedArray={categoriedArray}
          handleCategoryChange={handleCategoryChange}
          handleChoiceChange={handleChoiceChange}
        />
        <MusicTable displaySongs={displaySongs} choice={choice} songs={songs}/>
        <CreateSong 
          handleTitleChange={handleTitleChange}
          handleArtistChange={handleArtistChange}
          handleAlbumChange={handleAlbumChange}
          handleGenreChange={handleGenreChange}
          handleDateChange={handleDateChange}
          postSong={postSong}
        />
    </div>
  );
}

export default App;

