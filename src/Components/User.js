import React, {useContext, useEffect, useState} from "react";
import "./User.css";
import UserContext from "../UserContext";
import {Link, Redirect} from "react-router-dom";
import {getUserInfoFromDB} from "../Helper/user";
import {getBlogInfoByBlogId, deleteBlogByBlogId} from "../Helper/blog";
import {FaRegThumbsDown, FaRegThumbsUp, FaTrash} from "react-icons/fa";

function User() {
	const context = useContext(UserContext);

	const {stateUser} = context;
	const [blogs, setBlogs] = useState([]);
	const [user, setUser] = useState("");
	const [loading, setLoading] = useState(true);
	//Get all blogs by the user ;

	const getBlogInfo = (temp) => {
		temp.blog.map((b) => {
			getBlogInfoByBlogId(b)
				.then((result) => {
					if (result.error) {
						return;
					}
					let a = blogs;
					a.push(result.blog);
					setBlogs(a);
					setLoading(false);
				})
				.catch((error) => console.error(error));
		});
	};

	useEffect(() => {
		getUserBlogInfo();
	}, []);
	const getUserBlogInfo = () => {
		if (stateUser)
			getUserInfoFromDB(stateUser.user_id)
				.then((result) => {
					if (result.error) {
						console.error(result.error);
						return;
					}
					setUser(result.user);
					getBlogInfo(result.user);
				})
				.catch((error) => console.error(error));
	};
	if (!stateUser) return <Redirect to='/' />;
	const userInfo = () => {
		return (
			<div className='userInfo'>
				<div className='userInfo__name'>Name : {stateUser.name}</div>
				<div className='userInfo__name'>Email : {stateUser.email}</div>
				{user ? (
					<div className='userInfo__name'>
						Total Blogs / Quotes posted : {user.blog.length}
					</div>
				) : (
					""
				)}

				<div className='userInfo__change'>Change Password</div>
			</div>
		);
	};

	const handleDeleteBlog = (blogId) => {
		setLoading(true);
		deleteBlogByBlogId(blogId)
			.then((result) => {
				console.log(result);
				alert(result.message);
				setLoading(false);
				getUserBlogInfo();
				window.location.reload(false);
			})
			.catch((error) => console.error(error));
	};

	const yourPost = () => {
		return (
			<div className='yourpost'>
				<div className='yourpost__heading'>Your Posts</div>
				<div className='loading'>{loading ? "Loading" : ""}</div>
				<div className='home__body__blog'>
					{blogs.map((blog) => {
						return (
							<div className='blog' key={blog.blog_id}>
								<Link
									to={`/view/blog/${blog.blog_id}`}
									className='blog__heading'
								>
									{blog.heading}
								</Link>
								<div className='blog__content'>
									{blog.value.substring(0, 140)}...
								</div>
								<div className='blog__label'>
									<div className='blog__label__likes'>
										<FaRegThumbsUp /> {blog.likes.length}
									</div>
									<div className='blog__label__likes'>
										<FaRegThumbsDown /> {blog.dislikes.length}
									</div>
								</div>
								<div
									onClick={() => handleDeleteBlog(blog.blog_id)}
									className='blog__delete'
								>
									Delete Blog <FaTrash />
								</div>
							</div>
						);
					})}
				</div>
			</div>
		);
	};
	return (
		<div className='user'>
			<div className='user__name'>
				Welcome <div className='user__name__label'>{stateUser.name}</div>
			</div>
			{userInfo()}
			{yourPost()}
		</div>
	);
}

export default User;
