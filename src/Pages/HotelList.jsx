import { useContext, useEffect } from "react";
import HotelDetails from "../components/HotelList/HotelDetails/HotelDetails";
import ListSlider from "../components/HotelList/ListSlider/ListSlider";
import NewsLetter from "../components/NewsLetter/NewsLetter";

import axios from "axios";
import { useLocation } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import ShowMap from "../components/HotelList/ShowMap/ShowMap";
import Navigation from "../components/Navigation/Navigation";
import { Cart } from "../context/CartContext";

const HotelList = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  // cart context
  const { dispatch, products, loading } = useContext(Cart);

  // fetch api data
  // const { data, loading } = useFetch(`/v1/hotel/find/${id}`);

  useEffect(() => {
    const getProductData = async () => {
      dispatch({ type: "IS_LOADING" });
      const productData = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/v1/hotel/find/${id}`
      );
      dispatch({ type: "FETCH_DATA", payload: { pData: productData.data } });
    };
    getProductData();
  }, [id]);

  return (
    <>
      <Navigation />
      <ListSlider photos={products?.photos} loading={loading} />
      <HotelDetails item={products} loading={loading} id={id} />
      <ShowMap products={products} />
      <NewsLetter />
      <Footer />
    </>
  );
};
export default HotelList;
