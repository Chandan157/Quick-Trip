import { useContext } from "react";
import { AiFillHeart, AiFillStar } from "react-icons/ai";
import {
  BiCheckboxMinus,
  BiGroup,
  BiHeart,
  BiShareAlt,
  BiSolidTaxi,
} from "react-icons/bi";
import { Cart } from "../../../context/CartContext";

const LeftContainer = ({ item }) => {
  const { cart, dispatch } = useContext(Cart);
  return (
    <>
      <div className="hd_title">
        <div className="hd_heading">
          <p>{item?.title}</p>
          <p>{item?.address}</p>
          <p>
            <AiFillStar className="star_icn" /> {item?.rating} (3 Reviews){" "}
            {item?.city}
          </p>
        </div>
        <div className="hd_share">
          <BiShareAlt className="hd_share_icn" />
          {cart.some((p) => p._id === item._id) ? (
            <div
              onClick={() =>
                dispatch({
                  type: "REMOVE_FROM_CART",
                  payload: { product: item._id },
                })
              }
              className="hd_share_icn"
            >
              <AiFillHeart className="heart_logo" />
            </div>
          ) : (
            <div
              onClick={() =>
                dispatch({
                  type: "ADD_TO_CART",
                  payload: { product: item },
                })
              }
              className="hd_share_icn"
            >
              <BiHeart />
            </div>
          )}
        </div>
      </div>
      <div className="features_con">
        <div className="single_features">
          <BiGroup className="features_icn" />
          <p>
            <b>Type: </b>
            {item?.type}
          </p>
        </div>
        <div className="single_features">
          <BiCheckboxMinus className="features_icn" />
          <p>
            <b> Free Cancel:</b>
            {item?.freeCancel ? " Available" : " Not Available"}
          </p>
        </div>
        <div className="single_features">
          <BiSolidTaxi className="features_icn" />
          <p>
            <b>Free Taxi:</b> {item?.freeTaxi ? "Available" : "Not Available"}
          </p>
        </div>
      </div>
      <div className="u_line"></div>
      <div className="features_des">
        <p className="features_des_title">About this room</p>
        <p className="features_des_para">{item?.description}</p>
      </div>
    </>
  );
};

export default LeftContainer;
