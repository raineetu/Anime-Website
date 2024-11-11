import PropTypes from "prop-types"; 

function Movie({ title, description, imageUrl, onClick }) {
  return (
    <div 
      className="shadow-lg shadow-black p-3 rounded-[7px] ml-[7vh] cursor-pointer" 
      onClick={onClick} // Make the entire component clickable
    >
      <div className="flex">
        <img
          src={imageUrl} 
          alt={title}
          className="w-full h-[40vh] object-cover rounded-[1vh]"
        />
      </div>
      <div>
      <h1 className="font-bold text-2xl text-white p-2 text-center">{title}</h1>
      <p className="font-serif text-xl text-white p-2">
          {description}
        </p>
      </div>
    </div>
  );
}

// Define prop types for better type checking
Movie.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  onClick: PropTypes.func, // Add onClick as an optional prop
};

export default Movie;
