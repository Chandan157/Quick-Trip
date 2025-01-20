import React from "react";
import useFetch from "../../../services/apiRequest";
import Loader from "../../../components/Loader/Loader";
import Rooms from "../../../components/ListRooms/Rooms";

const ListRooms = () => {
  const { data, loading } = useFetch("/v1/room/getHotelRooms");
  return loading ? (
    <Loader />
  ) : (
    <>
      {data.map((room, index) => (
        <Rooms key={index} room={room} />
      ))}
    </>
  );
};

export default ListRooms;
