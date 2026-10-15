import { Outlet } from 'react-router-dom';
import BackToTopButton from './BackToTopButton.jsx';
import Footer from './Footer.jsx';
import Navbar from './Navbar.jsx';
import ScrollToHash from './ScrollToHash.jsx';

const MainLayout = () => {
  return (
    <>
      <ScrollToHash />
      <Navbar />
      <div className='flex min-h-screen flex-col'>
        {/* El padding superior compensa la altura del navbar fijo; flex-1 empuja el footer al final */}
        <main className='flex-1 pt-(--navbar-height)'>
          {/* Acá el router coloca la página que corresponde a la dirección */}
          <Outlet />
        </main>
        <Footer />
      </div>
      <BackToTopButton />
    </>
  );
};

export default MainLayout;
