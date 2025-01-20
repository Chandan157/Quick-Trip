import React from "react";
import SingleBlog from "../components/BlogDetails/SingleBlog/SingleBlog";
import Footer from "../components/Footer/Footer";
import Navigation from "../components/Navigation/Navigation";

const BlogDetails = () => {
  return (
    <>
      <Navigation />
      <SingleBlog />
      <Footer />
    </>
  );
};

export default BlogDetails;
