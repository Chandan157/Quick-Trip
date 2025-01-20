import axios from "axios";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FaAngleLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.scss";

const LoginSection = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/v1/auth/login`,
        data
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      toast.success("Login Successful");
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
      toast.error("Invalid username or password");
    }
  };

  return (
    <section className="login">
      <Link to={"/"}>
        <div className="reg_back" title="Back to home">
          <FaAngleLeft />
        </div>
      </Link>
      <div className="reg_main_container">
        <img className="reg_logo_main" src="/assets/logo.png" alt="logo" />
        <p className="main_heading">Log in your Rental account</p>
        <form onSubmit={handleSubmit(onSubmit)} className="reg_container">
          <div className="reg_input">
            <p className="label">Email address</p>
            <input
              className="input_primary"
              type="email"
              placeholder="Enter email address"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <div className="input_error">{errors.email.message}</div>
            )}
          </div>
          <div className="reg_input">
            <p className="label">Password</p>
            <input
              className="input_primary"
              type="password"
              placeholder="Enter password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              })}
            />
            {errors.password && (
              <div className="input_error">{errors.password.message}</div>
            )}
          </div>
          <button type="submit" className="btn_primary">
            Login
          </button>
          <p className="reg_option">
            New user? <Link to="/register">Create an account</Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default LoginSection;
