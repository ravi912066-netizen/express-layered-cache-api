const express = require("express");

const productRoutes = require("./routes/productRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");


const app = express();


// Parse JSON request body
app.use(express.json());


// Product routes
app.use(productRoutes);


// Error handling middleware
app.use(errorMiddleware);


// Start server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});