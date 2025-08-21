import React, { useState, useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import Home from "./pages/Home.jsx";
import Result from "./pages/Result.jsx";
import BuyTokens from "./pages/BuyTokens.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Login from "./components/Login.jsx";
import Terms from "./pages/Terms.jsx";
import Privacy from "./pages/Privacy.jsx";
import Shipping from "./pages/Shipping.jsx";
import Refund from "./pages/Refund.jsx";
import Contact from "./pages/Contact.jsx";
import { AppContext } from "./context/AppContext.jsx";

const App = () => {
	const [darkMode, setDarkMode] = useState(false);
	const { showLogin } = useContext(AppContext);

	useEffect(() => {
		if (darkMode) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [darkMode]);

	return (
		<div className="px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 dark:text-white">
			<ToastContainer position="bottom-right" />
			<Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
			{showLogin && <Login />}
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/result" element={<Result />} />
				<Route path="/buy" element={<BuyTokens />} />

				{/* New Policy Pages */}
				<Route path="/terms-and-conditions" element={<Terms />} />
				<Route path="/privacy-policy" element={<Privacy />} />
				<Route path="/shipping-policy" element={<Shipping />} />
				<Route path="/cancellation-refund" element={<Refund />} />
				<Route path="/contact" element={<Contact />} />
			</Routes>

			<Footer />
		</div>
	);
};

export default App;
