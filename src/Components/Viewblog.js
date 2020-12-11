import React, {useContext, useEffect, useState} from "react";
import "./Viewblog.css";
import {
	addBookMarkDB,
	allBookMarkByBlogIdDB,
	getAllCommentForBlogFromDB,
	getBlogInfoFromDb,
	dislikeBlogByBlogIdDB,
	likeBlogByBlogIdDB,
	removedislikeBlogByBlogIdDB,
	removelikeBlogByBlogIdDB,
	RemoveBookMarkDB,
} from "../Helper/blog";

import {Link, useHistory} from "react-router-dom";
import {getUserInfoFromDB} from "../Helper/user";
import {
	FaHome,
	FaRegComment,
	FaRegStar,
	FaRegThumbsDown,
	FaRegThumbsUp,
	FaStar,
	FaThumbsDown,
	FaThumbsUp,
} from "react-icons/fa";
import {addCommenttoDB} from "../Helper/comment";
import Result from "./Result";
import UserContext from "../UserContext";

function Viewblog() {
	const context = useContext(UserContext);
	const {stateUser} = context;
	const history = useHistory();
	const [blog, setBlog] = useState({});
	const [author, setAuthor] = useState("");
	const [comments, setComments] = useState([]);

	const [input, setInput] = useState({
		comment: "",
	});

	const [output, setOutput] = useState({
		error: false,
		message: "",
	});
	const [loading, setLoading] = useState(true);

	const [redo, setRedo] = useState(false);

	const [bookmarks, setBookmarks] = useState([]);

	//based on the url blog gets displayed
	useEffect(() => {
		let blogId = history.location.pathname.split("/")[3];
		getBlogInfoFromDb(blogId)
			.then((result) => {
				if (result.error) {
					console.error(result.error);
					return;
				}
				setBlog(result.blog);
				getUserInfoFromDB(result.blog.user_id).then((result) => {
					if (result.error) {
						console.error(result.error);
						return;
					}
					setAuthor(result.user);
					setLoading(false);
				});
				allComments();
			})
			.catch((error) => console.error(error));
	}, [history, redo]);

	//Check bookmarked blogs
	useEffect(() => {
		checkBookmarks();
	}, []);

	//function to check the bookmarks
	const checkBookmarks = () => {
		let blogId = history.location.pathname.split("/")[3];
		allBookMarkByBlogIdDB(blogId)
			.then((result) => {
				if (result.error) {
					return;
				}
				let arr = result.bookmarks.map((b) => b.user_id);
				setBookmarks(arr);
			})
			.catch((error) => console.error(error));
	};

	//Get All comments function
	const allComments = () => {
		let blogId = history.location.pathname.split("/")[3];
		getAllCommentForBlogFromDB(blogId)
			.then((result) => {
				if (result.error) {
					setLoading(false);

					console.error(result.error);
					return;
				}
				setComments(result.comments);
			})
			.catch((error) => console.error(error));
	};

	//Add comment Handle Listener
	const handleAddComment = (e) => {
		e.preventDefault();

		if (!stateUser) {
			alert("Login to add comments");
			return;
		}
		setLoading(true);
		addCommenttoDB(input, stateUser.user_id, blog.blog_id)
			.then((result) => {
				if (result.error) {
					setLoading(false);

					setOutput({...output, error: true, message: result.error});
					return;
				}
				setInput({...input, comment: ""});
				setOutput({...output, error: false, message: "comment posted"});
				allComments();
				setLoading(false);
			})
			.catch((error) => console.error(error));
	};

	const handleClickLike = (blogId) => {
		if (!stateUser) {
			alert("Login to add Like");
			return;
		}
		setLoading(true);
		if (blog.likes.includes(stateUser.user_id)) {
			removelikeBlogByBlogIdDB(stateUser.user_id, blogId)
				.then((result) => {
					console.log(result);
					setRedo(!redo);
				})
				.catch((error) => console.error(error));
		} else
			likeBlogByBlogIdDB(stateUser.user_id, blogId)
				.then((result) => {
					setRedo(!redo);
					console.log(result);
				})
				.catch((error) => console.error(error));
	};

	const handleClickDislike = (blogId) => {
		if (!stateUser) {
			alert("Login to add Like");
			return;
		}
		setLoading(true);

		if (blog.dislikes.includes(stateUser.user_id)) {
			removedislikeBlogByBlogIdDB(stateUser.user_id, blogId)
				.then((result) => {
					console.log(result);
					setRedo(!redo);
				})
				.catch((error) => console.error(error));
		} else
			dislikeBlogByBlogIdDB(stateUser.user_id, blogId)
				.then((result) => {
					console.log(result);
					setRedo(!redo);
				})
				.catch((error) => console.error(error));
	};

	//Manage Bookmark
	const handleBookMark = () => {
		if (!stateUser) {
			alert("Login to Continue");
			return;
		}
		setLoading(true);

		addBookMarkDB(stateUser.user_id, blog.blog_id)
			.then((result) => {
				if (result.error) {
					setLoading(false);

					console.log(result.error);
					return;
				}
				checkBookmarks();
				setLoading(false);
			})
			.catch((error) => console.error(error));
	};

	const hanldeRemoveBookMark = () => {
		if (!stateUser) {
			alert("Login to Continue");
			return;
		}
		setLoading(true);

		RemoveBookMarkDB(stateUser.user_id, blog.blog_id)
			.then((result) => {
				if (result.error) {
					return;
				}
				checkBookmarks();
				setLoading(false);
			})
			.catch((error) => console.error(error));
	};

	return (
		<React.Fragment>
			{blog.blog_id ? (
				<div className='viewblog'>
					<Link to='/' className='viewblog__backtohome'>
						<FaHome /> Back
					</Link>
					{loading ? <div className='loading'>Loading...</div> : ""}
					{bookmarks.includes(stateUser.user_id) ? (
						<div
							className='viewblog__fav'
							onClick={() => hanldeRemoveBookMark()}
						>
							Remove from Favourites
							<FaStar style={{marginLeft: "5px", fontSize: "28px"}} />
						</div>
					) : (
						<div className='viewblog__fav' onClick={() => handleBookMark()}>
							Add to Favourites
							<FaRegStar style={{marginLeft: "5px", fontSize: "28px"}} />
						</div>
					)}

					<div className='viewblog__'>
						<div className='viewblog__heading'>{blog.heading}</div>
						<div className='viewblog__date'>
							Uploaded on&nbsp;
							{blog.last_updated.split("T")[0]} &nbsp;
							{blog.last_updated
								.split("T")[1]
								.substring(0, blog.last_updated.split("T")[1].length - 5)}
						</div>
						<div className='viewblog__value'>{blog.value}</div>
						<div className='viewblog__author'> - {author.name}</div>
					</div>
					<div className='viewblog__label'>
						{blog.likes.includes(stateUser.user_id) ? (
							<div
								onClick={() => handleClickLike(blog.blog_id)}
								className='viewblog__label__likes'
							>
								<div className='viewblog__label__inner'>
									<FaThumbsUp /> {blog.likes.length}
								</div>
								You liked it
							</div>
						) : (
							<div
								onClick={() => handleClickLike(blog.blog_id)}
								className='viewblog__label__likes'
							>
								<div className='viewblog__label__inner'>
									<FaRegThumbsUp /> {blog.likes.length}
								</div>
								Add Like
							</div>
						)}
						{blog.dislikes.includes(stateUser.user_id) ? (
							<div
								onClick={() => handleClickDislike(blog.blog_id)}
								className='viewblog__label__likes'
							>
								<div className='viewblog__label__inner'>
									<FaThumbsDown /> {blog.dislikes.length}
								</div>
								You Disliked it
							</div>
						) : (
							<div
								onClick={() => handleClickDislike(blog.blog_id)}
								className='viewblog__label__likes'
							>
								<div className='viewblog__label__inner'>
									<FaRegThumbsDown /> {blog.dislikes.length}
								</div>
								Add Dislike
							</div>
						)}

						<div className='viewblog__label__likes'>
							<div className='viewblog__label__inner'>
								<FaRegComment /> {comments.length}
							</div>
						</div>
					</div>
					<Result error={output.error} message={output.message} />
					{loading ? <div className='loading'>Loading...</div> : ""}

					<form className='viewblog__addComment'>
						<textarea
							required
							type='text'
							value={input.comment}
							onChange={(e) => setInput({...input, comment: e.target.value})}
							placeholder='Add your comment'
						></textarea>
						<button onClick={(e) => handleAddComment(e)} type='submit'>
							Add
						</button>
					</form>
					{comments.length === 0 ? (
						<div className='viewblog__comments__no'>
							Be the first to comment
						</div>
					) : (
						<div className='viewblog__comments'>
							<div className='viewblog__comments__title'>Previous comment</div>
							{comments.map((comment) => {
								return (
									<div
										className='viewblog__comments__comment'
										key={comment.comment_id}
									>
										<div className='viewblog__comments__comment__user'>
											{comment.name}
										</div>
										<div className='viewblog__comments__comment__value'>
											{comment.comment}
										</div>
										<div className='viewblog__comments__comment__time'>
											{comment.last_updated.split("T")[0]} &nbsp;
											{comment.last_updated
												.split("T")[1]
												.substring(
													0,
													blog.last_updated.split("T")[1].length - 5,
												)}
										</div>
									</div>
								);
							})}
						</div>
					)}
				</div>
			) : (
				""
			)}
		</React.Fragment>
	);
}

export default Viewblog;
