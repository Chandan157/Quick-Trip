import React from "react";
import { Link } from "react-router-dom";
import "./notFound.scss";

const NotFound = ({details,link}) => {
	return (
		<div className="not_found">
			<img src="/assets/search_not_found.jpg" alt="search_404" />
			<p>
				{details} <Link to="/">{link}</Link>
			</p>
		</div>
	);
};

export default NotFound;
