import axios from "axios";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AuthContext } from "../../../context/AuthContext";
import "./__components/setHotel/setHotel.scss";

const AddRoom = () => {
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function submitForm(data) {
    const roomNumbers = data.roomNumbers
      .split(",")
      .map((number) => ({ number: parseInt(number.trim()) }));

    delete data.roomNumbers;
    const requestData = { ...data, roomNumbers };

    console.log(requestData);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/v1/room`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.access_token}`,
          },
        }
      );
      toast.success("Hotel added successfully");
    } catch (err) {
      toast.error("Something went wrong");
    }
  }

  return (
    <section className="set_hotel_data">
      <h3>Add Room</h3>
      <br />
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="reg_input">
          <p className="label">Room title</p>
          <input
            className="input_primary"
            type="text"
            placeholder="Enter title"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <div className="input_error">{errors.title.message}</div>
          )}
        </div>
        <div className="reg_input">
          <p className="label">Full description</p>
          <textarea
            className="textarea_primary"
            type="text"
            placeholder="Enter description"
            {...register("desc", {
              required: "Description is required",
            })}
          />
          {errors.desc && (
            <div className="input_error">{errors.desc.message}</div>
          )}
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <div className="reg_input">
            <p className="label">Price</p>
            <input
              className="input_primary"
              type="text"
              placeholder="Enter Price"
              {...register("price", { required: "Price is required" })}
            />
            {errors.price && (
              <div className="input_error">{errors.price.message}</div>
            )}
          </div>
          <div className="reg_input">
            <p className="label">Number of beds</p>
            <input
              className="input_primary"
              type="text"
              placeholder="Enter Price"
              {...register("beds", { required: "Bed number is required" })}
            />
            {errors.beds && (
              <div className="input_error">{errors.beds.message}</div>
            )}
          </div>
          <div className="reg_input">
            <p className="label">Total bathrooms</p>
            <input
              className="input_primary"
              type="text"
              placeholder="Enter total no of baths"
              {...register("bathroom", {
                required: "Bathroom number is required",
              })}
            />
            {errors.bathroom && (
              <div className="input_error">{errors.bathroom.message}</div>
            )}
          </div>
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <div className="reg_input">
            <p className="label">Max people</p>
            <input
              className="input_primary"
              type="text"
              placeholder="Enter Price"
              {...register("maxPeople", { required: "Max people is required" })}
            />
            {errors.maxPeople && (
              <div className="input_error">{errors.maxPeople.message}</div>
            )}
          </div>
          <div className="reg_input">
            <p className="label">Room size in sq.ft</p>
            <input
              className="input_primary"
              type="text"
              placeholder="Room size"
              {...register("area", {
                required: "Room size number is required",
              })}
            />
            {errors.area && (
              <div className="input_error">{errors.area.message}</div>
            )}
          </div>
        </div>
        <div className="reg_input">
          <p className="label">Room Numbers</p>
          <input
            className="input_primary"
            type="text"
            placeholder="Enter room numbers (comma-separated)"
            {...register("roomNumbers", {
              required: "Room numbers are required",
            })}
          />
          {errors.roomNumbers && (
            <div className="input_error">{errors.roomNumbers.message}</div>
          )}
        </div>
        <button className="btn_primary" type="submit">
          Submit
        </button>
      </form>
    </section>
  );
};

export default AddRoom;
