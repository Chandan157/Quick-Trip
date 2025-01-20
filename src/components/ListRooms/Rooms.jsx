import React from "react";
import { BiArea, BiBath, BiBed, BiGroup, BiXCircle } from "react-icons/bi";
import "./rooms.scss";

const RoomNumbers = ({ roomNo }) => {
  return (
    <div className="room_numbers">
      <p className="room_num">{roomNo?.number}</p>
      <div>
        {roomNo?.unAavailableDates.length !== 0 ? (
          <div>
            {roomNo?.unAavailableDates.map((uDate, index) => (
              <p>{uDate}</p>
            ))}
          </div>
        ) : (
          <p>No Booking found</p>
        )}
      </div>
    </div>
  );
};

const Rooms = ({ room }) => {
  return (
    <section className="room_listing_container">
      <h3>{room?.title}</h3>
      <p>{room?.desc}</p>
      <div className="features_con">
        <div className="single_features">
          <BiGroup className="features_icn" />
          <p>People: {room?.maxPeople}</p>
        </div>
        <div className="single_features">
          <BiBed className="features_icn" />
          <p>Beds: {room?.beds}</p>
        </div>
        <div className="single_features">
          <BiBath className="features_icn" />
          <p>Bath: {room?.bathroom ? room?.bathroom : "1"}</p>
        </div>
        <div className="single_features">
          <BiArea className="features_icn" />
          <p>Area: {room?.area}sq.ft</p>
        </div>
      </div>
      {room?.roomNumbers.map((roomNo, index) => {
        return <RoomNumbers key={index} roomNo={roomNo} />;
      })}
    </section>
  );
};

export default Rooms;
