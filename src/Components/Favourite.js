import React, {useContext, useEffect, useState} from "react";
import {FaRegThumbsDown, FaRegThumbsUp} from "react-icons/fa";
import {Link} from "react-router-dom";
import {allBookMarkByUserIdDB} from "../Helper/blog";
import "./Favourite.css";
import UserContext from "../UserContext";
import {isAuthenticated} from "../Helper/user";

function Favourite() {
	const context = useContext(UserContext);
	const [blogs, setBlogs] = useState([]);
	const {stateUser, setStateUser} = context;
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		if (stateUser) {
			allBookMarkByUserIdDB(stateUser.user_id)
				.then((result) => {
					if (result.error) {
						console.error(result.error);
						return;
					}
					setBlogs(result.bookmarks);
					setLoading(false);
				})
				.catch((error) => console.error(error));
		}
	}, []);

	useEffect(() => {
		let {user} = isAuthenticated();
		if (user) {
			setStateUser(user);
		} else setStateUser(false);
	}, [setStateUser]);
	return (
		<div className='favourite'>
			<div className='favourite__heading'>Favourites ⭐</div>
			{stateUser ? (
				<div className='loading'>{loading ? "Loading..." : ""}</div>
			) : (
				<div className='favorutie__login'>Login to view Favourite</div>
			)}
			{!loading && blogs.length == 0 ? "No favorites found : ( " : ""}
			<div className='home__body__blog'>
				{blogs.map((blog) => {
					return (
						<Link
							to={`/view/blog/${blog.blog_id}`}
							className='blog'
							key={blog.blog_id}
						>
							<div className='blog__heading'>{blog.heading}</div>
							<div className='blog__content'>
								{blog.value.substring(0, 140)}...
							</div>
							<div className='blog__label'>
								<div className='blog__label__likes'>
									<FaRegThumbsUp /> {blog.likes}
								</div>
								<div className='blog__label__likes'>
									<FaRegThumbsDown /> {blog.dislikes}
								</div>
								{/* <div className='blog__label__likes'>
										<FaRegComment /> 0
									</div> */}
							</div>
						</Link>
					);
				})}
			</div>
		</div>
	);
}

export default Favourite;
