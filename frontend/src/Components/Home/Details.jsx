import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay, faClock, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Details({ id, title, description, imageUrl, prevSlide, nextSlide, trendingRank }) {
  return (
    <div
      id={id}
      className="carousel-item relative w-full h-[80vh] mt-[17vh] px-[6vh] py-2"
      style={{ backgroundColor: "#162a41" }}
    >
      <div className="flex justify-between w-full h-full">
        {/* Text Section */}
        <div className="flex flex-col justify-center w-[30%] max-w-md mt-[10vh]">
        <p className='text-[3vh] text-yellow-400'><strong>{trendingRank}</strong></p>
        {/* <p>Average Rating: {averageRating}</p> */}
          <h1 className="text-pink-300 text-5xl font-bold">{title}</h1>
          <div className="text-pink-100 mt-2 flex items-center space-x-4">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faCirclePlay} className="mr-2" />
              <span>TV</span>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faClock} className="mr-2" />
              <span>24 min</span>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faCalendar} className="mr-2" />
              <span>Calendar</span>
            </div>
            <div className="flex items-center">
              <button className="bg-blue-300 rounded-[5px] p-[3px] mr-[5px] text-black font-bold w-[5vh] h-[4vh]">HD</button>
              <button className="rounded-[5px] p-[3px] text-black font-bold w-[7vh] h-[4vh]" style={{ background: '#85EA85' }}>1100</button>
            </div>
          </div>
          <p className="text-white mt-[3vh]">{description}</p>
          <div className="flex items-center"> 
            <Link to={`/anime/${id}/video`}>
              <button className="bg-pink-300 font-bold w-[17vh] h-[5vh] rounded-[10px] mt-[3vh] mr-[2vh] flex items-center justify-center hover:bg-pink-400">
                <FontAwesomeIcon icon={faCirclePlay} className="mr-2" />
                Watch Now
              </button>
            </Link>           
            <Link to={`/anime/${id}`}>
              <button className="font-bold w-[17vh] h-[5vh] rounded-[10px] mt-[3vh] flex items-center justify-center" style={{ background: '#85EA85' }}>
                Details ❯
              </button>
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="relative w-[70%] h-full bg-cover bg-right bg-no-repeat bg-center" style={{ backgroundImage: `url(${imageUrl})`, backgroundBlendMode: 'darken' }}>
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#162a41] via-transparent to-[#162a41]"></div>

          {/* Navigation Arrows */}
          <div className="absolute left-10 right-10 top-1/2 flex -translate-y-1/2 transform justify-between items-center">
            {/* Move the navigation outside of the Link wrapping the image */}
            <Link to={`#${prevSlide}`} aria-label="Previous slide" className="btn btn-circle">❮</Link>
            <Link to={`#${nextSlide}`} aria-label="Next slide" className="btn btn-circle">❯</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
