import { Link } from 'react-router-dom';

function Recentcarousel({ id, title, imageUrl }) {

  return (
    <Link to={`/anime/${id}`}>
      <div className="card bg-base-100 w-[40vh] h-[40vh] mt-[3vh] shadow-white rounded-[30px] ml-[5vh] relative">
        <div className="relative w-full h-full overflow-hidden">
          <img src={imageUrl} alt={title} className="w-full h-full object-cover rounded-[15px]" />
        </div>
      </div>

      <div className="text-white flex justify-center items-center mb-[4vh] space-x-2">
        <p className="pr-[12vh] font-semibold text-2xl">{title}</p>
        </div>
    </Link>
  );
}

export default Recentcarousel;
