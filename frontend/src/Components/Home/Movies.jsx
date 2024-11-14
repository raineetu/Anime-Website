import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Movie from "./Movie";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchMovies = async () => {
    try {
      const response = await axios.get("http://localhost:8001/detail");
      const json = response.data;

      const tvMovies = json.filter((movie) => movie.type === "Movie");
      setMovies(tvMovies);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setError("Failed to load movies.");
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleMovieClick = (id) => {
    navigate(`/anime/${id}`);
  };

  return (
    <>
      <div className="mt-[18vh] mx-4 my-4">
        <div className="items-center">
          <h1 className="text-black font-bold text-2xl border-2 border-yellow-300 bg-yellow-300 rounded-[2vh] text-center p-2">
            Movies
          </h1>
        </div>
      </div>

      <div className="flex-1 h-[88vh] w-full pb-5">
        {/* Responsive grid: 1 column on small screens, 2 columns on medium, 3 on larger screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <Movie
                key={movie._id}
                title={movie.title}
                imageUrl={movie.imageUrl}
                onClick={() => handleMovieClick(movie._id)} // Pass onClick as a prop
              />
            ))
          ) : (
            <p>No movies available.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Movies;
