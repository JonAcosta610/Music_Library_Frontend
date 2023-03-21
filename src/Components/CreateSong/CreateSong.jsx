import React from 'react';

function CreateSong ({handleTitleChange, handleArtistChange, handleAlbumChange, handleGenreChange, handleDateChange, postSong}) {
    return (
      <form>
        <label>Title </label>
        <input type='text' onChange={(event) => handleTitleChange(event)}/>
        <label> Artist </label>
        <input type='text' onChange={(event) => handleArtistChange(event)}/>
        <label> Album </label>
        <input type='text' onChange={(event) => handleAlbumChange(event)}/>
        <label> Genre </label>
        <input type='text' onChange={(event) => handleGenreChange(event)}/>
        <label> Release Date </label>
        <input type='date' onChange={(event) => handleDateChange(event)}/>
        <button onClick={(event) => postSong(event)} >Add New Song</button>
      </form>

    )
};

export default CreateSong;