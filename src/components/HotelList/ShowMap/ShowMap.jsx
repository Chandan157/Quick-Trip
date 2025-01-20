import React from "react";
import "./showmap.scss";
import Maps from "../../Maps/Maps";
import Container from "../../../layout/container/Container";

const ShowMap = ({ products }) => {
  return (
    <Container>
      <div className="showmap_container">
        {products?.latitude && (
          <Maps lat={products?.latitude} lon={products?.longitude} />
        )}
      </div>
    </Container>
  );
};

export default ShowMap;
