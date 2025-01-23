import React from "react";
import { Link } from "react-router-dom";
import useFetch from "../../../services/apiRequest";
import Skeleton from "../../Skeleton/Skeleton";
import "./properties.scss";
import Container from "../../../layout/container/Container";

const images = [
  "/assets/property/puri.jpg",
  "/assets/property/india-gate-delhi-4-attr-hero.jpg",
  "/assets/property/cultural.png",
  "/assets/property/modern.jpg",
  "/assets/property/museum.webp",
];

const Properties = () => {
  const { data, loading } = useFetch("/v1/hotel/countByType");

  return (
    <section className="properties">
      <Container>
        <div className="properties_wrapper">
          <h2 className="main_heading">Browse by Category</h2>
          <p className="heading_des">
            Popular places to Visit and Experience!
          </p>
          <div className="property_container">
            {loading ? (
              <>
                {[...Array(5)].map((x, i) => (
                  <Skeleton key={i} type="property" />
                ))}
              </>
            ) : (
              <>
                {data &&
                  images.map((img, i) => (
                    <Link
                      to={`/type/${data[i]?.type}/${data[i]?.count}`}
                      className="card"
                      key={i}
                    >
                      <img src={img} alt="property" />
                      <p className="heading">{data[i]?.type}</p>
                      <p className="para">
                        {data[i]?.count} {data[i]?.type}
                      </p>
                    </Link>
                  ))}
              </>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Properties;
