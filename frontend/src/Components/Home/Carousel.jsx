import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Details from './Details';
import { trackView } from './ViewTracker';

const API_URL = "http://localhost:8001";

function Carousel() {
  const [popularAnimeDetails, setPopularAnimeDetails] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const loggedInUserName = storedUser ? storedUser.name : "Anonymous User";
  const loggedInUserAvatar = storedUser ? storedUser.profileImage : "default-avatar-url";
  const navigate = useNavigate();

  // Retrieve viewed anime IDs from localStorage, if they exist
  const viewedAnimeIds = JSON.parse(localStorage.getItem("viewedAnimeIds")) || [];

  useEffect(() => {
    const getPopularAnime = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
  
        const response = await axios.get(`${API_URL}/populars`, {
          headers,
        });
  
        if (response.status !== 200) {
          throw new Error("Failed to fetch popular anime.");
        }
  
        const popularAnime = response.data;
  
        const detailsPromises = popularAnime.map(async (anime) => {
          const detailsRes = await axios.get(`${API_URL}/detail/${anime._id}`, {
            headers,
          });
          return { ...anime, ...detailsRes.data };
        });
  
        const animeDetails = await Promise.all(detailsPromises);
        setPopularAnimeDetails(animeDetails);
      } catch (error) {
        handleFetchError(error);
      } finally {
        setIsLoading(false);
      }
    };
  
    getPopularAnime();
  }, []);
  

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % popularAnimeDetails.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [popularAnimeDetails]);

  const handleFetchError = (error) => {
    console.error("Error fetching popular anime:", error);
    setError(error);
    toast.error("Failed to fetch popular anime. Please try again later.");
  };

// Handle anime click and update view count
const handleAnimeClick = async (animeId) => {
  // Check if the user has already viewed this anime
  if (!viewedAnimeIds.includes(animeId)) {
    try {
      const token = localStorage.getItem("token");

      // Track view even if the user is not logged in
      await trackView(animeId, token);

      // Update viewedAnimeIds and save it to localStorage
      const updatedViewedAnimeIds = [...viewedAnimeIds, animeId];
      localStorage.setItem("viewedAnimeIds", JSON.stringify(updatedViewedAnimeIds));
    } catch (error) {
      console.error("Failed to update view count:", error);
      toast.error("Failed to update view count. Please try again later.");
    }
  }

  // Navigate to the anime details page
  navigate(`/anime/${animeId}`);
};


  if (isLoading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-white">Error fetching data. Please try again later.</div>;
  }

  return (
    <div className="carousel w-full h-full">
      {popularAnimeDetails.length > 0 && (
        <>
          <Details
            key={popularAnimeDetails[currentIndex]._id}
            id={popularAnimeDetails[currentIndex]._id}
            title={popularAnimeDetails[currentIndex].title}
            description={popularAnimeDetails[currentIndex].description}
            imageUrl={popularAnimeDetails[currentIndex].imageUrl}
            averageRating={popularAnimeDetails[currentIndex].averageRating}
            trendingRank={`Trending #${currentIndex + 1}`}
            prevSlide={popularAnimeDetails[(currentIndex - 1 + popularAnimeDetails.length) % popularAnimeDetails.length]._id}
            nextSlide={popularAnimeDetails[(currentIndex + 1) % popularAnimeDetails.length]._id}
          />
          <div className="carousel-indicators">
            {popularAnimeDetails.map((_, index) => (
              <span
                key={index}
                className={`indicator ${index === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Carousel;
