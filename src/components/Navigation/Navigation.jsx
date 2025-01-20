import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Avatar from "../Avatar/Avatar";
import CartPopup from "./CartPopup";
import MobileNav from "./MobileNav";
import Settings from "./Settings";
import "./navigation.scss";
import Container from "../../layout/container/Container";

const Navigation = () => {
  const [nav, setNav] = useState(false);
  const [mobNav, setMobNav] = useState(false);
  const [cartCon, setCartCon] = useState(false);
  const [settings, setSettings] = useState(false);

  const { user } = useContext(AuthContext);
  // const { cart } = useContext(Cart);

  function changeBackground() {
    if (window.scrollY >= 500) {
      setNav(true);
    } else {
      setNav(false);
    }
  }

  window.addEventListener("scroll", changeBackground);

  return (
    <>
      <nav className={nav ? "container active" : "container"}>
        <Container>
          <div className="nav_wrapper">
            <div className="left_wrapper">
              <Link to="/">
                <img
                  className="main_nav_img"
                  src="/assets/logo.png"
                  alt="main_logo"
                />
              </Link>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/">Listing</Link>
                </li>
                <li>
                  <Link to="/">About</Link>
                </li>
                <li>
                  <Link to="/">Contact</Link>
                </li>
              </ul>
            </div>
            <div className="right_wrapper">
              {user.access_token ? (
                <Avatar name={user.name} setSettings={setSettings} />
              ) : (
                <div className="btn_group">
                  <Link className="btn_secondary" to="/register">
                    Sign up
                  </Link>
                  <Link className="btn_primary" to="/login">
                    Log in
                  </Link>
                </div>
              )}
              {nav ? (
                <img
                  onClick={() => setMobNav(!mobNav)}
                  className="wishlist_icon nav_ham_burger"
                  src="/assets/icons/menu_black.png"
                  alt="grid_outline"
                />
              ) : (
                <img
                  onClick={() => setMobNav(!mobNav)}
                  className="wishlist_icon nav_ham_burger"
                  src="/assets/icons/menu_black.png"
                  alt="grid_outline"
                />
              )}
            </div>
          </div>
        </Container>
      </nav>
      <MobileNav mobNav={mobNav} setMobNav={setMobNav} />
      {cartCon && <CartPopup cart={cartCon} setCart={setCartCon} />}
      {settings && <Settings setSettings={setSettings} />}
    </>
  );
};

export default Navigation;
