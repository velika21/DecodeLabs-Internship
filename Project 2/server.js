const express = require("express");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Temporary data
let users = [
    {
        id: 1,
        name: "Rahul",
        email: "rahul@example.com"
    },
    {
        id: 2,
        name: "Priya",
        email: "priya@example.com"
    }
];


// Home route
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to Project 2 Backend API",
        status: "Server is running"
    });
});


// GET - Get all users
app.get("/api/users", (req, res) => {
    res.status(200).json({
        success: true,
        count: users.length,
        users: users
    });
});


// GET - Get a single user
app.get("/api/users/:id", (req, res) => {

    const id = Number(req.params.id);

    const user = users.find(user => user.id === id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    res.status(200).json({
        success: true,
        user: user
    });
});


// POST - Add a new user
app.post("/api/users", (req, res) => {

    const { name, email } = req.body;

    // Basic validation
    if (!name || !email) {
        return res.status(400).json({
            success: false,
            message: "Name and email are required"
        });
    }

    if (!email.includes("@")) {
        return res.status(400).json({
            success: false,
            message: "Please enter a valid email"
        });
    }

    // Create new user
    const newUser = {
        id: users.length + 1,
        name: name.trim(),
        email: email.trim()
    };

    users.push(newUser);

    res.status(201).json({
        success: true,
        message: "User created successfully",
        user: newUser
    });
});


// 404 route
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});


// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});