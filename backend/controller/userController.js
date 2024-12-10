import User from "../model/userModel.js"; // Corrected import
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register function
export const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const file = req.file; // Ensure this is where the file is accessed

        // Validate required fields
        if (!name || !email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false,
            });
        }
        if (!file) {
            return res.status(400).json({
                message: "Profile image is required",
                success: false,
            });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                message: "User already exists with this email.",
                success: false,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user data along with the uploaded file's path
        await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            profileImage: file.path, // Save the file path in the database
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};

// Login function
export const login = async (req, res) => {
    try {
        console.log("Received login data backend:", req.body);

        // Destructure the email, password, and role from the request body
        const { email, password, role } = req.body;

        // console.log("Email:", email);
        // console.log("Password:", password);
        // console.log("Role:", role);

        // Validate input fields
        if (!email || !password || !role) {
            if (!email) console.log("Missing field: email");
            if (!password) console.log("Missing field: password");
            if (!role) console.log("Missing field: role");

            return res.status(400).json({ message: "Email, password, and role are required", success: false });
        }

        // Find the user by email
        let user = await User.findOne({ email });
        
        console.log("User object from DB:", user);

        if (!user) {
            return res.status(400).json({ message: "Incorrect email or password.", success: false });
        }

        // Check if the password matches using bcrypt
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        console.log("Password comparison result:", isPasswordMatch);

        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Incorrect email or password.", success: false });
        }

        // Check if the role matches
        if (role !== user.role) {
            return res.status(400).json({ message: "Account doesn't exist with the current role.", success: false });
        }

        // Generate JWT token
        const tokenData = { userId: user._id };
        const token = jwt.sign(tokenData, process.env.secretkey, { expiresIn: "1d" });

        // Log the user object before removing the password
        console.log("User object before removing password:", user);

        // Remove the password field before sending the response
        const { password: _, ...userWithoutPassword } = user.toObject();
        
        // Log the final user object that will be returned in the response
        console.log("User object without password:", userWithoutPassword);

        // Return the response with only the necessary fields
        return res.status(200).json({
            message: `Welcome back ${userWithoutPassword.name}`,
            user: userWithoutPassword, 
            token,
            success: true,
        });
    } catch (error) {
        console.log("Login error:", error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};



// Update Profile function

export const updateProfile = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Log request data for debugging
        console.log("Request body:", req.body);
        console.log("Request file:", req.file);
        console.log("User from request:", req.user);

        // Retrieve user from the request
        const userId = req.user?._id; 
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized access", success: false });
        }

        let user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ message: "User not found", success: false });
        }

        // Update profile image if a new file was uploaded
        if (req.file) {
            user.profileImage = req.file.path;
        }

        // Update name, email, and password
        if (name) user.name = name;
        if (email) user.email = email;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        await user.save();

        const updatedUser = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            profileImage: user.profileImage,
        };

        return res.status(200).json({
            message: "Profile updated successfully",
            user: updatedUser,
            success: true,
        });
    } catch (error) {
        console.error("Error updating profile:", error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};


// Logout function
export const logout = async (req, res) => {
    try {
        return res.status(200)
            .cookie("token", "", { maxAge: 0 })
            .json({
                message: "Logged out successfully.",
                success: true,
            });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};
 

//fetch all the users 
export const getAllUsers = async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await User.find();

        if (users.length === 0) {
            return res.status(404).json({
                message: "No users found.",
                success: false,
            });
        }

        // Return the list of all users
        return res.status(200).json({
            message: "Users retrieved successfully.",
            users,
            success: true,
        });
    } catch (error) {
        console.log("Error retrieving users:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};
