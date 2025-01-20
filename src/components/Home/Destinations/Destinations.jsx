import React from "react";
import "./destination.scss";
import Skeleton from "../../Skeleton/Skeleton";
import useFetch from "../../../services/apiRequest";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router-dom";
import Container from "../../../layout/container/Container";

const Destinations = () => {
  const { data, loading } = useFetch(
    "/v1/hotel/countByCity?cities=delhi,kolkata,uttar-pradesh,gujarat,rajasthan,bengaluru"
  );

  return (
    <section className="destination">
      <h2 className="main_heading">Top Destination Places</h2>
      <p className="heading_des">Top trending destinations</p>
      <Container>
        {loading ? (
          <div className="des_container">
            <Swiper
              spaceBetween={60}
              // slidesPerView={5}
              breakpoints={{
                "@0.00": {
                  slidesPerView: 2,
                  spaceBetween: 50,
                },
                "@0.75": {
                  slidesPerView: 2,
                  spaceBetween: 50,
                },
                "@1.00": {
                  slidesPerView: 3,
                  spaceBetween: 50,
                },
                "@1.50": {
                  slidesPerView: 6,
                  spaceBetween: 50,
                },
              }}
            >
              <>
                {[...Array(6)].map((x, i) => (
                  <SwiperSlide key={i}>
                    <Skeleton type="destination" />
                  </SwiperSlide>
                ))}
              </>
            </Swiper>
          </div>
        ) : (
          <div className="des_container">
            <Swiper
              spaceBetween={60}
              // slidesPerView={5}
              breakpoints={{
                "@0.00": {
                  slidesPerView: 2,
                  spaceBetween: 50,
                },
                "@0.75": {
                  slidesPerView: 2,
                  spaceBetween: 50,
                },
                "@1.00": {
                  slidesPerView: 3,
                  spaceBetween: 50,
                },
                "@1.50": {
                  slidesPerView: 6,
                  spaceBetween: 50,
                },
              }}
            >
              <SwiperSlide>
                <Link to={"/find/delhi"}>
                  <div className="des_card">
                    <div className="img_container">
                      <img
                        src="/assets/top_destinations/beach.jpg"
                        alt="destination"
                      />
                    </div>
                    <p className="heading">Delhi</p>
                    <p>{data[0]} Rentals</p>
                  </div>
                </Link>
              </SwiperSlide>
              <SwiperSlide>
                <Link to={"/find/kolkata"}>
                  <div className="des_card">
                    <div className="img_container">
                      <img
                        src="/assets/top_destinations/Los-Angeles.jpg"
                        alt="destination"
                      />
                    </div>
                    <p className="heading">Kolkata</p>
                    <p>{data[1]} Rentals</p>
                  </div>
                </Link>
              </SwiperSlide>
              <SwiperSlide>
                <Link to={"/find/uttar-pradesh"}>
                  <div className="des_card">
                    <div className="img_container">
                      <img
                        src="/assets/top_destinations/New-Jersey.jpg"
                        alt="destination"
                      />
                    </div>
                    <p className="heading">Uttar Pradesh</p>
                    <p>{data[2]} Rentals</p>
                  </div>
                </Link>
              </SwiperSlide>
              <SwiperSlide>
                <Link to={"/find/gujarat"}>
                  <div className="des_card">
                    <div className="img_container">
                      <img
                        src="/assets/top_destinations/New-York-City.jpg"
                        alt="destination"
                      />
                    </div>
                    <p className="heading">Gujarat</p>
                    <p>{data[3]} Rentals</p>
                  </div>
                </Link>
              </SwiperSlide>
              <SwiperSlide>
                <Link to={"/find/rajasthan"}>
                  <div className="des_card">
                    <div className="img_container">
                      <img
                        src="/assets/top_destinations/San-Francisco.jpg"
                        alt="destination"
                      />
                    </div>
                    <p className="heading">Rajasthan</p>
                    <p>{data[4]} Rentals</p>
                  </div>
                </Link>
              </SwiperSlide>
              <SwiperSlide>
                <Link to={"/find/bengaluru"}>
                  <div className="des_card">
                    <div className="img_container">
                      <img
                        src="/assets/top_destinations/Wilmington.jpg"
                        alt="destination"
                      />
                    </div>
                    <p className="heading">Bengaluru</p>
                    <p>{data[5]} Rentals</p>
                  </div>
                </Link>
              </SwiperSlide>
            </Swiper>
          </div>
        )}
      </Container>
    </section>
  );
};

export default Destinations;
