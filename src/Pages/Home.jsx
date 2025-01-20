import Destinations from "../components/Home/Destinations/Destinations";
import FeaturedPlaces from "../components/Home/FeaturedPlaces/FeaturedPlaces";
import Hero from "../components/Home/Hero/Hero";
import Properties from "../components/Home/Properties/Properties";
import Navigation from "../components/Navigation/Navigation";
import NewsLetter from "../components/NewsLetter/NewsLetter";
import Footer from "../components/Footer/Footer";
import WorkProgress from "../components/Home/WorkProgress/WorkProgress";

const Home = () => {
  return (
    <div className="main_container">
      <Navigation />
      <Hero />
      <Destinations />
      <Properties />
      <FeaturedPlaces />
      <WorkProgress />
      <NewsLetter />
      <Footer />
    </div>
  );
};

export default Home;
