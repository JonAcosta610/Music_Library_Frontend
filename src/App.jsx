import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  useEffect(() => {
    getAllSongs()
  }, []);

  async function getAllSongs(){
    const response = await axios.get('http://127.0.0.1:8000/api/music/');
    console.log(response.data);
  }

  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}

export default App;
