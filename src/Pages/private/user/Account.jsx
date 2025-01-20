import React from "react";
import UserDetails from "../../../components/Account/UserDetails/UserDetails";
import Footer from "../../../components/Footer/Footer";
import Navigation from "../../../components/Navigation/Navigation";

const Account = () => {
  return (
    <>
      <Navigation />
      <UserDetails />
      <Footer />
    </>
  );
};

export default Account;
