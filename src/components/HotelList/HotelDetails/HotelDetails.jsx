import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { SearchContext } from "../../../context/SearchContext";
import ReserveHotel from "../ReserveHotel/ReserveHotel";
import LeftContainer from "./LeftContainer";
import "./hotelDetails.scss";

import { BiMale, BiMinus, BiPlus } from "react-icons/bi";

import { addDays, format } from "date-fns";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Container from "../../../layout/container/Container";

export function getValidDate(nud) {
  var dateObj = new Date(nud);
  var month = dateObj.getUTCMonth() + 1;
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();
  return day + "/" + month + "/" + year;
}

const HotelDetails = ({ item, loading, id }) => {
  const sDate = new Date();
  const eDate = addDays(new Date(), 1);

  const navigate = useNavigate();
  const [openModel, setOpenModel] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: sDate,
      endDate: eDate,
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  // context api
  const { dispatch, destination } = useContext(SearchContext);
  const { user } = useContext(AuthContext);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dayDifference(eDate, sDate);
  function handleOptionClick(name, operation) {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  }
  const handleClick = () => {
    if (user.access_token) {
      setOpenModel(true);
      dispatch({
        type: "NEW_SEARCH",
        payload: { destination, dates, options },
      });
    } else {
      navigate("/login");
    }
  };

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

  const totalPrice = days * item.cheapestPrice * Number(options.room);

  return (
    <Container>
      <section className="hotel_contents">
        <div className="hotel_content">
          {loading ? "loading" : <LeftContainer item={item} />}
        </div>
        <div className="booking_details">
          {loading ? (
            "loading"
          ) : (
            <>
              <p className="booking_sub_head">
                Perfect for a {days}-night stay
              </p>
              <p>
                Located in the real heart of {item?.city}, this property has an
                excellent location score of {item?.rating}
              </p>
              <div className="booking_price">
                <div>
                  <span>₹{totalPrice}</span>
                  <span className="line_through">₹{totalPrice + 170}</span>
                </div>
                inclusive of all taxes
              </div>
              <div className="input_section">
                <p>Check in date</p>
                <p
                  className="booking_date"
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

              <div className="booking_date">
                <BiMale className="input_icons" />
                <span onClick={() => setOpenOptions(!openOptions)}>
                  {`${options.adult} adult . ${options.children} children . ${options.room} room`}
                </span>
                {openOptions && (
                  <div className="options" ref={menuRef}>
                    <div className="optionItem">
                      <div className="counter_content">
                        <p className="counter_heading">Adults</p>
                        <p className="counter_sub">Ages min 13</p>
                      </div>
                      <div className="counter_container">
                        <button
                          disabled={options.adult <= 1}
                          className="counter_button"
                          onClick={() => {
                            handleOptionClick("adult", "d");
                          }}
                        >
                          <BiMinus />
                        </button>
                        <div className="counter_number">{options.adult}</div>
                        <button
                          disabled={options.adult >= 10}
                          className="counter_button"
                          onClick={() => {
                            handleOptionClick("adult", "i");
                          }}
                        >
                          <BiPlus />
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <div className="counter_content">
                        <p className="counter_heading">Children</p>
                        <p className="counter_sub">Ages 2-12</p>
                      </div>
                      <div className="counter_container">
                        <button
                          disabled={options.children <= 0}
                          className="counter_button"
                          onClick={() => {
                            handleOptionClick("children", "d");
                          }}
                        >
                          <BiMinus />
                        </button>
                        <div className="counter_number">{options.children}</div>
                        <button
                          disabled={options.children >= 9}
                          className="counter_button"
                          onClick={() => {
                            handleOptionClick("children", "i");
                          }}
                        >
                          <BiPlus />
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <div className="counter_content">
                        <p className="counter_heading">Room</p>
                        <p className="counter_sub">Total rooms</p>
                      </div>
                      <div className="counter_container">
                        <button
                          disabled={options.room <= 1}
                          className="counter_button"
                          onClick={() => {
                            handleOptionClick("room", "d");
                          }}
                        >
                          <BiMinus />
                        </button>
                        <div className="counter_number">{options.room}</div>
                        <button
                          disabled={options.room >= 9}
                          className="counter_button"
                          onClick={() => {
                            handleOptionClick("room", "i");
                          }}
                        >
                          <BiPlus />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button onClick={handleClick} className="btn_primary">
                Continue to Book
              </button>
            </>
          )}
        </div>
        {openModel && (
          <ReserveHotel
            setOpenModel={setOpenModel}
            hotelId={id}
            hotelTitle={item?.title}
            hotelAdd={item?.address}
            options={options}
            totalPrice={totalPrice}
          />
        )}
      </section>
    </Container>
  );
};

export default HotelDetails;
