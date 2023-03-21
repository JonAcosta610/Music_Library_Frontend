import React from 'react';

function SearchBar ({category, categoriedArray, handleCategoryChange, handleChoiceChange}) {    
     
    return (
    <div>
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
    </div>
)};

export default SearchBar;