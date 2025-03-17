import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { fetchGames } from '../services/api';
import '../styles.css';
import '../components/Navbar.css';
import '../components/SearchBar.css';
import './Home.css';

function Home() {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    dates: '',
    genres: '',
    platforms: '',
    tags: '',
    developers: ''
  });
  const [filtersApplied, setFiltersApplied] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadGames = async () => {
      const fetchedGames = await fetchGames();
      const sortedGames = fetchedGames.sort((a, b) => b.metacritic - a.metacritic);
      setGames(sortedGames);
      setFilteredGames(sortedGames);
    };
    loadGames();
  }, []);

  // Manejar cambios en los inputs de los filtros
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value.trim() });
  };

  // Aplicar filtros de la izquierda
  const applyFilters = async () => {
    setFiltersApplied(true);
    const filtered = await fetchGames(filters);
    const sortedFiltered = filtered.sort((a, b) => b.metacritic - a.metacritic);
    setFilteredGames(sortedFiltered);
  };

  // 🔍 Buscar juegos por nombre (sin afectar los filtros)
  const handleSearch = async () => {
    if (!search.trim()) return; // Evitar búsquedas vacías
    setFiltersApplied(false); // Desactiva los filtros cuando se busca por nombre
    const searchResults = await fetchGames({ search: search.trim() });
    const sortedSearchResults = searchResults.sort((a, b) => b.metacritic - a.metacritic);
    setFilteredGames(sortedSearchResults);
  };

  return (
    <div className="home-container">
      <nav className="navbar">
        <h1 className="navbar-title">🎮 Game Finder</h1>
        <div className="search-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Buscar videojuegos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="search-button" onClick={handleSearch}>🔍</button>
        </div>
        <button className="home-link" onClick={() => {
          setFiltersApplied(false);
          setSearch('');
          navigate("/");
          window.location.reload();
        }}>
          🏠 Inicio
        </button>
      </nav>
      
      <div className="content-container">
        <aside className="sidebar">
          <h2 className="title">Filtros</h2>
          <input type="text" name="dates" placeholder="Año (Ej: 2023)" onChange={handleFilterChange} />
          <input type="text" name="genres" placeholder="Género (Ej: action, rpg, shooter)" onChange={handleFilterChange} />
          <input type="text" name="platforms" placeholder="Plataforma (Ej: pc, xbox)" onChange={handleFilterChange} />
          <input type="text" name="tags" placeholder="Tags (Ej: multiplayer, horror, openworld)" onChange={handleFilterChange} />
          <input type="text" name="developers" placeholder="Desarrollador (Ej: Nintendo, Ubisoft)" onChange={handleFilterChange} />
          <button onClick={applyFilters}>Aplicar Filtros</button>
        </aside>
        
        <main className="home-content">
          <h1 className="section-title">Mejor Calificados</h1>
          {filtersApplied && filteredGames.length === 0 && <p>No se encontraron juegos con estos filtros.</p>}
          
          <div className="game-list">
            {filteredGames.map((game) => (
              <div key={game.id} className="game-card">
                <img src={game.background_image} alt={game.name} className="game-img"/>
                <h2>
                  <Link to={`/game/${game.id}`}>{game.name}</Link>
                </h2>
                <p>Metacritic: {game.metacritic}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;
