// Import the Express framework to create a web server
const express = require('express');
const app = express(); // Create an instance of an Express app
const port = 4000; // Define the port the server will listen on

// Import the CORS package to handle cross-origin resource sharing
const cors = require('cors');
app.use(cors()); // Enable CORS for all routes

// Middleware function to set custom headers for CORS and HTTP methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Specify allowed HTTP methods
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); // Specify allowed headers
  next(); // Call the next middleware in the chain
});

// Import the body-parser package to parse incoming request bodies
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(bodyParser.json()); // Parse JSON bodies

// Import and configure Mongoose for MongoDB connection
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Adam3340:Adam3340@cluster0.znhmn.mongodb.net/'); // Connect to the MongoDB database

// Define a Mongoose schema for the 'Movie' collection
const movieSchema = new mongoose.Schema({
  title: String, // Movie title field
  year: String,  // Release year field
  poster: String // Poster URL field
});

// Create a Mongoose model from the schema
const Movie = mongoose.model('Movie', movieSchema);

// Route to get all movies from the database
app.get('/api/movies', async (req, res) => {
  try {
    const movies = await Movie.find({}); // Fetch all movie documents
    res.json(movies); // Respond with the fetched movies in JSON format
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching movies' }); // Error handling
  }
});

// Route to add a new movie to the database
app.post('/api/movies', async (req, res) => {
  try {
    console.log("Movie added: " + req.body.title); // Log the movie title being added

    // Extract movie details from the request body
    const { title, year, poster } = req.body;
    const newMovie = new Movie({ title, year, poster }); // Create a new movie instance
    await newMovie.save(); // Save the movie to the database

    res.status(201).json({ message: 'Movie created successfully', movie: newMovie }); // Respond with success message
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the movie' }); // Error handling
  }
});

// Route to get a specific movie by its ID
app.get('/api/movie/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id); // Find a movie by its ID
    if (movie) {
      res.send(movie); // Respond with the movie data if found
    } else {
      res.status(404).json({ error: 'Movie not found' }); // Handle case where movie isn't found
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the movie' }); // Error handling
  }
});

// Start the Express server and listen on the defined port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`); // Log a message when the server starts
});
