import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Backdop from "../Backdop/Backdop";

export const logOut = () => {
  localStorage.removeItem("user");
  window.location.reload(false);
};

const Settings = ({ setSettings }) => {
  // close dropDown
  let settingRef = useRef();
  useEffect(() => {
    let handler = (event) => {
      if (!settingRef.current.contains(event.target)) {
        setSettings(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <Backdop>
      <div className="cartPopup" ref={settingRef}>
        <p>Settings</p>
        <div className="cartPopup_container">
          <ul>
            <li>
              <Link onClick={() => setSettings(false)} to="/user/my-account">
                User Profile
              </Link>
            </li>
            <li>
              <Link onClick={() => setSettings(false)} to="/user/my-bookings">
                My Bookings
              </Link>
            </li>
            <li>
              <Link onClick={logOut} to={"/"}>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </Backdop>
  );
};

export default Settings;
