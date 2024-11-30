import { Request, Response } from 'express';
import User from '../models/userModel';

// Register Controller
export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password, role } = req.body;

        // Validate role
        if (!["user", "admin"].includes(role)) {
            res.status(400).json({ error: "Invalid role specified." });
            return;
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ error: "User already exists with this email." });
            return;
        }

        // Create new user
        const newUser = new User({ name, email, password, role });

        // Save the user (password will be hashed automatically by the pre-save hook)
        await newUser.save();

        res.status(201).json({ message: "User registered successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error during registration." });
    }
};

// Login Controller
export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ error: "Invalid email or password." });
            return;
        }

        // Compare the password using bcrypt's compare function
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            res.status(400).json({ error: "Invalid email or password." });
            return;
        }

        // Generate JWT using the instance method defined in the schema
        const token = user.generateAuthToken();

        res.status(200).json({ message: "Login successful.", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error during login." });
    }
};
