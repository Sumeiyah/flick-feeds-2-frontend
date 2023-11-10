import React from 'react';

const SearchBar = ({ onSearch }) => {
  const searchBarStyle = {
    margin: '10px 0',
  };

  return (
    <div style={searchBarStyle}>
      <input type="text" placeholder="Search clubs..." onChange={(e) => onSearch(e.target.value)} />
      <button onClick={() => onSearch(document.querySelector('input').value)}>Search</button>
    </div>
  );
};

export default SearchBar;
