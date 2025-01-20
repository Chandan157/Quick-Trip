import React, { useEffect, useRef, useState } from "react";
import HotelList from "../HotelList/HotelList";
import "./listContainer.scss";
import { useLocation } from "react-router-dom";
import useFetch from "../../../services/apiRequest";

import { DateRange } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import NotFound from "../../NotFound/NotFound";
import { useContext } from "react";
import { SearchContext } from "../../../context/SearchContext";
import Container from "../../../layout/container/Container";

const ListContainer = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [options, setoptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  const [openDate, setOpenDate] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  function handleChange(e) {
    setoptions((values) => ({ ...values, [e.target.name]: e.target.value }));
  }
  const { dispatch } = useContext(SearchContext);

  // close dropDown
  let menuRef = useRef();
  useEffect(() => {
    let handler = (event) => {
      if (!menuRef.current.contains(event.target)) {
        setOpenDate(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  // fetch api data
  const { data, loading, refetch } = useFetch(
    `/v1/hotel?city=${destination}&min=${min || 1}&max=${max || 9999}`
  );
  const handleClick = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    refetch();
  };

  return (
    <Container>
      <section className="listContainer">
        <div className={openMenu ? "search_list" : "search_list hide_list"}>
          <div className="search_list_wrapper">
            <div className="search_heading">
              <p className="main_heading">Search</p>
              <img
                onClick={() => setOpenMenu(false)}
                className="cross_img"
                src="/assets/icons/close.png"
                alt="close"
              />
            </div>
            <div className="input_section">
              <p>Destination</p>
              <input
                className="se_input_box"
                type="text"
                placeholder={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            <div className="input_section">
              <p>Check in date</p>
              <p
                className="se_input_date"
                onClick={() => setOpenDate(!openDate)}
              >
                {`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(
                  dates[0].endDate,
                  "dd/MM/yyyy"
                )}`}
              </p>
              <div ref={menuRef} className="se_date_container_box">
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    minDate={new Date()}
                    ranges={dates}
                  />
                )}
              </div>
            </div>
            <div className="other_options">
              <p className="main_heading heading_option">Options</p>
              <div className="input_section">
                <p>Min Price(per night)</p>
                <input
                  className="se_input_box"
                  type="text"
                  onChange={(e) => setMin(e.target.value)}
                />
              </div>
              <div className="input_section">
                <p>Max Price(per night)</p>
                <input
                  className="se_input_box"
                  type="text"
                  onChange={(e) => setMax(e.target.value)}
                />
              </div>
              <div className="input_section">
                <p>Adult</p>
                <input
                  min={1}
                  max={10}
                  placeholder={options.adult}
                  className="se_input_box"
                  type="number"
                  name="adult"
                  onChange={handleChange}
                />
              </div>
              <div className="input_section">
                <p>Children</p>
                <input
                  min={0}
                  max={9}
                  placeholder={options.children}
                  className="se_input_box"
                  type="number"
                  name="children"
                  onChange={handleChange}
                />
              </div>
              <div className="input_section">
                <p>Room</p>
                <input
                  min={1}
                  max={9}
                  placeholder={options.room}
                  className="se_input_box"
                  type="number"
                  name="room"
                  onChange={handleChange}
                />
              </div>
              <button onClick={handleClick} className="btn_primary">
                Search
              </button>
            </div>
          </div>
        </div>
        {data[0] ? (
          <div className="hotel_list">
            <div className="hotel_list_heading">
              <div>
                <h2 className="search_city">{data[0]?.city}</h2>
                <p>{data?.length} properties found</p>
              </div>
              <div className="filter_btn">
                <button
                  onClick={() => setOpenMenu(true)}
                  className="btn_primary"
                >
                  Filter
                </button>
              </div>
            </div>
            <div className="hotel_list_main_container">
              {loading ? (
                "loading"
              ) : (
                <>
                  {data.map((item, index) => (
                    <HotelList key={index} item={item} />
                  ))}
                </>
              )}
            </div>
          </div>
        ) : (
          <NotFound details="Sorry, no result found!" link="Back to the home" />
        )}
      </section>
    </Container>
  );
};

export default ListContainer;
