import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Components/Navbar'; 
import luffy from '/luffy1.png';

function AnimeDetail() {
  const { id } = useParams(); 
  const [anime, setAnime] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnimeDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8001/detail/${id}`);
        setAnime(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching anime details');
        setLoading(false);
      }
    };

    fetchAnimeDetails();
  }, [id]);

  if (loading) {
    return <div className='text-white'>Loading...</div>;
  }

  if (error) {
    return <div className='text-white'>{error}</div>;
  }

  if (!anime) {
    return <div className='text-white'>No anime found.</div>;
  }

  return (
    <>
      <Navbar />
      <div className='pt-[14vh]'>
        <div className='flex w-full h-full p-6 text-white'>
          <div className='w-[30%] flex justify-center items-start'>
            <figure className='flex justify-center items-center w-full h-[60vh] overflow-hidden'>
              <img 
                src={anime.imageUrl} 
                alt={anime.title} 
                className='rounded-lg shadow-lg my-8 w-full h-full object-cover' 
              />
            </figure>
          </div>
          <div className='w-[70%] pl-5'>
            <h2 className='title text-3xl font-semibold mb-4 underline'>{anime.title}</h2>
            <div className='mb-4'>
              <span className='dettail'>Type: </span>
              <span>{anime.type}</span>
            </div>
            <div className='mb-4'>
              <span className='dettail'>Plot Summary: </span>
              <span className='ml-2'>{anime.description}</span>
            </div>
            <div className='mb-4'>
              <span className='dettail'>Genre: </span>
              <span>{anime.genre}</span>
            </div>
            <div className='mb-4'>
              <span className='dettail'>Released: </span>
              <span>{anime.released}</span>
            </div>
            <div className='mb-4'>
              <span className='dettail'>Status: </span>
              <span>{anime.status}</span>
            </div>
            <div className='mb-4'>
              <span className='dettail'>Other name: </span>
              <span>{anime.otherName}</span>
            </div>
          </div>
        </div>

        <div className="ml-[3vh] mb-[-1vh] flex">
          <figure className="w-[10vh] h-[10vh] overflow-hidden">
            <img src={luffy} alt="image" className='animation-zoro object-cover'/>
          </figure>         
          <h2 className="title text-3xl underline">Episodes</h2>
        </div> 
        <div className='text-white pl-[5vh] flex'>
          <div>
            <button className='w-[11vh] h-[5vh] bg-pink-300 border-pink-300 text-white mr-[3vh] mb-[3vh] rounded-[8px]'>
              EP{anime.recommendationScore} | SUB
            </button>
          </div>
        </div>
      </div>

      {/* <Share />
      <Footer /> */}
    </>
  );
}

export default AnimeDetail;
