const UserModel = require("../Models/User");
const bcrypt = require('bcryptjs');

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the user already exists
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409).json({
                message: "User already exists, you can login",
                success: false
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance with hashed password
        const userModel = new UserModel({
            name,
            email,
            password: hashedPassword // Set the hashed password here
        });

        // Save the new user to the database
        await userModel.save();

        res.status(201).json({
            message: "Signup successful",
            success: true
        });
    } catch (err) {
        // Log the error for debugging
        console.error("Error during signup:", err);

        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

module.exports = {
    signup
};
