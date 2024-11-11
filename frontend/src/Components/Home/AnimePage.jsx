import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function AnimePage() {
  const { id } = useParams(); 
  console.log("Anime ID from params:", id); 
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnime = async () => {
      console.log("Fetching anime with ID:", id); // Log the ID
      try {
        const response = await axios.get(`http://localhost:8001/detail/${id}`);
        setAnime(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, [id]);

  if (loading) {
    return <p className="text-center text-xl">Loading anime details...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center">Error fetching data: {error}</p>;
  }

  if (!anime) {
    return <p className="text-center text-lg">No anime found.</p>;
  }

  return (
    <div className="container p-4 pt-[13vh]">
      <div className="rounded-lg shadow-lg p-6 flex flex-col md:flex-row w-[100%]">
        <div className="md:w-[35%] w-full h-[70vh] ml-2 mb-6 md:mb-0">
          {anime.imageUrl && (
            <img
              src={anime.imageUrl}
              alt={`Image of ${anime.title}`}
              className="md:w-[92%] h-[70vh] object-cover rounded-lg mb-4"
            />
          )}
        </div>
        <div className="md:w-[65%]">
          <h2 className="text-4xl font-bold text-yellow-100 mb-4 font-sans">
            {anime.title}
          </h2>
          <p className="mb-4 text-[20px] text-white font-serif">
            <span className="text-green-600 mr-2 ">Type:</span>
            {anime.type}
          </p>
          <p className="mb-4 text-[20px] text-white font-serif">
            <span className="text-green-600 mr-2 ">Plot Summary:</span>
            {anime.description}
          </p>
          <div className="mb-4">
            <p className="mb-4 text-[20px] text-white font-serif">
              <span className="text-green-600 mr-2 ">Genre:</span>
              {anime.genre}
            </p>
            <p className="mb-4 text-[20px] text-white font-serif">
              <span className="text-green-600 mr-2 ">Released: </span>
              {new Date(anime.released).toDateString()}
            </p>
            <p className="mb-4 text-[20px] text-white font-serif">
              <span className="text-green-600 mr-2 ">Status:</span>
              {anime.status}
            </p>
            <p className="mb-4 text-[20px] text-white font-serif">
              <span className="text-green-600 mr-2 ">Rating: </span>
              {anime.averageRating}
            </p>
          </div>
        </div>
      </div>

      {/* Episodes Section */}
      <div className="mt-2 ml-[3vh]">
        <h3 className="text-2xl font-bold mb-2 text-yellow-100">Episodes</h3>
        {anime.episode && anime.episode.length > 0 ? (
          <div className="flex flex-wrap gap-4">
            {anime.episode.map((ep, index) => (
              <button
                key={index}
                onClick={() => window.open(ep.videoUrl, "_blank")} 
                className="bg-pink-300 text-white py-2 px-4 rounded hover:bg-green-300 transition duration-300"
              >
                EP {index + 1} | SUB
              </button>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-[20px] font-semibold">
            !!!!! Sorry, No episodes available for this anime.
          </p>
        )}
      </div>
    </div>
  );
}

export default AnimePage;
