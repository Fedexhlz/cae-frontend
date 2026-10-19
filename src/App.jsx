import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout.jsx";
import HomePage from "./pages/HomePage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import SportPage from "./pages/SportPage.jsx";

function App() {
  return (
    <Routes>
      {/* Las rutas anidadas comparten el marco MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />

        <Route path="/" element={<HomePage />} />
        <Route path="/deportes/:slug" element={<SportPage />} />
        <Route path="*" element={<NotFoundPage />} />

        {/* Cualquier otra dirección: error 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
