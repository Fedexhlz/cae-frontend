import { Outlet } from 'react-router-dom';
import ScrollToHash from './ScrollToHash.jsx';

function MainLayout() {
  return (
    <>
      <ScrollToHash />
      {/* Acá irá el navbar */}
      <main>
        {/* Acá el router coloca la página que corresponde a la dirección */}
        <Outlet />
      </main>
      {/* Acá irá el footer */}
    </>
  );
}

export default MainLayout;