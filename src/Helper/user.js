import db from "../config/db";

export const getUserInfoFromDB = (userId) => {
	return fetch(`${db}/user_info/${userId}`, {
		method: "GET",
		headers: {Accept: "application/json", "Content-Type": "application/json"},
	})
		.then((result) => result.json())
		.catch((error) => console.error(error));
};

export const loginConnect = (input) => {
	return fetch(`${db}/login`, {
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

export const authenticate = (data) => {
	if (typeof window !== undefined) {
		localStorage.setItem("user_jwt", JSON.stringify(data));
	}
};

export const isAuthenticated = () => {
	if (typeof window === undefined) {
		return false;
	}
	if (localStorage.getItem("user_jwt")) {
		return JSON.parse(localStorage.getItem("user_jwt"));
	}
	return false;
};

export const createAccoutConnect = (input) => {
	return fetch(`${db}/register`, {
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

export const logout = () => {
	if (typeof window !== undefined) {
		localStorage.removeItem("user_jwt");
		return fetch(`${db}/logout`, {
			method: "GET",
		})
			.then((res) => res.json())
			.catch((error) => console.log(error));
	}
};
