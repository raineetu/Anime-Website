import { Link } from 'react-router-dom';

function Trendingcarousel({ id, title, imageUrl, averageRating }) {
  return (
    <Link to={`/anime/${id}`}>
      {/* Container for the card */}
      <div className="card bg-base-100 w-full max-w-[40vh] h-[40vh] mt-[3vh] shadow-white rounded-[20px] mx-auto relative">
        {/* Image container */}
        <div className="relative w-full h-full overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover rounded-[15px]"
          />
          {/* Rating Button */}
          <button className="bg-orange-600 text-white px-2 rounded-[4px] absolute top-2 left-2 z-10 text-sm md:text-[20px]">
            {averageRating}
          </button>
        </div>
      </div>

      {/* Title section */}
      <div className="text-white flex justify-center items-center mb-[4vh] mt-2">
        <p className="text-center font-semibold text-lg md:text-2xl">
          {title}
        </p>
      </div>
    </Link>
  );
}

export default Trendingcarousel;
