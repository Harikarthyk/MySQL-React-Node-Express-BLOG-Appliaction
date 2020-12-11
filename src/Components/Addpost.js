import React, {useContext, useState} from "react";
import {addBlogtoDB} from "../Helper/blog";
import Result from "./Result";
import "./Addpost.css";
import UserContext from "../UserContext";
import {Redirect} from "react-router-dom";
function Addpost() {
	const context = useContext(UserContext);
	const {stateUser} = context;
	const [input, setInput] = useState({
		heading: "",
		value: "",
	});
	const [output, setOutput] = useState({
		error: false,
		message: "",
	});

	const handleClick = (e) => {
		e.preventDefault();
		addBlogtoDB(input, stateUser.user_id)
			.then((result) => {
				if (result.error) {
					setOutput({...output, error: true, message: result.error});
					return;
				}
				setOutput({
					...output,
					error: false,
					message: "Post added successfully",
				});
				setInput({...input, value: "", heading: ""});
			})
			.catch((error) => console.error(error));
	};
	if (!stateUser) return <Redirect to='/login' />;
	return (
		<form className='addpost'>
			<Result error={output.error} message={output.message} />
			<div className='addpost__input'>
				<div className='addpost__label'>Heading</div>
				<div className='addpost__note'>Note : must be minimun 1 character</div>
				<textarea
					required
					className='addpost__heading'
					value={input.heading}
					onChange={(e) => setInput({...input, heading: e.target.value})}
				></textarea>
			</div>

			<div className='addpost__input'>
				<div className='addpost__label'>Start writting 🖊</div>
				<div className='addpost__note'>Note : must be minimun 50 character</div>
				<textarea
					required
					value={input.value}
					onChange={(e) => setInput({...input, value: e.target.value})}
					className='addpost__value'
				></textarea>
			</div>
			<Result error={output.error} message={output.message} />

			<div className='addpost__input'>
				<button
					disabled={input.heading.length <= 1 && input.value.length <= 50}
					onClick={(e) => handleClick(e)}
					type='submit'
				>
					POST
				</button>
			</div>
		</form>
	);
}

export default Addpost;
