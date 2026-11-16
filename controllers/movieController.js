import mongoose from "mongoose";
import Movie from "../models/movieModel.js";

// 1. CREATE - Add a movie
export const createMovie = (req, res) => {
  Movie.create(req.body)
    .then((result) => {
      res.status(201).json({
        message: "Movie created successfully",
        data: result
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: "Movie creation failed",
        error: err.message
      });
    });
};

// 2. READ - Get all movies or filter by category
export const getMovies = (req, res) => {
  const { category } = req.query;
  const query = category ? { category } : {};

  Movie.find(query)
    .then((result) => {
      res.status(200).json({
        message: "Movies retrieved successfully",
        data: result
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Movie retrieval failed",
        error: err.message
      });
    });
};

// 3. READ - Get a movie by ID
export const getMovieById = (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: "Invalid movie ID"
    });
  }

  Movie.findById(id)
    .then((result) => {
      if (result) {
        res.status(200).json({
          message: "Movie details retrieved successfully",
          data: result
        });
      } else {
        res.status(404).json({
          message: "Movie not found"
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Movie fetching failed",
        error: err.message
      });
    });
};

// 4. UPDATE - Update a movie by ID
export const updateMovie = (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: "Invalid movie ID"
    });
  }

  Movie.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true
  })
    .then((result) => {
      if (result) {
        res.status(200).json({
          message: "Movie updated successfully",
          data: result
        });
      } else {
        res.status(404).json({
          message: "Movie not found"
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        message: "Movie updating failed",
        error: err.message
      });
    });
};

// 5. DELETE - Delete a movie by ID
export const deleteMovie = (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({
      message: "Invalid movie ID"
    });
  }

  Movie.findByIdAndDelete(id)
    .then((result) => {
      if (result) {
        res.status(200).json({
          message: "Movie deleted successfully",
          data: result
        });
      } else {
        res.status(404).json({
          message: "Movie not found"
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Movie deletion failed",
        error: err.message
      });
    });
};