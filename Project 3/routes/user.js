const express = require("express");
const router = express.Router();

const User = require("../models/User");


// CREATE
// POST /api/users

router.post("/", async (req, res) => {
    try {
        const { name, email, age } = req.body;

        // Basic validation
        if (!name || !email || age === undefined) {
            return res.status(400).json({
                success: false,
                message: "Name, email and age are required"
            });
        }

        if (!email.includes("@")) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email"
            });
        }

        const user = await User.create({
            name,
            email,
            age
        });

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user
        });

    } catch (error) {

        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        res.status(500).json({
            success: false,
            message: "Failed to create user",
            error: error.message
        });
    }
});


// READ ALL
// GET /api/users

router.get("/", async (req, res) => {
    try {

        const users = await User.find();

        res.status(200).json({
            success: true,
            count: users.length,
            users
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Failed to fetch users",
            error: error.message
        });
    }
});


// READ ONE
// GET /api/users/:id

router.get("/:id", async (req, res) => {
    try {

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            user
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: "Invalid user ID"
        });
    }
});


// UPDATE
// PUT /api/users/:id

router.put("/:id", async (req, res) => {
    try {

        const { name, email, age } = req.body;

        const user = await User.findByIdAndUpdate(
            req.params.id,
            {
                name,
                email,
                age
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            user
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: "Failed to update user",
            error: error.message
        });
    }
});


// DELETE
// DELETE /api/users/:id

router.delete("/:id", async (req, res) => {
    try {

        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: "Invalid user ID"
        });
    }
});


module.exports = router;