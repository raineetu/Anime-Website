import jwt from "jsonwebtoken";
import User from '../model/userModel.js';

const isAuthenticated = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            console.log("Authorization header missing or improperly formatted.");
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            });
        }

        // Extract token from "Bearer <token>"
        const token = authHeader.split(' ')[1];
        // console.log("Received token:", token);

        // Verify the token using secret key from environment variables
        const decoded = jwt.verify(token, process.env.secretkey);
        // console.log("Decoded token data:", decoded);

        // Find user by ID in token payload
        const user = await User.findById(decoded.userId).select('name');
        if (!user) {
            console.log("User not found in database.");
            return res.status(401).json({
                message: "User not found",
                success: false,
            });
        }

        // Attach user object to req.user
        req.user = user;
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: "Invalid token", success: false });
        }
        res.status(500).json({ message: "Error during authentication", error: error.message });
    }
};

export default isAuthenticated;
