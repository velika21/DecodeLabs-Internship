const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const userRoutes = require("./routes/users");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
const MONGO_URI =
    process.env.MONGO_URI || "mongodb://127.0.0.1:27017/decodelabs_project3";


// Middleware
app.use(express.json());


// Home route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Project 3 Database API is running"
    });
});


// User routes
app.use("/api/users", userRoutes);


// 404 route
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});


// Connect to MongoDB
mongoose
    .connect(MONGO_URI)
    .then(() => {

        console.log("MongoDB connected successfully");

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });

    })
    .catch((error) => {

        console.error("MongoDB connection failed:");
        console.error(error.message);

    });