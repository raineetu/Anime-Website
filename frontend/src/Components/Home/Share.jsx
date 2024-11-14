import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

function Share() {
  return (
    <>
      <div className='flex flex-col sm:flex-row items-center sm:ml-[10vw] mt-[58vh] md:mt-[0vh]'>
        <div className='flex items-center mb-4 sm:mb-0'>
          <img src='/nezuko.png' className='w-[20vh] md:w-[19vh]  h-[30vh] animation-zoro' alt="Nezuko" />
          <div className='ml-2'>
            <h1 className='text-pink-500 text-[5vw] sm:text-[3vh]'>Share AnimeBuzz</h1>
            <h1 className='text-green-500 text-[5vw] sm:text-[3vh]'>to your friends</h1>
          </div>
        </div>
        <div className='flex mt-1 md:mt-4 sm:mt-0 space-x-6 justify-center sm:justify-start flex-wrap ml-[3vh]'>
          <a href='https://www.facebook.com' target='_blank' rel='noopener noreferrer' className='flex items-center text-white w-[40vw] sm:w-[18vh] h-[6vh] bg-blue-600 rounded-[12px] pl-[2vh] mb-4 sm:mb-0 justify-center'>
            <FaFacebook className='w-6 h-6 mr-2' />Facebook
          </a>
          <a href='https://www.twitter.com' target='_blank' rel='noopener noreferrer' className='flex items-center text-white w-[40vw] sm:w-[18vh] h-[6vh] bg-blue-400 rounded-[12px] pl-[2vh] mb-4 sm:mb-0 justify-center'>
            <FaTwitter className='w-6 h-6 mr-2' />Twitter
          </a>
          <a href='https://www.instagram.com' target='_blank' rel='noopener noreferrer' className='flex items-center text-white w-[40vw] sm:w-[18vh] h-[6vh] bg-pink-600 rounded-[12px] pl-[2vh] mb-4 sm:mb-0 justify-center'>
            <FaInstagram className='w-6 h-6 mr-2' />Instagram
          </a>
          <a href='https://www.linkedin.com' target='_blank' rel='noopener noreferrer' className='flex items-center text-white w-[40vw] sm:w-[18vh] h-[6vh] bg-blue-700 rounded-[12px] pl-[2vh] mb-4 sm:mb-0 justify-center'>
            <FaLinkedin className='w-6 h-6 mr-2' />LinkedIn
          </a>
        </div>
      </div>
    </>
  );
}

export default Share;
