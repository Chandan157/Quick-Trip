import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./singleBlog.scss";
import {FiArrowLeft} from "react-icons/fi";

import { blogPost } from "../../Blog/blogPost";

const SingleBlog = () => {
	const location = useLocation();
	const blogId = location.pathname.split("/")[2];
	const filteredData = blogPost.find((arr) => arr.id === blogId);


	return (
		<div className="single_blog_container">
			<Link to="/blog" className="back_to">
				<FiArrowLeft className="back_icn" />
				<p>Back to blog page</p>
			</Link>
			<img src={filteredData.img} alt="blog_poster" />
			<div>
				<div className="tag_container">
					<p className="blog_tags">{filteredData.tag}</p>
				</div>
				<h2>{filteredData.title}</h2>

				<p className="blog_para">{filteredData.para}</p>
			</div>
			<div className="credit">
				<img className="avatar_imgage" src="/assets/avatar.png" alt="avatar" />
				<div>
					<p>
						BY <b>Chandan</b> | {filteredData.date}
					</p>
				</div>
			</div>
			<div className="main_tag_container">
				{filteredData.tags.map((item, index) => (
					<p className="main_tags" key={index}>{item}</p>
				))}
			</div>
		</div>
	);
};

export default SingleBlog;
