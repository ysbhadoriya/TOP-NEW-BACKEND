const express = require("express");
const router = express.Router();
const  User  = require("../model/user-model");
const bcrypt = require("bcryptjs");

const home = async (req, res) => {
    try {
        res.status(200).send("ram ram bhai");
    } catch (error) {
        console.error("Error in home route:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

const register = async (req, res) => {
    try {
        const { username, email, phone, password } = req.body;

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const saltRounds = 5;
        const hashPassword = await bcrypt.hash(password, saltRounds);

        const userCreated = await User.create({
            username,
            email,
            phone,
            password: hashPassword
        });

        res.status(201).json({
            msg: "Registration successful",
            token: await userCreated.generateToken()
        });
    } catch (error) {
        console.error("Error in register route:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const userExist = await User.findOne({ email });
        if (!userExist) {
            return res.status(400).json({ msg: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, userExist.password);
        if (!isPasswordValid) {
            return res.status(401).json({ msg: "Invalid email or password" });
        }

        res.status(200).json({
            msg: "Login successful",
            token: await userExist.generateToken(),
            userId: userExist._id.toString()
        });
    } catch (error) {
        console.error("Error in login route:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

const user = async (req, res) => {
    try {
        const userData = req.user; // assuming req.user is set by authentication middleware
        return res.status(200).json({ userData });
    } catch (error) {
        console.error("Error in user route:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

// Error-handling middleware
router.use((err, req, res, next) => {
    console.error("Global error handler:", err);
    res.status(err.status || 500).json({
        msg: err.message || "Internal Server Error"
    });
});

module.exports = { home, register, login, user };
