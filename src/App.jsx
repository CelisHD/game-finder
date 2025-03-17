import { Outlet } from 'react-router-dom';
import './styles.css';

function App() {
  return (
    <div>
      <Outlet /> {/* Permite que las rutas se carguen aquí */}
    </div>
  );
}

export default App;
