import { useParams } from "react-router-dom";
import SportHero from "../components/sport/SportHeroTmp.jsx";
import { sports } from "../constants/sports.js";
import NotFoundPage from "./NotFoundPage.jsx";
import ScheduleSection from "../components/sport/ScheduleSection.jsx";
import CategoriesSection from "../components/sport/CategoriesSection.jsx";
import CoachesSection from "../components/sport/CoachesSection.jsx";

function SportPage() {
  // useParams devuelve la parte variable de la dirección: en /deportes/basquet, slug vale 'basquet'
  const { slug } = useParams();
  const sport = sports.find((item) => item.slug === slug);

  // Si el slug no corresponde a ningún deporte, se muestra la página de error
  if (!sport) {
    return <NotFoundPage />;
  }

  return (
    <>
      <SportHero sport={sport} />
      <CategoriesSection categories={sport.categories} />
      <ScheduleSection schedule={sport.schedule} />
      <CoachesSection coaches={sport.coaches} />
    </>
  );
}

export default SportPage;
