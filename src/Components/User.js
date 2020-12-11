import React, {useContext, useEffect, useState} from "react";
import "./User.css";
import UserContext from "../UserContext";
import {Link, Redirect} from "react-router-dom";
import {getUserInfoFromDB} from "../Helper/user";
import {getBlogInfoByBlogId} from "../Helper/blog";
import {FaRegThumbsDown, FaRegThumbsUp} from "react-icons/fa";

function User() {
	const context = useContext(UserContext);

	const {stateUser} = context;
	const [blogs, setBlogs] = useState([]);
	const [option, setOption] = useState("Info");
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
	}, []);
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
	const yourPost = () => {
		return (
			<div className='yourpost'>
				<div className='yourpost__heading'>Your Posts</div>
				<div className='loading'>{loading ? "Loading" : ""}</div>
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
										<FaRegThumbsUp /> {blog.likes.length}
									</div>
									<div className='blog__label__likes'>
										<FaRegThumbsDown /> {blog.dislikes.length}
									</div>
									{/* <div className='blog__label__likes'>
										<FaRegComment /> 0
									</div> */}
								</div>
							</Link>
						);
					})}
				</div>
				{console.log(blogs)}
			</div>
		);
	};
	return (
		<div className='user'>
			<div className='user__name'>
				Welcome <div className='user__name__label'>{stateUser.name}</div>
			</div>
			<select onChange={(e) => setOption(e.target.value)}>
				<option value='Info'>User Info</option>
				<option value='YourPost'>Your Post</option>
			</select>
			{option === "Info" ? userInfo() : yourPost()}
		</div>
	);
}

export default User;
