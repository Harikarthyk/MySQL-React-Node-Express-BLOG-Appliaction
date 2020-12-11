import "./Login.css";
import React, {useContext, useEffect, useState} from "react";
import {Link, Redirect} from "react-router-dom";
import {authenticate, isAuthenticated, loginConnect} from "../Helper/user";
import UserContext from "../UserContext";
import Result from "./Result";

function Login() {
	const context = useContext(UserContext);
	const {stateUser, setStateUser} = context;
	const [input, setInput] = useState({
		email: "",
		password: "",
	});
	const [output, setOutput] = useState({
		error: false,
		message: "",
	});
	useEffect(() => {
		let {user} = isAuthenticated();
		if (user) {
			setStateUser(user);
		} else setStateUser(false);
	}, [setStateUser]);
	const handleClick = (e) => {
		e.preventDefault();
		loginConnect(input)
			.then((result) => {
				if (result.error) {
					console.error(result.error);
					setOutput({...output, message: result.error, error: true});
					return;
				}
				setStateUser(result.user);
				setInput({...input, password: "", email: ""});
				setOutput({...output, message: "Login successfull", error: false});
				authenticate(result);
			})
			.catch((error) => console.error(error));
	};
	if (stateUser) return <Redirect to='/' />;
	return (
		<>
			<h1 className='login__title'>Login Page</h1>
			<div className='login'>
				<div className='login__leftSide'>
					<form className='login__leftSide__body'>
						<div className='login__leftSide__body__label'>Email</div>
						<input
							className='login__leftSide__body__inputField'
							type='email'
							value={input.email}
							onChange={(e) => setInput({...input, email: e.target.value})}
							required
						/>
						<div className='login__leftSide__body__label'>Password</div>
						<input
							className='login__leftSide__body__inputField'
							type='password'
							value={input.password}
							onChange={(e) => setInput({...input, password: e.target.value})}
							required
						/>
						<Result error={output.error} message={output.message} />
						<div className='login__leftSide__body__button'>
							<button onClick={(e) => handleClick(e)} type='submit'>
								Login
							</button>
						</div>
						<Link to='forgotPassword' className='login__leftSide__body__forgot'>
							forgot your password ?
						</Link>
					</form>
				</div>
				<div className='login__rightSide'>
					<div className='login__rightSide__text'>New User 👨🏼‍🎓 ? </div>
					<Link className='login__rightSide__link' to='/createAccount'>
						Create an Account
					</Link>
				</div>
			</div>
		</>
	);
}

export default Login;
