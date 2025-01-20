import { Link } from "react-router-dom";
import "./footer.scss";

import { BsFacebook, BsInstagram, BsTwitter, BsYoutube } from "react-icons/bs";
import { AiFillGithub } from "react-icons/ai";

import Container from "../../layout/container/Container";

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <div className="footer_container">
          <div className="wrapper">
            <p className="foo_header">Support</p>
            <ul>
              <li>
                <Link to="/">Help Center</Link>
              </li>
              <li>
                <Link to="/">Our COVID-19 Response</Link>
              </li>
              <li>
                <Link to="/">Cancellation options</Link>
              </li>
              <li>
                <Link to="/">Safety information</Link>
              </li>
            </ul>
          </div>
          <div className="wrapper">
            <p className="foo_header">Company</p>
            <ul>
              <li>
                <Link to="/">About us</Link>
              </li>
              <li>
                <Link to="/">Community Blog</Link>
              </li>
              <li>
                <Link to="/">Careers</Link>
              </li>
              <li>
                <Link to="/">Privacy policy</Link>
              </li>
              <li>
                <Link to="/">Terms of service</Link>
              </li>
            </ul>
          </div>
          <div className="wrapper">
            <p className="foo_header">Contact</p>
            <ul>
              <li>
                <Link to="/">Partnerships</Link>
              </li>
              <li>
                <Link to="/">FAQ</Link>
              </li>
              <li>
                <Link to="/">Get in touch</Link>
              </li>
            </ul>
          </div>
          <div className="wrapper contact">
            <p className="foo_header">Contact</p>
            <ul>
              <li>
                <Link to="/" className="facebook">
                  <BsFacebook />
                </Link>
              </li>
              <li>
                <Link to="/" className="instagram">
                  <BsInstagram />
                </Link>
              </li>
              <li>
                <Link to="/" className="twitter">
                  <BsTwitter />
                </Link>
              </li>
              <li>
                <Link to="/" className="youtube">
                  <BsYoutube />
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="underline"></div>
        <div className="copyright">
          <p>
            © Copyright Rental 2022 | Educational Project | Chandan Debsingha
          </p>
          <a href="https://github.com/chandan157">
            <AiFillGithub />
          </a>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
