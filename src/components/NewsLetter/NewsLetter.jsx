import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import "./newsLetter.scss";
import Container from "../../layout/container/Container";

const NewsLetter = () => {
  const [emailID, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    if (!regEx.test(emailID)) {
      return toast.error("Enter a vaild email");
    }
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/v1/newsLetter`, {
        email: emailID,
      });
      toast.success("Email submit successfully");
    } catch (err) {
      toast.error("Enter a vaild email *");
    }
    setEmail("");
  };
  return (
    <Container>
      <section className="news_letter">
        <div className="news_content">
          <p className="news_heading">Join our newsletter 🎉</p>
          <p className="news_para">
            Read and share new perspectives on just about any topic. Everyone’s
            welcome.
          </p>
          <div className="news_content_options">
            <div className="news_content_options_card">
              <div className="first_option_card">01</div>
              <p>Get more discount</p>
            </div>
            <div className="news_content_options_card">
              <div className="second_option_card">02</div>
              <p>Get premium magazines</p>
            </div>
          </div>
          <div className="input_container">
            <input
              type="email"
              placeholder="Enter your email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <button className="btn_primary" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
        <div className="news_img">
          <img src="/assets/newsletter.png" alt="newsletter_img" />
        </div>
      </section>
    </Container>
  );
};

export default NewsLetter;
