import { Link } from 'react-router-dom';

function RecommendedCard({ id, animeTitle, imageUrl }) {
  const normalizedImageUrl = imageUrl.replace(/\\/g, "/");

  return (
    <Link to={`/anime/${id}`}>
      <div className="card bg-base-100 w-full max-w-[40vh] h-[40vh] shadow-white rounded-[20px] mx-auto mb-6 transition-transform duration-200 hover:scale-105">
        {/* Image container */}
        <figure className="flex justify-center items-center w-full h-full overflow-hidden rounded-t-lg">
          <img 
            src={normalizedImageUrl} 
            alt={animeTitle} 
            className='w-full h-full object-cover rounded-[15px]'
          />
        </figure>
        {/* Anime title */}
        <div className="text-white flex justify-center items-center mt-2">
          <p className='font-semibold text-lg md:text-2xl text-center'>{animeTitle}</p>
        </div>
      </div>
    </Link>
  );
}

export default RecommendedCard;
