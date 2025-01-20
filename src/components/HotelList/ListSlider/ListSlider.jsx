import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Scrollbar, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./listSlider.scss";
import Container from "../../../layout/container/Container";

const ListSlider = ({ photos }) => {
  return (
    <Container>
      <div className="slider_container">
        <div className="list_slider_container">
          <Swiper
            slidesPerView={1}
            centeredSlides={false}
            slidesPerGroupSkip={1}
            grabCursor={true}
            keyboard={{
              enabled: true,
            }}
            breakpoints={{
              769: {
                slidesPerView: 2,
                slidesPerGroup: 2,
              },
            }}
            // scrollbar={true}
            navigation={true}
            pagination={{
              clickable: true,
            }}
            modules={[Keyboard, Scrollbar, Navigation, Pagination]}
            className="mySwiper"
          >
            {photos ? (
              <>
                {photos?.map((photo, index) => (
                  <SwiperSlide key={index}>
                    <img src={photo} alt="slider_img" />
                  </SwiperSlide>
                ))}
              </>
            ) : (
              <>
                <SwiperSlide>
                  <img src="/assets/hotels/hotel_1.jpeg" alt="slider_img" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="/assets/hotels/hotel_2.jpeg" alt="slider_img" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src="/assets/hotels/hotel_3.jpeg" alt="slider_img" />
                </SwiperSlide>
              </>
            )}
          </Swiper>
        </div>
      </div>
    </Container>
  );
};

export default ListSlider;
