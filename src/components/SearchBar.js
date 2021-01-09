import React from 'react';

export const SearchBar = (props) => {


  function handleTextChange(e) {
    props.onTextChange(e.target.value);
  }

  return (
    <div className="search">             
      <input type="text" 
        placeholder="Search for a user" 
        onChange={handleTextChange}
        value={props.filteredText}
      />      
    </div>
  )
}
