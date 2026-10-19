import { Route, Routes } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout.jsx';
import { underConstructionPaths } from './constants/underConstructionPaths.js';
import HomePage from './pages/HomePage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import AreaDeSocios from './pages/AreaDeSocios.jsx';
import UnderConstructionPage from './pages/UnderConstructionPage.jsx';

function App() {
  return (
    <Routes>
      {/* Las rutas anidadas comparten el marco MainLayout */}
      <Route element={<MainLayout />}>
        <Route path='/' element={<HomePage />} />

        <Route path='/ingresar' element={<AreaDeSocios />} />

        {/* Rutas pendientes: todas muestran la página en construcción */}
        {underConstructionPaths.map((path) => (
          <Route key={path} path={path} element={<UnderConstructionPage />} />
        ))}
        {/* Cualquier otra dirección: error 404 */}
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;