import { Link } from 'react-router-dom';
import Backgrdimg from "../../../public/anime-studio.jpg";
import ImgLogo from '../shared/ImgLogo';

function MainPage() {
  return (
    <>
      <div style={{ 
        backgroundImage: `url(${Backgrdimg})`,
        height: '100vh',
        width: '100%',
        backgroundSize: 'cover',
        backgroundPosition: 'top 25% right 0'
      }}>
        <ImgLogo />
        <div className="maindiv px-[2rem]">
          <p className="main_p text-white font-bold text-5xl pt-[6rem] pl-[0rem] font-serif">Welcome to the AnimeBuzz</p>
          <p className="main_p1 text-[20px] font-semibold pt-[2rem] font-serrif" style={{ color: 'rgb(255, 192, 203)' }}>This website provides the latest, ongoing, popular, trending anime series, manga, and movies.</p>
          <h3 className='main_h3 mt-[5rem] mx-[10rem]'>
            <Link to="/home" className='main_a rounded-[10px] border-pink-200 p-4 bg-pink-300 hover:bg-green-300 font-bold'>
              Click here to enter
            </Link>
          </h3>
        </div>
      </div>
    </>
  );
}

export default MainPage;
