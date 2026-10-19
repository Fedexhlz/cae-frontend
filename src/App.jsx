import { Route, Routes } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout.jsx';
import HomePage from './pages/HomePage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import AreaDeSocios from './pages/AreaDeSocios.jsx';

function App() {
  return (
    <Routes>
      {/* Las rutas anidadas comparten el marco MainLayout */}
      <Route element={<MainLayout />}>
        <Route path='/' element={<HomePage />} />
        <Route path='/ingresar' element={<AreaDeSocios />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;