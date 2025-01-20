import axios from "axios";
import { useContext, useState } from "react";
import { BiArea, BiBath, BiBed, BiGroup, BiXCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../../context/SearchContext";
import useFetch from "../../../services/apiRequest";
import "./reserveHotel.scss";

const ReserveHotel = ({
  setOpenModel,
  hotelId,
  hotelTitle,
  hotelAdd,
  options,
  totalPrice,
}) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const navigate = useNavigate();
  const { data } = useFetch(`/v1/hotel/room/${hotelId}`);
  const { dates } = useContext(SearchContext);

  const getDateInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());
    const dates = [];
    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };

  const allDates = getDateInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unAavailableDates.some((date) =>
      allDates.includes(new Date(date).getTime())
    );
    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;

    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  let token;
  let user = JSON.parse(localStorage.getItem("user"));
  if (user && user.access_token) {
    token = { Authorization: `Bearer ${user.access_token}` };
  }

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(
            `${process.env.REACT_APP_BASE_URL}/v1/room/updateAvailability/${roomId}`,
            {
              dates: allDates,
              hotelId: hotelId,
              title: hotelTitle,
              address: hotelAdd,
              options,
              totalPrice,
            },
            { headers: token }
          );
          return res.data;
        })
      );
      setOpenModel(false);
      navigate("/user/my-bookings");
    } catch (err) {
      console.log("Error from reserve hotel");
    }
  };
  return (
    <div className="reserveHotelCon">
      <div className="reserveHotel">
        <div className="r_container">
          <BiXCircle
            className="cross_btn"
            onClick={() => setOpenModel(false)}
          />
          <h1 className="main_heading">Select your rooms:</h1>
          {data?.map((item, index) => (
            <div key={index} className="r_wrapper">
              <div className="des_container">
                <h3>{item?.title}</h3>
                <p className="des">{item?.desc}</p>
                <h4>₹ {item?.price} / Night</h4>
                <div className="features_con">
                  <div className="single_features">
                    <BiGroup className="features_icn" />
                    <p>People: {item?.maxPeople}</p>
                  </div>
                  <div className="single_features">
                    <BiBed className="features_icn" />
                    <p>Beds: {item?.beds}</p>
                  </div>
                  <div className="single_features">
                    <BiBath className="features_icn" />
                    <p>Bath: {item?.bathroom ? item?.bathroom : "1"}</p>
                  </div>
                  <div className="single_features">
                    <BiArea className="features_icn" />
                    <p>Area: {item?.area}sq.ft</p>
                  </div>
                </div>
                <p>Select Rooms:</p>
                <div className="room">
                  {item?.roomNumbers.map((roomNumber, index) => (
                    <div key={index} className="room_wrapper">
                      {/* <label>{roomNumber?.number}</label> */}
                      {/* <input
                        type="checkbox"
                        value={roomNumber?._id}
                        onChange={handleSelect}
                        disabled={!isAvailable(roomNumber)}
                      /> */}
                      <div className="checkboxes__row">
                        <div className="checkboxes__item">
                          <label className="checkbox style-h">
                            <input
                              type="checkbox"
                              value={roomNumber?._id}
                              onChange={handleSelect}
                              disabled={!isAvailable(roomNumber)}
                            />
                            <div className="checkbox__checkmark"></div>
                            <div className="checkbox__body">
                              {roomNumber?.number}
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <button onClick={handleClick} className="btn_primary">
            Reserve Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReserveHotel;
