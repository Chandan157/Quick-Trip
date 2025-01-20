import React from "react";
import "./hotelLists.scss";
import HotelList from "../../Hotel/HotelList/HotelList";
import Container from "../../../layout/container/Container";

const HotelLists = ({ data, loading, place, properties }) => {
  return (
    <Container>
      <section className="listContainer">
        <div className="hotel_list">
          <div className="hotel_list_heading">
            <div>
              <p>{place}</p>
              <p>{properties} properties found</p>
            </div>
            {/* <div>
						<button>search</button>
					</div> */}
          </div>
          <div className="hotel_list_main_container">
            {loading ? (
              "loading"
            ) : (
              <>
                {data?.map((item, index) => (
                  <HotelList key={index} item={item} />
                ))}
              </>
            )}
          </div>
        </div>
      </section>
    </Container>
  );
};

export default HotelLists;
