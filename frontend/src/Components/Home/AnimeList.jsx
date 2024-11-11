import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function AnimeList() {
  const [animeList, setAnimeList] = useState([]);
  const [filteredAnimeList, setFilteredAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all anime details
  useEffect(() => {
    const fetchAnimeList = async () => {
      try {
        const response = await axios.get("http://localhost:8001/detail"); // Fetch all anime
        setAnimeList(response.data);
        setFilteredAnimeList(response.data); // Show all anime initially
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchAnimeList();
  }, []);

  // Handle button clicks for filtering anime by letter
  const handleButtonClick = (letter) => {
    if (letter === "All") {
      setFilteredAnimeList(animeList); // Show all anime
    } else {
      const filtered = animeList.filter((anime) =>
        anime.title.toUpperCase().startsWith(letter)
      );
      setFilteredAnimeList(filtered); // Show only anime starting with the clicked letter
    }
  };

  if (loading) {
    return <p>Loading anime list...</p>;
  }

  if (error) {
    return <p>Error fetching data: {error}</p>;
  }

  if (animeList.length === 0) {
    return <p>No anime found.</p>;
  }

  // Create an array of letters A to Z
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <>
      <div className="pt-[17vh] h-screen">
        <div className="ml-[5vh] space-y-5 pb-[10vh]">
          <hr className="w-[133vh] h-[1px] bg-pink-500 ml-[25vh]" />
          <h1 className="text-3xl font-semibold text-green-400">
            A-Z LIST |{" "}
            <span className="text-yellow-300">
              Searching anime ordered by alphabet name A to Z.
            </span>
          </h1>
          <div className="flex space-x-4">
            {/* 'All' button to show all anime */}
            <button
              className="w-[7vh] h-[4vh] bg-pink-300 text-white rounded-[1vh] shadow-lg shadow-black"
              onClick={() => handleButtonClick("All")}
            >
              All
            </button>
            {/* Map through the alphabet array to create buttons for each letter */}
            {alphabet.map((letter) => (
              <button
                key={letter}
                className="w-[7vh] h-[4vh] bg-pink-300 text-white rounded-[1vh] shadow-lg shadow-black"
                onClick={() => handleButtonClick(letter)}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>
        <div className="w-[full] flex">
          <div className="w-3/5 ml-[5vh] mr-2 ">
            <h1 className="text-black font-bold text-2xl border-2 border-yellow-300 bg-yellow-300 rounded-[2vh] text-center p-2">
              Anime List
            </h1>
            <div className="pl-[5vh] ">
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-4 text-white text-2xl mt-[4px] font-serif">
                {filteredAnimeList.length > 0 ? (
                  filteredAnimeList.map((anime) => (
                    <li key={anime._id} className="hover:text-green-300">
                      <Link to={`/anime/${anime._id}`}>{anime.title}</Link>
                    </li>
                  ))
                ) : (
                  <li>No anime found for this letter.</li>
                )}
              </ul>
            </div>
          </div>
          <div className="w-2/5">
          <img
  src="https://images.fineartamerica.com/images/artworkimages/medium/3/anime-naruto-ganesh.jpg"
  className="w-[85%] h-[94%] rounded-[2vh] opacity-45 "
/>
          </div>
        </div>
      </div>
    </>
  );
}

export default AnimeList;
