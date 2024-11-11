import { Link } from 'react-router-dom';

function RecommendedCard({ id, animeTitle, imageUrl }) {
  const normalizedImageUrl = imageUrl.replace(/\\/g, "/");

  return (
    <Link to={`/anime/${id}`}>
      <div className="card bg-base-100 w-[40vh] h-[40vh] mt-[3vh] shadow-white rounded-[30px] ml-[5vh] mb-[4vh] transition-transform duration-200 hover:scale-105">
        <figure className="flex justify-center items-center w-full h-full overflow-hidden rounded-t-lg">
          <img 
            src={normalizedImageUrl} 
            alt={animeTitle} 
            className='w-full h-full object-cover'
          />
        </figure>
        <div className="text-white flex justify-center items-center mt-2 space-x-2">
          <p className='font-semibold text-2xl'>{animeTitle}</p>
        </div>
      </div>
    </Link>
  );
}

export default RecommendedCard;


