import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay, faClock, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Details({ id, title, description, imageUrl, prevSlide, nextSlide, trendingRank }) {
  return (
    <div
      id={id}
      className="carousel-item relative w-full h-[80vh] lg:mt-[17vh] mt-[10vh] lg:px-[6vh] px-[3vh] py-2"
      style={{ backgroundColor: "#162a41" }}
    >
      <div className="flex flex-col lg:flex-row justify-between w-full h-full">
        {/* Text Section */}
        <div className="flex flex-col justify-center lg:w-[30%] lg:max-w-md w-full mt-[5vh] lg:mt-[10vh]">
          <p className="text-[2vh] lg:text-[3vh] text-yellow-400">
            <strong>{trendingRank}</strong>
          </p>
          <h1 className="text-pink-300 text-3xl lg:text-5xl font-bold">{title}</h1>
          <div className="text-pink-100 mt-2 flex flex-wrap items-center space-x-2 lg:space-x-4">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faCirclePlay} className="mr-1 lg:mr-2" />
              <span>TV</span>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faClock} className="mr-1 lg:mr-2" />
              <span>24 min</span>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faCalendar} className="mr-1 lg:mr-2" />
              <span>Calendar</span>
            </div>
            <div className="flex items-center space-x-2 mt-2 lg:mt-0">
              <button className="bg-blue-300 rounded-[5px] p-[3px] text-black font-bold w-[5vh] h-[4vh]">HD</button>
              <button className="rounded-[5px] p-[3px] text-black font-bold w-[7vh] h-[4vh]" style={{ background: '#85EA85' }}>1100</button>
            </div>
          </div>
          <p className="text-white mt-[2vh] lg:mt-[3vh] text-sm lg:text-base">{description}</p>
          <div className="flex items-center flex-wrap mt-[2vh] lg:mt-[3vh] space-y-2 lg:space-y-0">
            <Link to={`/anime/${id}/video`}>
              <button className="bg-pink-300 font-bold w-[17vh] h-[5vh] rounded-[10px] mr-[2vh] flex items-center justify-center hover:bg-pink-400">
                <FontAwesomeIcon icon={faCirclePlay} className="mr-2" />
                Watch Now
              </button>
            </Link>
            <Link to={`/anime/${id}`}>
              <button className="font-bold w-[17vh] h-[5vh] rounded-[10px] flex items-center justify-center" style={{ background: '#85EA85' }}>
                Details ❯
              </button>
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div
          className="relative w-full lg:w-[70%] h-[40vh] lg:h-full bg-cover bg-right bg-no-repeat bg-center mt-[5vh] lg:mt-0"
          style={{ backgroundImage: `url(${imageUrl})`, backgroundBlendMode: 'darken' }}
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#162a41] via-transparent to-[#162a41]"></div>

          {/* Navigation Arrows */}
          <div className="absolute left-5 right-5 lg:left-10 lg:right-10 top-1/2 flex -translate-y-1/2 transform justify-between items-center">
            <Link to={`#${prevSlide}`} aria-label="Previous slide" className="btn btn-circle text-white bg-gray-700 hover:bg-gray-800">❮</Link>
            <Link to={`#${nextSlide}`} aria-label="Next slide" className="btn btn-circle text-white bg-gray-700 hover:bg-gray-800">❯</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
