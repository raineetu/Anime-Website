import { useState, useEffect } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Recentcarousel from './Recentcarousel';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

function Recentanime() {
  const [trending, setTrending] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrendingAnime = async () => {
      try {
        const response = await axios.get('http://localhost:8001/detail');
        // console.log("Data before sorting:", response.data);
        
        // Sort the data by `id` in descending order
        const sortedData = response.data.sort((a, b) => b.id - a.id);
        // console.log("Data after sorting:", sortedData);
        
        setTrending(sortedData);
      } catch (err) {
        setError(err.message);
      }
    };
  
    fetchTrendingAnime();
  }, []);
  
  const handleAnimeClick = (id) => {
    navigate(`/anime/${id}`);
  };

  return (
    <>
      <div className='px-[6vh] py-2'>
        <div className='flex items-center'>
          <img src="/umaru.png" className='w-[17vh] h-[14vh] animation-zoro' alt="Roronoa" />
          <h1 className='text-pink-300 text-3xl font-bold ml-2 font-serif'>RECENTLY ADDED</h1>
        </div>
      </div>

      <div className="slider-container px-[6vh]">
        <Slider {...settings}>
          {trending.length > 0 ? trending.map((trend) => (
            <Recentcarousel 
              key={trend._id}
              id={trend._id}
              title={trend.title}
              imageUrl={trend.imageUrl}
              averageRating={trend.averageRating}
              onClick={() => handleAnimeClick(trend._id)}
            />
          )) : <p>No recently added anime available</p>}
        </Slider>
      </div>
    </>
  );
}

export default Recentanime; 
