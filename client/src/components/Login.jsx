import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
	const [state, setState] = useState("Login");
	const { setShowLogin, fade, setFade, backendUrl, setToken, setUser } =
		useContext(AppContext);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [localFade, setLocalFade] = useState(true); // Start hidden

	const onSubmitHandler = async (e) => {
		e.preventDefault();

		try {
			if (state === "Login") {
				const { data } = await axios.post(backendUrl + "/api/user/login", {
					email,
					password,
				});

				if (data.success) {
					setToken(data.token);
					setUser(data.user);
					localStorage.setItem("token", data.token);
					setShowLogin(false);
				} else {
					toast.error(data.message);
				}
			} else {
				const { data } = await axios.post(backendUrl + "/api/user/register", {
					name,
					email,
					password,
				});

				if (data.success) {
					setToken(data.token);
					setUser(data.user);
					localStorage.setItem("token", data.token);
					setShowLogin(false);
				} else {
					toast.error(data.message);
				}
			}
		} catch (error) {
			toast.error(error.message);
		}
	};

	useEffect(() => {
		document.body.style.overflow = "hidden";

		// Trigger fade-in on mount
		setTimeout(() => {
			setLocalFade(false); // Fade-in from opacity-0 to opacity-100
		}, 10);

		return () => {
			document.body.style.overflow = "unset";
		};
	}, []);

	const toggleState = (newState) => {
		setFade(true); // Start fade-out
		setTimeout(() => {
			setState(newState); // Switch content after fade-out
			setFade(false); // Fade-in
		}, 300); // Duration must match CSS
	};

	const handleClose = () => {
		setFade(true); // Start fade-out
		setTimeout(() => {
			setShowLogin(false); // Actually close the modal after fade
			setFade(false); // Reset fade state
		}, 300); // Duration must match CSS
	};

	const isFading = fade || localFade;

	return (
		<div
			className={`transition-opacity duration-300 ${
				isFading ? "opacity-0" : "opacity-100"
			} fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center`}>
			<form
				onSubmit={onSubmitHandler}
				className="relative bg-white p-10 rounded-xl text-slate-500 dark:bg-gray-900 dark:text-white">
				<h1 className="text-center text-2xl text-neutral-700 font-medium dark:text-neutral-100">
					{state}
				</h1>
				<p className="text-sm">Welcome back! Please sign in to continue</p>

				{state !== "Login" && (
					<div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
						<img
							src={assets.profile_icon}
							alt=""
							className="brightness-0 dark:invert"
						/>
						<input
							onChange={(e) => setName(e.target.value)}
							value={name}
							type="text"
							className="outline-none text-sm dark:bg-gray-900"
							placeholder="Full Name"
							required
						/>
					</div>
				)}

				<div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
					<img
						src={assets.email_icon}
						alt=""
						className="brightness-0 dark:invert"
					/>
					<input
						onChange={(e) => setEmail(e.target.value)}
						value={email}
						type="email"
						className="outline-none text-sm dark:bg-gray-900"
						placeholder="Email id"
						required
					/>
				</div>

				<div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
					<img
						src={assets.lock_icon}
						alt=""
						className="brightness-0 dark:invert"
					/>
					<input
						onChange={(e) => setPassword(e.target.value)}
						value={password}
						type="password"
						className="outline-none text-sm dark:bg-gray-900"
						placeholder="Password"
						required
					/>
				</div>

				<p className="text-sm text-blue-600 my-4 cursor-pointer">
					Forgot password?
				</p>

				<button className="bg-gray-900 w-full text-white py-2 rounded-full dark:bg-gray-300 dark:text-black">
					{state === "Login" ? "Login" : "Create Account"}
				</button>

				{state === "Login" ? (
					<p className="mt-5 text-center">
						Don't have an account?{" "}
						<span
							className="text-blue-600 cursor-pointer"
							onClick={() => toggleState("Sign Up")}>
							Sign Up
						</span>
					</p>
				) : (
					<p className="mt-5 text-center">
						Already have an account?{" "}
						<span
							className="text-blue-600 cursor-pointer"
							onClick={() => toggleState("Login")}>
							Login
						</span>
					</p>
				)}

				<img
					onClick={handleClose}
					src={assets.cross_icon}
					alt=""
					className="absolute top-5 right-5 cursor-pointer"
				/>
			</form>
		</div>
	);
};

export default Login;
