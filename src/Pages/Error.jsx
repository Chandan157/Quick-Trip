import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="not_found_page">
      <div className="not_found">
        <img src="/assets/search_not_found.jpg" alt="search_404" />
        <p>Oops! Look like you're lost</p>
        <Link to="/">
          <button className="input_primary">Back to the home</button>
        </Link>
      </div>
    </div>
  );
};

export default Error;
