import React, { useContext, useEffect, useRef } from "react";
import { Cart } from "../../context/CartContext";
import Backdop from "../Backdop/Backdop";
import { AiFillMinusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

const CartPopup = ({ setCart }) => {
	const { cart, dispatch } = useContext(Cart);

	// close dropDown
	let cartRef = useRef();
	useEffect(() => {
		let handler = (event) => {
			if (!cartRef.current.contains(event.target)) {
				setCart(false);
			}
		};
		document.addEventListener("mousedown", handler);
		return () => {
			document.removeEventListener("mousedown", handler);
		};
	});

	return (
		<Backdop>
			<div className="cartPopup" ref={cartRef}>
				<h3>Favorites ({cart.length}):</h3>
				<div className="cartPopup_container">
					{cart.length !== 0 ? (
						<>
							{cart?.map((item, index) => (
								<Link to={`/hotel/${item._id}`} key={index}>
									<div className="cartPopup_hotel">
										<div>
											<img
												className="hotel_img"
												src="/assets/hotels/hotel_1.jpeg"
												alt="hotel"
											/>
										</div>
										<div>
											<p onClick={() => setCart(false)} className="header_ho">
												{item.title}
											</p>
											<p>${item.cheapestPrice}/Night</p>
										</div>
										<div
											className="hd_share_icn"
											onClick={() =>
												dispatch({
													type: "REMOVE_FROM_CART",
													payload: { product: item._id },
												})
											}
										>
											<AiFillMinusCircle className="icn" />
										</div>
									</div>
								</Link>
							))}
						</>
					) : (
						<p className="wishlist">Favorites is empty</p>
					)}
				</div>
			</div>
		</Backdop>
	);
};

export default CartPopup;
