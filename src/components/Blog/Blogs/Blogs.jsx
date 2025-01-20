import React from "react";
import "./blogs.scss";
import { Link } from "react-router-dom";

import { blogPost } from "../blogPost";

const Blogs = () => {
	return (
		<section className="blogs">
			{blogPost.map((item, index) => (
				<Link to={`/blog/${item.id}`} className="single_blog" key={index}>
					<img src={item.img} alt="blog_posters" />
					<div className="blog_details">
						<div>
							<div className="tag_container">
								<p className="blog_tags">{item.tag}</p>
							</div>
							<h2>{item.title}</h2>
							<p>{item.sortPara}</p>
						</div>
						<div className="credit">
							<img
								className="avatar_imgage"
								src="/assets/avatar.png"
								alt="avatar"
							/>
							<div>
								<p>
									BY <b>Chandan</b> | {item.date}
								</p>
							</div>
						</div>
					</div>
				</Link>
			))}
		</section>
	);
};

export default Blogs;
