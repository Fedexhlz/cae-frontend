import { Outlet } from 'react-router-dom';
import BackToTopButton from './BackToTopButton.jsx';
import Navbar from './Navbar.jsx';
import ScrollToHash from './ScrollToHash.jsx';

function MainLayout() {
  return (
    <>
      <ScrollToHash />
      <Navbar />
      {/* El padding superior compensa la altura del navbar fijo */}
      <main className='pt-(--navbar-height)'>
        {/* Acá el router coloca la página que corresponde a la dirección */}
        <Outlet />
      </main>
      {/* Acá irá el footer */}
      <BackToTopButton />
    </>
  );
}

export default MainLayout;
