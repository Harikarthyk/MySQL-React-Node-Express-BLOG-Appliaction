import db from "../config/db";

export const getAllBlogFromDB = () => {
	return fetch(`${db}/all/blog`)
		.then((result) => result.json())
		.catch((error) => console.error(error));
};

export const getBlogInfoByBlogId = (blogId) => {
	return fetch(`${db}/blog/${blogId}`)
		.then((result) => result.json())
		.catch((error) => console.error(error));
};

export const addBlogtoDB = (input, userId) => {
	return fetch(`${db}/add/blog/${userId}`, {
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
	return fetch(`${db}/update/comment/${userId}/${blogId}`, {
		method: "PUT",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(input),
	})
		.then((result) => result.json())
		.catch((error) => console.error(error));
};

export const likeBlogByBlogIdDB = (userId, blogId) => {
	return fetch(`${db}/add/like/${userId}/${blogId}`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	})
		.then((result) => result.json())
		.catch((error) => console.error(error));
};

export const removelikeBlogByBlogIdDB = (userId, blogId) => {
	return fetch(`${db}/remove/like/${userId}/${blogId}`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	})
		.then((result) => result.json())
		.catch((error) => console.error(error));
};

export const dislikeBlogByBlogIdDB = (userId, blogId) => {
	return fetch(`${db}/add/dislike/${userId}/${blogId}`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	})
		.then((result) => result.json())
		.catch((error) => console.error(error));
};

export const removedislikeBlogByBlogIdDB = (userId, blogId) => {
	return fetch(`${db}/remove/dislike/${userId}/${blogId}`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	})
		.then((result) => result.json())
		.catch((error) => console.error(error));
};

//Bookmark

export const addBookMarkDB = (userId, blogId) => {
	return fetch(`${db}/add/bookmark/${userId}/${blogId}`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	})
		.then((result) => result.json())
		.catch((error) => console.error(error));
};

export const RemoveBookMarkDB = (userId, blogId) => {
	return fetch(`${db}/remove/bookmark/${userId}/${blogId}`, {
		method: "DELETE",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	})
		.then((result) => result.json())
		.catch((error) => console.error(error));
};

export const allBookMarkByBlogIdDB = (blogId) => {
	return fetch(`${db}/all/bookmark/blog/${blogId}`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	})
		.then((result) => result.json())
		.catch((error) => console.error(error));
};

export const allBookMarkByUserIdDB = (userId) => {
	return fetch(`${db}/all/bookmark/user/${userId}`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	})
		.then((result) => result.json())
		.catch((error) => console.error(error));
};
