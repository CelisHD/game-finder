import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="navbar-title">🎮 Game Finder</h1>
      <SearchBar />
      <Link to="/" className="home-link">🏠 Inicio</Link>
    </nav>
  );
}

export default Navbar;
