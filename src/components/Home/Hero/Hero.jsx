import { useEffect, useRef, useState } from "react";
import "./hero.scss";
import { useNavigate } from "react-router-dom";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useContext } from "react";
import { SearchContext } from "../../../context/SearchContext";
import Search from "./Search";
import Container from "../../../layout/container/Container";
import { FaArrowRight } from "react-icons/fa";

const Hero = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("delhi");
  const [openDate, setOpenDate] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  const [searchCon, setSearchCon] = useState(false);

  const [dates, setDate] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: "selection",
    },
  ]);

  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  function handleClick(name, operation) {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  }

  // close dropDown
  let menuRef = useRef();
  useEffect(() => {
    let handler = (event) => {
      if (!menuRef.current.contains(event.target)) {
        setOpenDate(false);
        setOpenOptions(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  // context api
  const { dispatch } = useContext(SearchContext);

  function handleSearch() {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    navigate("/hotels", { state: { destination, dates, options } });
  }

  return (
    <header className="hero">
      <Container>
        <div className="hero_container">
          <div className="hero_left_container">
            <div className="blurry_bg">
              <span className="blurry_crimson_circle"></span>
              <span className="blurry_skyblue_circle"></span>
            </div>
            <div className="hero_subtitle">
              <div className="hero_subtitle_logo">
                <FaArrowRight />
              </div>
              <p>Book Your Dream Vacation</p>
            </div>
            <h1>Your Gateway to Heritage Adventures.</h1>
            <p>
              Welcome to our app, where you can effortlessly discover and book
              the perfect monuments for your next adventure.
            </p>
          </div>
          <div className="hero_right_container">
            <img src="./assets/home_hero.png" alt="heroimage" />
          </div>
          <div className="hero_search_placement">
            <Search
              setDestination={setDestination}
              setSearchCon={setSearchCon}
              searchCon={searchCon}
              setOpenDate={setOpenDate}
              openDate={openDate}
              dates={dates}
              menuRef={menuRef}
              setDate={setDate}
              handleSearch={handleSearch}
              setOpenOptions={setOpenOptions}
              options={options}
              openOptions={openOptions}
              handleClick={handleClick}
            />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Hero;
