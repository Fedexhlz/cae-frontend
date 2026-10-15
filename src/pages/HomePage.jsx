import ClubSection from '../components/home/ClubSection.jsx';
import Hero from '../components/home/Hero.jsx';
import JoinCta from '../components/home/JoinCta.jsx';
import NewsSection from '../components/home/NewsSection.jsx';
import ScheduleSection from '../components/home/ScheduleSection.jsx';
import SportsSection from '../components/home/SportsSection.jsx';
import SummerCampSection from '../components/home/SummerCampSection.jsx';

function HomePage() {
  return (
    <>
      <Hero />
      <NewsSection />
      <ClubSection />
      <SportsSection />
      <ScheduleSection />
      <SummerCampSection />
      <JoinCta />
    </>
  );
}

export default HomePage;
