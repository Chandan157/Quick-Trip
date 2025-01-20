import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import Navigation from "../../../../components/Navigation/Navigation";
import "./layout.scss";
import Container from "../../../../layout/container/Container";
import { logOut } from "../../../../components/Navigation/Settings";
import { AuthContext } from "../../../../context/AuthContext";

const Layout = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      <Navigation />
      <div className="user_layout">
        <Container>
          <div className="user_layout_container">
            {/* left side bar */}
            <div className="user_layout_sidebar">
              <div className="user_layout_profile">
                <img src={"/assets/avatar.png"} alt="default_user" />
                <p>{user?.name}</p>
              </div>
              <nav className="user_layout_nav">
                <ul>
                  <li>
                    <Link to="/dashboard/hotel">Hotel Profile</Link>
                  </li>
                  <li>
                    <Link to="/dashboard/hotel/list-room">View Rooms</Link>
                  </li>
                  <li>
                    <Link to="/dashboard/hotel/add-room">Add Rooms</Link>
                  </li>
                  <li>
                    <Link to="/user/my-account">Change Password</Link>
                  </li>
                  <li>
                    <Link onClick={logOut} to={"/"}>
                      Logout
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
            {/* right side  */}
            <div className="user_layout_outlet_container">
              <Outlet />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Layout;
