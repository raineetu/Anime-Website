import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

function Share() {  // Change the name to 'Share'
  return (
    <>
      <div className='flex items-center ml-[30vh] h-[20vh] mt-[-5vh]'>
        <div className='flex items-center'>
          <img src='/nezuko.png' className='w-[19vh] h-[30vh] animation-zoro' alt="Nezuko" />
          <div className='ml-2'>
            <h1 className='text-pink-500 text-[3vh]'>Share AnimeBuzz</h1>
            <h1 className='text-green-500 text-[3vh]'>to your friends</h1>
          </div>
        </div>
        <div className='flex mt-2 space-x-6 ml-[5vh]'>
          <a href='https://www.facebook.com' target='_blank' rel='noopener noreferrer' className='flex items-center text-white w-[18vh] h-[6vh] bg-blue-600 rounded-[12px] pl-[2vh]'>
            <FaFacebook className='w-6 h-6 mr-2' />Facebook
          </a>
          <a href='https://www.twitter.com' target='_blank' rel='noopener noreferrer' className='flex items-center text-white w-[18vh] h-[6vh] bg-blue-400 rounded-[12px] pl-[2vh]'>
            <FaTwitter className='w-6 h-6 mr-2' />Twitter
          </a>
          <a href='https://www.instagram.com' target='_blank' rel='noopener noreferrer' className='flex items-center text-white w-[18vh] h-[6vh] bg-pink-600 rounded-[12px] pl-[2vh]'>
            <FaInstagram className='w-6 h-6 mr-2' />Instagram
          </a>
          <a href='https://www.linkedin.com' target='_blank' rel='noopener noreferrer' className='flex items-center text-white w-[18vh] h-[6vh] bg-blue-700 rounded-[12px] pl-[2vh]'>
            <FaLinkedin className='w-6 h-6 mr-2' />LinkedIn
          </a>
        </div>
      </div>
    </>
  );
}

export default Share; // Make sure to export 'Share'
