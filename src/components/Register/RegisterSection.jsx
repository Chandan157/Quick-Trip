import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FaAngleLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./register.scss";

const RegisterSection = ({ accountType, title }) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(accountType);
    console.log({ ...data, role: accountType });
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/v1/auth/register`, {
        ...data,
        role: accountType,
      });
      toast.success("Registration Successful");
      navigate("/login");
    } catch (err) {
      toast.error("Input is not valid");
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
        <p className="main_heading">{title}</p>
        <form onSubmit={handleSubmit(onSubmit)} className="reg_container">
          <div className="reg_input">
            <p className="label">Full name</p>
            <input
              className="input_primary"
              type="text"
              placeholder="Enter your name"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 4,
                  message: "Name must be at least 4 characters long",
                },
              })}
            />
            {errors.name && (
              <div className="input_error">{errors.name.message}</div>
            )}
          </div>
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
            Submit
          </button>
          <p className="reg_option">
            Already have an account? <Link to="/login">Login now</Link>
          </p>
          {accountType === "user" && (
            <p className="reg_option reg_option_sub">
              Are you a hotel?
              <Link to="/register-hotel"> Register as hotel</Link>
            </p>
          )}
          {accountType === "hotel" && (
            <p className="reg_option reg_option_sub">
              Are you a user? <Link to="/register">Register now</Link>
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default RegisterSection;
