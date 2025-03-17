import axios from 'axios';

const API_KEY = '4bd88d3bff0c435a9e0009d0cf4baca5';
const BASE_URL = 'https://api.rawg.io/api';

// Función para obtener el ID del desarrollador por nombre
const getDeveloperId = async (developerName) => {
  try {
    const response = await axios.get(`${BASE_URL}/developers`, {
      params: { key: API_KEY, search: developerName }
    });
    const developers = response.data.results;
    return developers.length > 0 ? developers[0].id : null;
  } catch (error) {
    console.error(`Error buscando el desarrollador "${developerName}":`, error);
    return null;
  }
};

// Obtener juegos con filtros o por búsqueda
export const fetchGames = async (filters = {}) => {
  try {
    let params = new URLSearchParams({ key: API_KEY });

    // 📌 Si el usuario usa la barra de búsqueda, solo se filtra por nombre
    if (filters.search) {
      params.append("search", filters.search);
    } else {
      // ✅ Filtrar por Año
      if (filters.dates) {
        const year = filters.dates.trim();
        if (/^\d{4}$/.test(year)) {
          params.append("dates", `${year}-01-01,${year}-12-31`);
        }
      }

      // ✅ Filtrar por Género
      if (filters.genres) {
        const genresMap = {
          action: 4,
          adventure: 3,
          rpg: 5,
          shooter: 2,
          puzzle: 7,
          racing: 1,
          strategy: 10
        };
        const genreIds = filters.genres
          .toLowerCase()
          .split(',')
          .map(g => genresMap[g.trim()])
          .filter(Boolean)
          .join(',');

        if (genreIds) {
          params.append("genres", genreIds);
        }
      }

      // ✅ Filtrar por Plataforma
      if (filters.platforms) {
        const platformsMap = {
          pc: 4,
          playstation: 2,
          xbox: 3,
          nintendo: 7,
          ios: 8,
          android: 21
        };
        const platformIds = filters.platforms
          .toLowerCase()
          .split(',')
          .map(p => platformsMap[p.trim()])
          .filter(Boolean)
          .join(',');

        if (platformIds) {
          params.append("platforms", platformIds);
        }
      }

      // ✅ Filtrar por Tags
      if (filters.tags) {
        params.append("tags", filters.tags.toLowerCase().trim());
      }

      // ✅ Filtrar por Desarrollador (buscando el ID primero)
      if (filters.developers) {
        const developerNames = filters.developers.split(',').map(name => name.trim());
        const developerIds = [];

        for (const name of developerNames) {
          const id = await getDeveloperId(name);
          if (id) {
            developerIds.push(id);
          }
        }

        if (developerIds.length > 0) {
          params.append("developers", developerIds.join(','));
        }
      }
    }

    // 🔥 Obtener los juegos filtrados
    const response = await axios.get(`${BASE_URL}/games?${params}`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching games:', error);
    return [];
  }
};

// Obtener detalles de un juego específico
export const fetchGameDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/games/${id}?key=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching game details:', error);
    return null;
  }
};
