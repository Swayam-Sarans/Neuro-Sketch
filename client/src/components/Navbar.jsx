// src/components/Navbar.jsx
import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = ({ darkMode, setDarkMode }) => {
	const { user, setShowLogin, setFade, logout, credit } =
		useContext(AppContext);

	const navigate = useNavigate();

	const toggleDarkMode = () => {
		setDarkMode((prev) => !prev);
	};

	const toggleState = () => {
		setFade(true); // Start fade animation
		setShowLogin(true); // Show login after fade starts
		setTimeout(() => setFade(false), 300); // End fade after 300ms
	};

	return (
		<div className="flex items-center justify-between py-4 transition">
			<Link to="/">
				<img src={assets.logo} alt="Logo" className="w-28 sm:w-32 lg:w-40" />
			</Link>

			<div>
				{user ? (
					<div className="flex items-center gap-2 sm:gap-5">
						<button
							onClick={() => navigate("/buy")}
							className="flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-1.5 sm:py-3 dark:bg-zinc-200 dark:text-black dark:hover:bg-zinc-300 rounded-full hover:scale-105 transition-all duration-700">
							<img className="w-5" src={assets.credit_star} alt="" />
							<p className="text-xs sm:text-sm font-medium text-gray-600">
								Tokens Left : {credit}
							</p>
						</button>
						<p className="text-gray-600 dark:text-white max-sm:hidden pl-4">
							Hi, {user.name}
						</p>
						<div className="relative group">
							<img
								className="w-10 drop-shadow brightness-0 dark:invert"
								src={assets.profile_icon}
								alt=""
							/>
							<div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12">
								<ul className="list-none m-0 p-2 bg-white rounded-medium border text-sm">
									<li
										onClick={logout}
										className="py-1 px-2 cursor-pointer pr-10">
										Logout
									</li>
								</ul>
							</div>
						</div>
						<button
							onClick={toggleDarkMode}
							className="bg-zinc-800 text-white w-10 h-10 flex items-center justify-center text-sm hover:bg-zinc-700 dark:bg-zinc-200 dark:text-black dark:hover:bg-zinc-300 rounded-full transition-all hover:scale-125 duration-700">
							<img
								src={darkMode ? assets.light_mode : assets.dark_mode}
								alt={darkMode ? "Light mode icon" : "Dark mode icon"}
								className="w-5 h-5 filter dark:invert dark:brightness-90"
							/>
						</button>
					</div>
				) : (
					<div className="flex items-center gap-2 sm:gap-5">
						<p onClick={() => navigate("/buy")} className="cursor-pointer">
							Pricing
						</p>
						<button
							onClick={toggleState}
							className="bg-zinc-800 text-white px-7 py-2 sm:px-10 text-sm rounded-full">
							Login
						</button>
						<button
							onClick={toggleDarkMode}
							className="bg-zinc-800 text-white w-10 h-10 flex items-center justify-center text-sm hover:bg-zinc-700 dark:bg-zinc-200 dark:text-black dark:hover:bg-zinc-300 rounded-full transition-all navbar-dark-mode-button hover:scale-125 duration-700">
							<img
								src={darkMode ? assets.light_mode : assets.dark_mode}
								alt={darkMode ? "Light mode icon" : "Dark mode icon"}
								className="w-5 h-5 filter dark:invert dark:brightness-90"
							/>
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Navbar;
