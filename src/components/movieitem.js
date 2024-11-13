// Import the Movies component from the local "./movies" file
import Movies from "./movies";
// Import hooks from React for managing state and side effects
import { useEffect, useState } from "react";
// Import Axios for making HTTP requests
import axios from "axios";

// Define the 'Read' functional component
const Read = () => {

  // State hook to store the movies data fetched from the server
  const [movies, setMovies] = useState([]);

  // useEffect hook runs the code inside it when the component mounts
  useEffect(() => {
    // Make a GET request to fetch movies from the backend API
    axios.get('http://localhost:4000/api/movies')
      .then((response) => {
        // Log the response data to the console for debugging
        console.log(response.data);
        // Update the 'movies' state with the fetched data
        setMovies(response.data);
      })
      .catch((error) => {
        // Log any errors that occur during the request
        console.log(error);
      });
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  // Return the JSX to render the component
  return (
    <div>
      <h3>Hello from read component!</h3>
      {/* Render the Movies component, passing 'movies' as a prop */}
      <Movies myMovies={movies} />
    </div>
  );
}

// Export the 'Read' component as the default export
export default Read;
