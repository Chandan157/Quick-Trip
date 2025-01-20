import { format } from "date-fns";
import { DateRange } from "react-date-range";

import {
  BiCalendar,
  BiMale,
  BiMinus,
  BiPlus,
  BiSearchAlt,
} from "react-icons/bi";

const Search = ({
  setDestination,
  setSearchCon,
  searchCon,
  setOpenDate,
  openDate,
  dates,
  menuRef,
  setDate,
  handleSearch,
  setOpenOptions,
  options,
  openOptions,
  handleClick,
}) => {
  return (
    <div className="search_container">
      <div className="search_wrapper">
        <div className="input_label">
          <h2>Where</h2>
        </div>
        <div className="input_section">
          <BiSearchAlt className="input_icons" />
          <input
            type="text"
            placeholder="e.g.-Area, Landmark or Property Name"
            onChange={(e) => setDestination(e.target.value)}
            onClick={() => {
              setSearchCon(!searchCon);
            }}
          />
        </div>

        <div className="input_label">
          <h2>Check-in and Check-out</h2>
        </div>
        <div className="input_section">
          <BiCalendar className="input_icons" />
          <span
            className="specific_title"
            onClick={() => setOpenDate(!openDate)}
          >
            {`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(
              dates[0].endDate,
              "dd/MM/yyyy"
            )}`}
          </span>
          <div ref={menuRef} className="date_container_box">
            {openDate && (
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setDate([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dates}
                className="date_renger"
              />
            )}
          </div>
        </div>
        <div className="input_label">
          <h2>Guests & Rooms</h2>
        </div>
        <div className="input_section">
          <BiMale className="input_icons" />
          <span
            className="specific_title"
            onClick={() => setOpenOptions(!openOptions)}
          >
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
                      handleClick("adult", "d");
                    }}
                  >
                    <BiMinus />
                  </button>
                  <div className="counter_number">{options.adult}</div>
                  <button
                    disabled={options.adult >= 10}
                    className="counter_button"
                    onClick={() => {
                      handleClick("adult", "i");
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
                      handleClick("children", "d");
                    }}
                  >
                    <BiMinus />
                  </button>
                  <div className="counter_number">{options.children}</div>
                  <button
                    disabled={options.children >= 9}
                    className="counter_button"
                    onClick={() => {
                      handleClick("children", "i");
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
                      handleClick("room", "d");
                    }}
                  >
                    <BiMinus />
                  </button>
                  <div className="counter_number">{options.room}</div>
                  <button
                    disabled={options.room >= 9}
                    className="counter_button"
                    onClick={() => {
                      handleClick("room", "i");
                    }}
                  >
                    <BiPlus />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <button onClick={handleSearch} className="btn_primary">
          Search
        </button>
      </div>
    </div>
  );
};

export default Search;
