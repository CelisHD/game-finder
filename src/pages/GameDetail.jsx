import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchGameDetails } from '../services/api';
import './GameDetail.css';

function GameDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);

  useEffect(() => {
    const loadGameDetails = async () => {
      const data = await fetchGameDetails(id);
      setGame(data);
    };
    loadGameDetails();
  }, [id]);

  if (!game) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="game-detail">
      <h1>{game.name}</h1>

      {/* Imagen del juego */}
      <img className="game-image" src={game.background_image} alt={game.name} />

      <div className="game-content">
        {/* Descripción del juego */}
        <div className="game-description">
          <p>{game.description_raw}</p>
        </div>

        {/* Información adicional */}
        <p><strong>Metacritic:</strong> {game.metacritic}</p>
        <p><strong>Género:</strong> {game.genres.map(genre => genre.name).join(', ')}</p>
        <p><strong>Plataformas:</strong> {game.platforms.map(p => p.platform.name).join(', ')}</p>
        <p><strong>Año de lanzamiento:</strong> {game.released}</p>
        <p><strong>Tags:</strong> {game.tags.map(tag => tag.name).join(', ') || "No disponible"}</p>
        <p><strong>Desarrollador:</strong> {game.developers?.map(dev => dev.name).join(', ') || "No disponible"}</p>

        {/* Botón para volver */}
        <button className="back-button" onClick={() => navigate(-1)}>🔙 Volver</button>
      </div>
    </div>
  );
}

export default GameDetail;
