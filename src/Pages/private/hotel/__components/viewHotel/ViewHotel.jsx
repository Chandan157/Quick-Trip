import React from "react";
import { BiCheckboxMinus, BiGroup, BiSolidTaxi } from "react-icons/bi";
import { BsFillPencilFill } from "react-icons/bs";

import "./viewHotel.scss";
import { Link } from "react-router-dom";
import Maps from "../../../../../components/Maps/Maps";

const ViewHotel = ({ data }) => {
  return (
    <div className="view_hotel_container">
      <Link to="/dashboard/hotel/update-hotel">
        <div className="edit_profile">
          <BsFillPencilFill />
        </div>
      </Link>
      <h1>{data?.title}</h1>
      <p>
        {data?.address} | {data?.city}
      </p>
      <div className="view_photo_gelerry">
        {data?.photos.map((photo, index) => (
          <img key={index} src={photo} alt="view hotel" />
        ))}
      </div>
      <h3>Description</h3>
      <p>{data?.description}</p>
      <div className="leaflet_add_input">
        <Maps lat={data?.latitude} lon={data?.longitude} />
      </div>
      <div className="hotel_view_details_continer">
        <div>
          <h3>Price(INR)</h3>
          <p>{data?.cheapestPrice}</p>
        </div>
        <div>
          <h3>City</h3>
          <p>{data?.city}</p>
        </div>
      </div>

      <div>
        <h3>Distance</h3>
        <p>{data?.distance}</p>
      </div>

      <div className="room_features">
        <h3>Features</h3>
        <div className="features_con">
          <div className="single_features">
            <BiGroup className="features_icn" />
            <p>
              <b>Featured:</b>
              {data?.featured ? " Available" : " Not Available"}
            </p>
          </div>
          <div className="single_features">
            <BiCheckboxMinus className="features_icn" />
            <p>
              <b> Free Cancel:</b>
              {data?.freeCancel ? " Available" : " Not Available"}
            </p>
          </div>
          <div className="single_features">
            <BiSolidTaxi className="features_icn" />
            <p>
              <b>Free Taxi:</b> {data?.freeTaxi ? "Available" : "Not Available"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewHotel;
