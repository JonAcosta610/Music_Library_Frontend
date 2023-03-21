import React from 'react';

function MusicTable ({displaySongs, choice, songs}) {
    return (
      <table class="content-table">
        <thead>
          <tr>  
            <th>Title</th>
            <th>Artist</th>
            <th>Album</th>
            <th>Genre</th>
            <th>Release Date</th>
          </tr>
        </thead>
        {choice.length > 0 ? displaySongs(choice): displaySongs(songs)}
      </table>
    )
};

export default MusicTable;