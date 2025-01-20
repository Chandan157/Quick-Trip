import Footer from "../components/Footer/Footer";
import ListContainer from "../components/Hotel/ListContainer/ListContainer";
import Navigation from "../components/Navigation/Navigation";
import NewsLetter from "../components/NewsLetter/NewsLetter";

const Hotel = () => {
  return (
    <>
      <Navigation />
      <ListContainer />
      <NewsLetter />
      <Footer />
    </>
  );
};

export default Hotel;
