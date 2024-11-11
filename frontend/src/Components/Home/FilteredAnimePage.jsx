import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function FilteredAnimePage() {
  const { letter } = useParams(); // Get the letter from the URL
  const [filteredAnime, setFilteredAnime] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFilteredAnime = async () => {
      try {
        let response;
        if (letter === "all") {
          response = await axios.get("http://localhost:8001/detail"); // Fetch all anime
        } else {
          // Use backticks for template literals
          response = await axios.get(`http://localhost:8001/detail?letter=${letter}`);
        }
        setFilteredAnime(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchFilteredAnime();
  }, [letter]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching data: {error}</p>;
  }

  if (filteredAnime.length === 0) {
    return <p>No anime found for this letter.</p>;
  }

  return (
    <div>
      <h1 className="text-3xl">Anime Starting with {letter.toUpperCase()}</h1>
      <ul>
        {filteredAnime.map((anime) => (
          <li key={anime._id}>
            {/* Use backticks in the Link to path */}
            <Link to={`/anime/${anime._id}`}>{anime.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FilteredAnimePage;
