import db from "../config/db";

export const addCommenttoDB = (input, userId, blogId) => {
	return fetch(`${db}/add/comment/${userId}/${blogId}`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(input),
	})
		.then((result) => result.json())
		.catch((error) => console.error(error));
};
