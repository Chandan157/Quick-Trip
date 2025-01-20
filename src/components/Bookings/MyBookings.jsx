import axios from "axios";
import { useEffect, useState } from "react";
import { BiHotel } from "react-icons/bi";
import { FiMapPin } from "react-icons/fi";
import { Link } from "react-router-dom";
import { getValidDate } from "../HotelList/HotelDetails/HotelDetails";
import NotFound from "../NotFound/NotFound";
import GenerateQrcode from "./GenerateQrcode";
import "./myBookings.scss";

const BookingDetails = ({ item }) => {
  let token;
  let user = JSON.parse(localStorage.getItem("user"));
  if (user && user.access_token) {
    token = { Authorization: `Bearer ${user.access_token}` };
  }

  const handeleCancel = async (reserveDates, bookingId) => {
    await axios.put(
      `${process.env.REACT_APP_BASE_URL}/v1/bookings/${bookingId}`,
      { dates: reserveDates },
      { headers: token }
    );
  };
  return (
    <div className="booking_det_con">
      <p className="booking_title">{item?.title}</p>
      <div className="address">
        <FiMapPin className="icn" />
        <p>{item?.address}</p>
      </div>
      <div className="address">
        <BiHotel className="icn" />
        <p>
          Adult {item?.options.adult} . Children {item?.options.children} . room{" "}
          {item?.options.room}
        </p>
      </div>
      <div>
        <p className="price">₹{item?.price}</p>
      </div>
      <div className="timeline">
        <div className="timeline_line">
          <span className="timeline_innerline"></span>
        </div>
        <ul>
          <li>
            <span className="timeline_point"></span>
            <p>Checkin</p>
            <p className="date">
              {getValidDate(item?.reserveDates[0])}
              <span>(11:00am)</span>
            </p>
          </li>
          <li>
            <span className="timeline_point"></span>
            <p>Checkout</p>
            <p className="date">
              {getValidDate(item?.reserveDates[item?.reserveDates.length - 1])}
              <span>(12:00pm)</span>
            </p>
          </li>
        </ul>
      </div>
      <div className="btn_container">
        <Link className="btn_primary" to={`/hotel/${item?.hotelId}`}>
          View Details
        </Link>
        <div
          className="btn_primary btn_sec"
          onClick={() => handeleCancel(item?.reserveDates, item?._id)}
        >
          Cancel Booking
        </div>
      </div>
    </div>
  );
};

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  let token;
  let user = JSON.parse(localStorage.getItem("user"));
  if (user && user.access_token) {
    token = { Authorization: `Bearer ${user.access_token}` };
  }
  useEffect(() => {
    const getBookings = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/v1/bookings`,
          { headers: token }
        );
        setBookings(res.data);
      } catch (err) {
        console.log("My booking error");
      }
    };
    getBookings();
  }, []);

  return (
    <section className="myBookings">
      <h2>My Bookings</h2>
      <div className="booking_container">
        {bookings.length !== 0 ? (
          <>
            {bookings?.map((item, indx) => (
              <div className="booking" key={indx}>
                <div className="booking_wrapper">
                  <div className="booking_img_con">
                    <img src="/assets/hotels/hotel_5.jpeg" alt="hotel" />
                  </div>
                  <BookingDetails item={item} />
                </div>
                <div className="qr_code_container">
                  <GenerateQrcode roomID={item?.roomId} />
                </div>
              </div>
            ))}
          </>
        ) : (
          <NotFound details="Sorry, no bookings found!" link="Book now" />
        )}
      </div>
    </section>
  );
};

export default MyBookings;
