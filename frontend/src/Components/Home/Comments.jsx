
function Comments() {
    

    return (
        <div className='w-full h-[55vh] bg-[#0d1e2f] flex pl-[5vh] mb-[7vh] pt-[5vh] mt-[7vh]'>
            <div className='w-full h-full'>
                <img src='https://hianime.to/images/discussion.png' className='w-full h-full' alt="Discussion" />
            </div>
            <div className='ml-[8vh] mt-[3vh]'>
                <button className='w-[20vh] h-[6vh] rounded-[4vh] bg-pink-300 text-white font-semibold text-1xl'>AnimeBuzz</button>
                <h1 className='inline-block text-white pl-[3vh] text-3xl font-serif font-semibold '>About us</h1>

                <div className='flex w-[80%] h-full mt-[2vh] text-white font-serif text-[20px]'>
                    <p>
                    Welcome to our anime website, your ultimate destination for all things anime! We provide a comprehensive platform where anime enthusiasts can explore a vast collection of titles, from classic series to the latest releases. Our user-friendly interface allows visitors to easily navigate through genres, discover trending shows, and read insightful reviews. Whether you're a seasoned fan or new to the world of anime, our website offers personalized recommendations, a community forum for discussions, and tools to track your favorite series. Join us on this exciting journey through the vibrant universe of anime!</p>
                </div>
            </div>
        </div>
    );
}

export default Comments;
