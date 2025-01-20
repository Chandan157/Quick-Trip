import React from "react";
import { useLocation } from "react-router-dom";
import HotelLists from "../components/Destination/HotelLists/HotelLists";
import Navigation from "../components/Navigation/Navigation";
import useFetch from "../services/apiRequest";
import Footer from "../components/Footer/Footer";

const HotelType = () => {
  const location = useLocation();
  const pathType = location.pathname.split("/")[2];
  const properties = location.pathname.split("/")[3];
  const { data, loading } = useFetch(`/v1/hotel?type=${pathType}`);

  return (
    <>
      <Navigation />
      <HotelLists
        data={data}
        loading={loading}
        place={pathType}
        properties={properties}
      />
      <Footer />
    </>
  );
};

export default HotelType;
