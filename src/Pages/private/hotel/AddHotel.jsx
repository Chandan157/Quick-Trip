import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import ViewHotel from "./__components/viewHotel/ViewHotel";
import SetHotel from "./__components/setHotel/SetHotel";

const AddHotel = () => {
  const [hotelData, setHotelData] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function getHotel() {
      try {
        const hotelRes = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/v1/hotel/getUsersHotel`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.access_token}`,
            },
          }
        );
        setHotelData(hotelRes.data[0]);
      } catch (err) {
        console.log(err);
      }
    }
    getHotel();
  }, []);

  return <div>{hotelData ? <ViewHotel data={hotelData} /> : <SetHotel />}</div>;
};

export default AddHotel;
