import React, {useContext, useEffect} from "react";
import "./Navbar.css";
import {FaStar, FaUser} from "react-icons/fa";
import {Link} from "react-router-dom";
import {isAuthenticated, logout} from "../Helper/user";
import UserContext from "../UserContext";

function Navbar() {
	const context = useContext(UserContext);
	const {stateUser, setStateUser} = context;
	const handleLogin = () => {
		logout()
			.then((result) => {
				if (result.error) {
					console.error(result.error);
					return;
				}
				// settingStateUser();
				setStateUser(false);
				return;
			})
			.catch((error) => console.error(error));
	};
	useEffect(() => {
		let {user} = isAuthenticated();
		if (user) {
			setStateUser(user);
		} else setStateUser(false);
	}, [setStateUser]);
	return (
		<div className='Navbar'>
			<Link to='/' className='Navbar__brand'>
				<img
					src='https://user-images.githubusercontent.com/54505967/101441960-4ef06680-3940-11eb-8862-3596ce151a5d.png'
					alt='write_blog'
				/>
			</Link>
			<div className='Navbar__body'>
				{stateUser ? (
					<div style={{fontSize: "12px"}} className='Navbar__body__label'>
						Hello {stateUser.name}
						<div
							onClick={() => handleLogin()}
							className='Navbar__body__label__inner'
						>
							Logout
						</div>
					</div>
				) : (
					<div style={{fontSize: "12px"}} className='Navbar__body__label'>
						Hello Guest
						<Link to='/login' className='Navbar__body__label__inner'>
							Login
						</Link>
					</div>
				)}
				{stateUser ? (
					<Link to='/user' className='Navbar__body__label__inner'>
						<FaUser />
					</Link>
				) : (
					""
				)}
				<Link
					to='/favouirtes'
					style={{flexDirection: "row", marginTop: "1px", alignItems: "center"}}
					className='Navbar__body__label'
				>
					<FaStar style={{margin: "0 8px"}} /> Favourites
				</Link>
			</div>
		</div>
	);
}

export default Navbar;
