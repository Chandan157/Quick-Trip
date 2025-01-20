import React, { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { AuthContext } from "../../../../../context/AuthContext";
import "./setHotel.scss";
import Maps from "../../../../../components/Maps/Maps";
import SearchLocation from "./SearchLocation";

const SetHotel = () => {
  const [images, setImages] = useState([]);
  const [listPlace, setListPlace] = useState(null);
  const fileInputRef = useRef(null);
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  /* image functionality start */

  function selectFiles() {
    fileInputRef.current.click();
  }

  function onFileSelect(e) {
    const files = e.target.files;
    if (files.length === 0) {
      return;
    }

    const validImages = [];
    for (let i = 0; i < files.length; i++) {
      if (files[i] && files[i].type.split("/")[0] !== "image") {
        continue;
      }
      if (!validImages.some((img) => img.name === files[i].name)) {
        validImages.push({
          name: files[i].name,
          url: URL.createObjectURL(files[i]),
          file: files[i],
        });
      }
    }
    setImages((prev) => [...prev, ...validImages]);
  }

  function deSelectImage(index) {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  /* image functionality end */

  async function submitForm(data) {
    if (!listPlace) {
      toast.error("Please select address");
      return;
    }

    try {
      const formData = new FormData();
      // Append form data
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("address", listPlace?.display_name);
      formData.append("latitude", listPlace?.lat);
      formData.append("longitude", listPlace?.lon);
      formData.append("city", data.city);
      formData.append("type", data.type);
      formData.append("distance", data.distance);
      formData.append("cheapestPrice", data.cheapestPrice);
      formData.append("featured", data.featured);
      formData.append("freeTaxi", data.freeTaxi);
      formData.append("freeCancel", data.freeCancel);

      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i].file);
      }

      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/v1/hotel`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.access_token}`,
          },
        }
      );
      toast.success("Hotel added successful");
    } catch (err) {
      toast.error("Something went wrong");
    }
  }
  return (
    <section className="set_hotel_data">
      <h3>Add Profile</h3>
      <br />
      <form onSubmit={handleSubmit(submitForm)}>
        <p className="label">Select images</p>
        <div className="img_input">
          {images.length === 0 ? (
            <div className="drag_area" onClick={selectFiles}>
              Drag & drop image here or <span className="select">Browse</span>
              <input
                accept="image/*"
                type="file"
                className="file"
                multiple
                ref={fileInputRef}
                onChange={onFileSelect}
              />
            </div>
          ) : (
            <div className="img_container">
              {images.map((image, index) => (
                <div className="image" key={index}>
                  <span className="delete" onClick={() => deSelectImage(index)}>
                    &times;
                  </span>
                  <img src={image.url} alt="photod" />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="reg_input">
          <p className="label">Title</p>
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
            {...register("description", {
              required: "Description is required",
            })}
          />
          {errors.description && (
            <div className="input_error">{errors.description.message}</div>
          )}
        </div>

        <div className="leaflet_add_input">
          <Maps lat={listPlace?.lat} lon={listPlace?.lon} />
        </div>

        <SearchLocation listPlace={listPlace} setListPlace={setListPlace} />

        <div className="reg_input">
          <p className="label">City</p>
          <select
            className="select_primary"
            {...register("city", { required: "Type is required" })}
          >
            <option value="delhi">Delhi</option>
            <option value="kolkata">Kolkata</option>
            <option value="uttar-pradesh">Uttar Pradesh</option>
            <option value="gujarat">Gujarat</option>
            <option value="rajasthan">Rajasthan</option>
            <option value="bengaluru">Bengaluru</option>
          </select>
          {errors.city && (
            <div className="input_error">{errors.city.message}</div>
          )}
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <div className="reg_input">
            <p className="label">Type</p>
            <select
              className="select_primary"
              {...register("type", { required: "Type is required" })}
            >
              <option value="hotels">hotels</option>
              <option value="apartments">apartments</option>
              <option value="resorts">resorts</option>
              <option value="villas">villas</option>
              <option value="cabins">cabins</option>
            </select>
            {errors.type && (
              <div className="input_error">{errors.type.message}</div>
            )}
          </div>
          <div className="reg_input">
            <p className="label">Dtstance in KM</p>
            <input
              className="input_primary"
              type="text"
              placeholder="Enter title"
              {...register("distance", { required: "Distance is required" })}
            />
            {errors.distance && (
              <div className="input_error">{errors.distance.message}</div>
            )}
          </div>
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <div className="reg_input">
            <p className="label">Price</p>
            <input
              className="input_primary"
              type="text"
              placeholder="Enter Price"
              {...register("cheapestPrice", { required: "Price is required" })}
            />
            {errors.cheapestPrice && (
              <div className="input_error">{errors.cheapestPrice.message}</div>
            )}
          </div>
          <div className="reg_input">
            <p className="label">Featured</p>
            <select
              className="select_primary"
              {...register("featured", { required: "Type is required" })}
            >
              <option value="true">true</option>
              <option value="false">false</option>
            </select>
            {errors.featured && (
              <div className="input_error">{errors.featured.message}</div>
            )}
          </div>
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <div className="reg_input">
            <p className="label">Free taxi service</p>
            <select
              className="select_primary"
              {...register("freeTaxi", { required: "Type is required" })}
            >
              <option value="true">true</option>
              <option value="false">false</option>
            </select>
            {errors.freeTaxi && (
              <div className="input_error">{errors.freeTaxi.message}</div>
            )}
          </div>
          <div className="reg_input">
            <p className="label">Free cancel service</p>
            <select
              className="select_primary"
              {...register("freeCancel", {
                required: "FreeCancel is required",
              })}
            >
              <option value="true">true</option>
              <option value="false">false</option>
            </select>
            {errors.freeCancel && (
              <div className="input_error">{errors.freeCancel.message}</div>
            )}
          </div>
        </div>
        <button className="btn_primary" type="submit">
          Submit
        </button>
      </form>
    </section>
  );
};

export default SetHotel;
