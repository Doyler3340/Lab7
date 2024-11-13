// Import the MovieItem component from the local "./movieitem" file
import MovieItem from "./movieitem";

// Define the 'Movies' functional component which takes 'props' as an argument
const Movies = (props) => {
  // Map over the 'myMovies' prop (an array of movie objects) and render a MovieItem for each movie
  return props.myMovies.map(
    (movie) => {
      // Return a MovieItem component for each movie, passing 'movie' as the 'mymovie' prop
      // Use 'movie._ID' as the unique 'key' prop to help React identify each element efficiently
      return <MovieItem mymovie={movie} key={movie._ID} />
    }
  );
}

// Export the 'Movies' component as the default export
export default Movies;
