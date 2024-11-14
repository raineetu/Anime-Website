import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useSelector } from 'react-redux';
import RecommendedCard from "./RecommendedCard";
import { useNavigate } from "react-router-dom";
import { trackView } from './ViewTracker';

const NextArrow = ({ onClick }) => (
  <div className="slick-arrow slick-next" onClick={onClick} style={{ right: "10px" }}>
    <i className="fas fa-chevron-right"></i>
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div className="slick-arrow slick-prev" onClick={onClick} style={{ left: "10px" }}>
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
  ],
};

function Recommended() {
  const [animeDetails, setAnimeDetails] = useState([]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const navigate = useNavigate();

  // Get user data from local storage
  const storedUser = JSON.parse(localStorage.getItem("Users"));
  const userId = storedUser?._id;

  useEffect(() => {
    // console.log("Stored user:", storedUser);
    // console.log("Extracted User ID:", userId);

    if (!userId) {
      // console.error("User ID is undefined. Redirecting to login page.");
      navigate("/login");
      return;
    }

    const fetchRecommendations = async () => {
      try {
        const response = await axios.get(`http://localhost:8001/recommendations/${userId}`);
        // console.log("Fetched Data:", response.data);

        // Remove duplicate anime titles
        const uniqueAnimeList = response.data.filter(
          (anime, index, self) =>
            index === self.findIndex((t) => t.animeTitle === anime.animeTitle)
        );

        setAnimeDetails(uniqueAnimeList);
      } catch (error) {
        console.error("Error fetching anime details:", error);
      }
    };

    fetchRecommendations();
  }, [userId, navigate]);

  const filterByRating = (anime) => anime.rating >= ratingFilter;

  const handleCardClick = (animeId) => {
    if (userId) {
      trackView(userId, animeId);
      navigate(`/anime/${animeId}`);
    }
  };

  // Only render the section if there are recommendations available
  if (!animeDetails || animeDetails.length === 0) {
    return (
      <div className="px-[6vh] py-2">
      </div>
    );
  }

  return (
    <>
      <div className="px-[6vh] py-2">
        <div className="flex items-center">
          <img src="/r.png" className="w-[19vh] h-[23vh] animation-zoro" alt="Roronoa" />
          <span>
            <h1 className="text-pink-300 text-3xl font-bold ml-2 font-serif">
              RECOMMENDED FOR YOU
            </h1>
          </span>
        </div>
      </div>

      <div className="slider-container px-[6vh]">
        <Slider {...settings}>
          {animeDetails.filter(filterByRating).map((anime) => {
            const imageUrl = anime.profileImage.startsWith("http")
              ? anime.profileImage
              : `http://localhost:8001/${anime.profileImage.replace(/\\/g, "/")}`;

            return (
              <div onClick={() => handleCardClick(anime.id)} key={anime.id}>
                <RecommendedCard
                  id={anime.id}
                  animeTitle={anime.animeTitle}
                  imageUrl={imageUrl}
                  commentText={anime.commentText}
                  rating={anime.rating}
                  description={anime.description}
                />
              </div>
            );
          })}
        </Slider>
      </div>
    </>
  );
}

export default Recommended;
