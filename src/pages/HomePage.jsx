import ClubSection from "../components/home/ClubSection.jsx";
import Hero from "../components/home/Hero.jsx";
import NewsSection from "../components/home/NewsSection.jsx";
import SportsSection from "../components/home/SportsSection.jsx";

function HomePage() {
  return (
    <>
      <Hero />
      <NewsSection />
      <ClubSection />
      <SportsSection />
    </>
  );
}

export default HomePage;
