import React, { useState } from "react";
import { CiLocationOn } from "react-icons/ci";

const SearchLocation = ({ listPlace, setListPlace }) => {
  const [searchAddress, setSearchAddress] = useState("");
  const [place, setPlace] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();

    const params = {
      q: searchAddress,
      format: "json",
      addressdetails: 1,
      polygon_geojson: 0,
    };
    const queryString = new URLSearchParams(params).toString();
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    setIsLoading(true);
    fetch(
      `${process.env.REACT_APP_NOMINATIM_BASE_URL}${queryString}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        setIsLoading(false);
        setPlace(JSON.parse(result));
      })
      .catch((err) => console.log("err: ", err));
  };
  return (
    <>
      <div className="search_location">
        <div className="reg_input">
          <p className="label">Full address</p>
          <input
            defaultValue={listPlace?.display_name}
            onChange={(e) => {
              setSearchAddress(e.target.value);
            }}
            className="input_primary"
            type="text"
            placeholder="Enter full address"
          />
        </div>
        <button className="btn_primary" onClick={handleSearch}>
          Search
        </button>
      </div>
      {isLoading && (
        <div className="spinner_loader">
          <img src="/assets/spinner.gif" alt="spinner" />
        </div>
      )}
      <ul className="place_search_result">
        {place?.map((item) => {
          return (
            <div
              key={item?.place_id}
              onClick={() => {
                setListPlace(item);
              }}
            >
              <li>
                <CiLocationOn />
                <p>{item?.display_name}</p>
              </li>
            </div>
          );
        })}
      </ul>
    </>
  );
};

export default SearchLocation;
