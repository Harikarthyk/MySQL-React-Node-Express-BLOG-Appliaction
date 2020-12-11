import React from "react";
import "./Result.css";

function Result({error, message}) {
	if (message.length <= 0) return "";
	return (
		<div
			style={error ? {background: "#B56576"} : {background: "#7BC950"}}
			className='result'
		>
			{message}
		</div>
	);
}

export default Result;
