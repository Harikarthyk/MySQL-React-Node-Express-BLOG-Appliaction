import "./Home.css";
import React, {useEffect, useState} from "react";
import {FaRegThumbsDown, FaRegThumbsUp} from "react-icons/fa";
import {getAllBlogFromDB} from "../Helper/blog";
import {Link} from "react-router-dom";

function Home() {
	const [blogs, setBlogs] = useState([]);
	const [loading, setLoading] = useState(true);

	//Get all Blogs from DB
	useEffect(() => {
		getAllBlogFromDB()
			.then((result) => {
				if (result.error) {
					setLoading(false);

					console.error(result.error);
					return;
				}
				setBlogs(result.blogs);
				setLoading(false);
			})
			.catch((error) => console.error(error));
	}, []);

	return (
		<div className='home'>
			<div className='home__coverphoto'>Home Page</div>
			<div className='home__body'>
				<div className='home__body__blog'>
					{loading ? <div className='loading'>Loading...</div> : ""}
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
		</div>
	);
}

export default Home;
