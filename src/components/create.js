// Import Axios for making HTTP requests
import axios from "axios";
// Import the useState hook from React for state management
import { useState } from "react";

// Define the 'Create' functional component
const Create = () => {

    // State hooks to manage the input values for title, year, and poster
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [poster, setPoster] = useState('');

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        const movie = { title, year, poster }; // Create a movie object with current input values
        console.log(movie); // Log the movie object to the console for debugging

        // Send a POST request to the backend to add the new movie
        axios.post('http://localhost:4000/api/movies', movie)
        .then((res) => {
            console.log(res.data); // Log the response data to the console
        })
        .catch(); // Handle errors (no specific error handling provided here)
    }

    // JSX to render the component
    return (
        <div>
            <h3>Hello from create component!</h3>
            <form onSubmit={handleSubmit}> {/* Attach the handleSubmit function to the form's submit event */}
                <div className="form-group">
                    <label>Add Movie Title: </label>
                    <input type="text"
                        className="form-control" // CSS class for styling the input
                        value={title} // Bind the input's value to the 'title' state
                        onChange={(e) => { setTitle(e.target.value) }} // Update 'title' state when input changes
                    />
                </div>
                <div className="form-group">
                    <label>Add Movie Year: </label>
                    <input type="text"
                        className="form-control" // CSS class for styling the input
                        value={year} // Bind the input's value to the 'year' state
                        onChange={(e) => { setYear(e.target.value) }} // Update 'year' state when input changes
                    />
                </div>
                <div className="form-group">
                    <label>Add Movie Poster: </label>
                    <input type="text"
                        className="form-control" // CSS class for styling the input
                        value={poster} // Bind the input's value to the 'poster' state
                        onChange={(e) => { setPoster(e.target.value) }} // Update 'poster' state when input changes
                    />
                </div>
                <div>
                    <input type="submit" value="Add Movie"></input> {/* Submit button */}
                </div>
            </form>
        </div>
    );
}

// Export the 'Create' component as the default export
export default Create;
