import db from "../config/db";
import {isAuthenticated} from "./user";

export const getAllBlogFromDB = () => {
	return fetch(`${db}/all/blog`)
		.then((result) => result.json())
		.catch((error) => console.error(error));
};

export const getBlogInfoByBlogId = (blogId) => {
	return fetch(`${db}/blog/${blogId}`, {
		method: "GET",
	})
		.then((result) => result.json())
		.catch((error) => console.error(error));
};

export const addBlogtoDB = (input, userId) => {
	const {token} = isAuthenticated();
	if (!token) {
		alert("Unauthorized to access it");
		return;
	}
	return fetch(`${db}/add/blog/${userId}`, {
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

export const getAllCommentForBlogFromDB = (blogId) => {
	return fetch(`${db}/all/comments/${blogId}`, {
		method: "GET",
	})
		.then((result) => result.json())
		.catch((error) => console.error(error));
};

export const getBlogInfoFromDb = (blogId) => {
	return fetch(`${db}/blog/${blogId}`, {
		method: "GET",
	})
		.then((result) => result.json())
		.catch((error) => console.error(error));
};

export const updateBlogFromFB = (input, userId, blogId) => {
	const {token} = isAuthenticated();
	if (!token) {
		alert("Unauthorized to access it");
		return;
	}
	return fetch(`${db}/update/comment/${userId}/${blogId}`, {
		method: "PUT",
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

export const likeBlogByBlogIdDB = (userId, blogId) => {
	const {token} = isAuthenticated();
	if (!token) {
		alert("Unauthorized to access it");
		return;
	}
	return fetch(`${db}/add/like/${userId}/${blogId}`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((result) => result.json())
		.catch((error) => console.error(error));
};

export const removelikeBlogByBlogIdDB = (userId, blogId) => {
	const {token} = isAuthenticated();
	if (!token) {
		alert("Unauthorized to access it");
		return;
	}
	return fetch(`${db}/remove/like/${userId}/${blogId}`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((result) => result.json())
		.catch((error) => console.error(error));
};

export const dislikeBlogByBlogIdDB = (userId, blogId) => {
	const {token} = isAuthenticated();
	if (!token) {
		alert("Unauthorized to access it");
		return;
	}
	return fetch(`${db}/add/dislike/${userId}/${blogId}`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((result) => result.json())
		.catch((error) => console.error(error));
};

export const removedislikeBlogByBlogIdDB = (userId, blogId) => {
	const {token} = isAuthenticated();
	if (!token) {
		alert("Unauthorized to access it");
		return;
	}
	return fetch(`${db}/remove/dislike/${userId}/${blogId}`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((result) => result.json())
		.catch((error) => console.error(error));
};

export const deleteBlogByBlogId = (blogId) => {
	const {token} = isAuthenticated();
	if (!token) {
		alert("Unauthorized to access it");
		return;
	}
	return fetch(`${db}/blog/${blogId}`, {
		method: "DELETE",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((result) => result.json())
		.catch((error) => console.error(error));
};

//Bookmark

export const addBookMarkDB = (userId, blogId) => {
	const {token} = isAuthenticated();
	if (!token) {
		alert("Unauthorized to access it");
		return;
	}
	return fetch(`${db}/add/bookmark/${userId}/${blogId}`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((result) => result.json())
		.catch((error) => console.error(error));
};

export const RemoveBookMarkDB = (userId, blogId) => {
	const {token} = isAuthenticated();
	if (!token) {
		alert("Unauthorized to access it");
		return;
	}
	return fetch(`${db}/remove/bookmark/${userId}/${blogId}`, {
		method: "DELETE",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((result) => result.json())
		.catch((error) => console.error(error));
};

export const allBookMarkByBlogIdDB = (blogId) => {
	const {token} = isAuthenticated();
	if (!token) {
		alert("Unauthorized to access it");
		return;
	}
	return fetch(`${db}/all/bookmark/blog/${blogId}`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		Authorization: `Bearer ${token}`,
	})
		.then((result) => result.json())
		.catch((error) => console.error(error));
};

export const allBookMarkByUserIdDB = (userId) => {
	const {token} = isAuthenticated();
	if (!token) {
		alert("Unauthorized to access it");
		return;
	}
	return fetch(`${db}/all/bookmark/user/${userId}`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		Authorization: `Bearer ${token}`,
	})
		.then((result) => result.json())
		.catch((error) => console.error(error));
};
