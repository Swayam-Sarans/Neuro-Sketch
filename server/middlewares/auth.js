import jwt from "jsonwebtoken";

export const userAuth = (req, res, next) => {
	const token = req.headers.token || req.headers.authorization;

	if (!token) {
		return res.json({ success: false, message: "Not Authorized.Login Again." });
	}

	try {
		const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
		if (tokenDecode.id) {
			req.userId = tokenDecode.id;
		} else {
			return res.json({
				success: false,
				message: "Not Authorized.Login Again.",
			});
		}

		next();
	} catch (error) {
		res.json({ success: false, message: error.message });
	}
};
