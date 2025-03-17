import { useState } from 'react';
import './SearchBar.css';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (onSearch) onSearch(query);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-input"
        placeholder="Buscar videojuegos..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="search-button" onClick={handleSearch}>🔍</button>
    </div>
  );
}

export default SearchBar;
