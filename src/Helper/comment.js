import db from "../config/db";
import {isAuthenticated} from "./user";

export const addCommenttoDB = (input, userId, blogId) => {
	const {token} = isAuthenticated();
	if (!token) {
		alert("Unauthorized to access it");
		return;
	}
	return fetch(`${db}/add/comment/${userId}/${blogId}`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(input),
	})
		.then((result) => result.json())
		.catch((error) => console.error(error));
};
