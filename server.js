import express from 'express';
import dotenv from 'dotenv';

import dbConnect from './config/db.js';
import movieRoutes from './routes/movieRoutes.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register movie routes
app.use("/api/v1/movies", movieRoutes);

// Default route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Movie API is running"
  });
});

// Start database connection without blocking server startup
dbConnect();

// Start server independently
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});