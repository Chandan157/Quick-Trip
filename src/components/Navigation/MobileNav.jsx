import { Link } from "react-router-dom";

const MobileNav = ({ mobNav, setMobNav }) => {
	return (
		<div onClick={() => setMobNav(false)} className={mobNav ? "mobile_nav_menu" : "mobile_nav_menu show_menu"}>
			<div className="back_menu" onClick={() => setMobNav(false)}>
				<img src="/assets/icons/chevron-back-outline.svg" alt="back_icon" />
			</div>
			<ul>
				{["Home", "Destination", "Blog", "About"].map((item, index) => (
					<li key={index}>
						<Link to={`${item === "Home" ? "/" : item.trim().toLowerCase()}`}>
							{item}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default MobileNav;
