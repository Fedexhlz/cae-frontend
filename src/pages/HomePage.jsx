import ClubSection from "../components/home/ClubSection.jsx";
import Hero from "../components/home/Hero.jsx";
import JoinCta from "../components/home/JoinCta.jsx";
import NewsSection from "../components/home/NewsSection.jsx";
import SportsSection from "../components/home/SportsSection.jsx";
import SummerCampSection from "../components/home/SummerCampSection.jsx";

const HomePage = () => {
  return (
    <>
      <Hero />
      <NewsSection />
      <ClubSection />
      <SportsSection />
      <SummerCampSection />
      <JoinCta />
    </>
  );
};

export default HomePage;
