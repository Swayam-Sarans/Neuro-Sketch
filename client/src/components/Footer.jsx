import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<div className="flex flex-col md:flex-row items-center justify-between gap-4 py-6 mt-20 border-t border-gray-300 dark:border-gray-700">
			{/* Logo */}
			<img src={assets.logo} alt="Logo" width={150} />

			{/* Policy Links */}
			<div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 dark:text-gray-300">
				<Link to="/terms-and-conditions" className="hover:underline">
					Terms & Conditions
				</Link>
				<Link to="/privacy-policy" className="hover:underline">
					Privacy Policy
				</Link>
				<Link to="/shipping-policy" className="hover:underline">
					Shipping Policy
				</Link>
				<Link to="/cancellation-refund" className="hover:underline">
					Cancellation & Refunds
				</Link>
				<Link to="/contact" className="hover:underline">
					Contact Us
				</Link>
			</div>

			{/* Social Icons */}
			<div className="flex gap-3.5">
				<img
					src={assets.facebook_icon}
					alt="Facebook"
					width={40}
					className="bg-white rounded-full dark:invert"
				/>
				<img
					src={assets.twitter_icon}
					alt="Twitter"
					width={40}
					className="bg-white rounded-full dark:invert"
				/>
				<img
					src={assets.instagram_icon}
					alt="Instagram"
					width={40}
					className="bg-white rounded-full dark:invert"
				/>
			</div>

			{/* Copyright */}
			<p className="text-xs text-gray-500 dark:text-gray-400 mt-4 md:mt-0">
				© {new Date().getFullYear()} Swayam | All rights reserved.
			</p>
		</div>
	);
};

export default Footer;
