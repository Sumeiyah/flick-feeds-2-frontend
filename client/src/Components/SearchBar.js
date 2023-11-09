// SearchBar.js
import React from 'react';
import theme from './theme';

const SearchBar = ({ onSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search Clubs..."
      onChange={(e) => onSearch(e.target.value)}
      style={theme.searchBar}
    />
  );
};

export default SearchBar;
