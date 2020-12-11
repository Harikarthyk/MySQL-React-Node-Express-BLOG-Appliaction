import React, {useContext, useEffect, useState} from "react";
import {Link, Redirect} from "react-router-dom";
import {createAccoutConnect, isAuthenticated} from "../Helper/user";
import UserContext from "../UserContext";
import Result from "./Result";

function CreateAccount() {
	const [input, setInput] = useState({
		email: "",
		password: "",
		name: "",
	});
	const context = useContext(UserContext);
	const {stateUser, setStateUser} = context;

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
		createAccoutConnect(input).then((result) => {
			if (result.error) {
				console.error(result.error);
				setOutput({...output, message: result.error, error: true});
				return;
			}
			setInput({...input, password: "", name: "", email: ""});
			setOutput({
				...output,
				message: "Account created Successfully , login to continue",
				error: false,
			});
		});
	};
	if (stateUser) return <Redirect to='/' />;

	return (
		<>
			<h1 className='login__title'>Create your account</h1>
			<div className='login'>
				<div className='login__leftSide'>
					<form className='login__leftSide__body'>
						<div className='login__leftSide__body__label'>Name</div>
						<input
							className='login__leftSide__body__inputField'
							type='text'
							required
							value={input.name}
							onChange={(e) => setInput({...input, name: e.target.value})}
						/>

						<div className='login__leftSide__body__label'>Email</div>
						<input
							className='login__leftSide__body__inputField'
							type='email'
							required
							value={input.email}
							onChange={(e) => setInput({...input, email: e.target.value})}
						/>
						<div className='login__leftSide__body__label'>Password</div>
						<input
							className='login__leftSide__body__inputField'
							type='password'
							required
							value={input.password}
							onChange={(e) => setInput({...input, password: e.target.value})}
						/>
						<Result error={output.error} message={output.message} />
						<div className='login__leftSide__body__button'>
							<button type='submit' onClick={(e) => handleClick(e)}>
								Create Account
							</button>
						</div>
					</form>
				</div>
				<div className='login__rightSide'>
					<div className='login__rightSide__text'>
						Already have an Account 👨🏼‍💻 ?
					</div>
					<Link className='login__rightSide__link' to='/login'>
						Login
					</Link>
				</div>
			</div>
		</>
	);
}

export default CreateAccount;
