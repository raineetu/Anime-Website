import { useState, useEffect } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Trendingcarousel from './Trendingcarousel';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { trackView } from './ViewTracker'; // Import trackView function

const NextArrow = ({ onClick }) => (
  <div className="slick-arrow slick-next" onClick={onClick} style={{ right: '10px' }}>
    <i className="fas fa-chevron-right"></i>
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div className="slick-arrow slick-prev" onClick={onClick} style={{ left: '10px' }}>
    <i className="fas fa-chevron-left"></i>
  </div>
);

const settings = {
  className: "center",
  infinite: true,
  centerPadding: "60px",
  slidesToShow: 4,
  swipeToSlide: true,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 2 } },
    { breakpoint: 600, settings: { slidesToShow: 1 } }
  ]
};

function Trending() {
  const [popularAnimeDetails, setPopularAnimeDetails] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState(null);
  const [trending, setTrending] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getPopularAnime = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("User is not authenticated.");
  
        const popularsRes = await axios.get("http://localhost:8001/populars", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const popularAnime = popularsRes.data;
  
        const detailsPromises = popularAnime.map(async (anime) => {
          const detailsRes = await axios.get(`http://localhost:8001/detail/${anime._id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          return {
            ...anime,
            ...detailsRes.data,
            averageRating: parseFloat(detailsRes.data.averageRating) || 0,
          };
        });
  
        const animeDetails = await Promise.all(detailsPromises);
        // console.log("Anime Details:", animeDetails);
  
        // Filter and sort by rating in descending order
        const highRatedAnime = animeDetails
          .filter(anime => typeof anime.averageRating === 'number' && anime.averageRating > 4)
          .sort((a, b) => b.averageRating - a.averageRating);
  
        // console.log("High Rated Anime:", highRatedAnime);
  
        setPopularAnimeDetails(animeDetails);
        setTrending(highRatedAnime);
      } catch (error) {
        console.log("Error fetching popular anime details:", error);
        setError("Error fetching data. Please try again later.");
      }
    };
  
    getPopularAnime();
  }, []);
  

  useEffect(() => {
    if (popularAnimeDetails.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % popularAnimeDetails.length);
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [popularAnimeDetails]);

  if (error) return <p>{error}</p>;
  if (popularAnimeDetails.length === 0) return <p>Loading...</p>;

  const handleAnimeClick = (animeId) => {
    trackView(animeId); // Call trackView to increment the view count
    navigate(`/anime/${animeId}`);
  };

  return (
    <>
      <div className='px-[6vh] py-2'>
        <div className='flex items-center'>
          <img src="/Roronoa.png" className='w-[13vh] h-[13vh] animation-zoro' alt="Roronoa" />
          <h1 className='text-pink-300 text-3xl font-bold ml-4 font-serif'>POPULAR</h1>
        </div>
      </div>

      <div className="slider-container px-[6vh]">
        <Slider {...settings}>
          {trending.length > 0 ? trending.map((trend) => (
            <Trendingcarousel 
              key={trend._id}
              id={trend._id}
              title={trend.title}
              imageUrl={trend.imageUrl}
              averageRating={trend.averageRating}
              onClick={() => handleAnimeClick(trend._id)} // Update onClick to use handleAnimeClick
            />
          )) : <p>No trending data available</p>}
        </Slider>
      </div>
    </>
  );
}

export default Trending;
