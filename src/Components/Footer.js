import React from "react";
import "./Footer.css";
import {
	FaGithub,
	FaGlobe,
	FaGlobeAsia,
	FaInstagram,
	FaLinkedinIn,
	FaMedium,
} from "react-icons/fa";
function Footer() {
	return (
		<div className='footer'>
			<div className='footer__label'>
				<FaGithub
					onClick={() =>
						window.open("https://github.com/Harikarthyk", "_blank")
					}
				/>
			</div>
			<div className='footer__label'>
				<FaLinkedinIn
					onClick={() =>
						window.open("https://www.linkedin.com/in/harikarthyk/", "_blank")
					}
				/>
			</div>
			<div className='footer__label'>
				<FaGlobeAsia
					onClick={() =>
						window.open("https://vigilant-keller-c956bf.netlify.app/")
					}
				/>
			</div>
			<div className='footer__label'>
				<FaMedium
					onClick={() =>
						window.open("https://hari-jsmith494.medium.com/", "_blank")
					}
				/>
			</div>
			<div className='footer__label'>
				<FaInstagram
					onClick={() =>
						window.open("https://www.instagram.com/hari_karthyk/", "_blank")
					}
				/>
			</div>
		</div>
	);
}

export default Footer;
