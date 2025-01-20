import "./userDetails.scss";

const UserDetails = () => {
	return (
		<section className="userDetails">
			<h2>Account infomation</h2>
			<div className="userDetails_container">
				<img src="/assets/avatar.png" alt="avatar" />
				<div className="reg_container">
					<div className="reg_input">
						<p>User ID</p>
						<input type="email" name="email" />
					</div>
					<div className="reg_input">
						<p>Password</p>
						<input type="password" name="password" />
					</div>
					<div className="reg_input">
						<p>Confirm Password</p>
						<input type="password" name="password" />
					</div>
					<button className="btn_primary">Change Password</button>
					{/* <p className="reg_option">
					New user? <Link to="/register">Create an account</Link>
				</p> */}
				</div>
			</div>
		</section>
	);
};

export default UserDetails;
