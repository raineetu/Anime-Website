
function Adminmaincontent() {
  return (
    <>
    {/* Main Content Area */}
    <div className="bg-gray-800 text-white p-10 rounded-lg mt-10">
          <h2 className="text-3xl font-semibold font-serif text-pink-800 mb-6">
            Welcome to the Admin Dashboard
          </h2>
          <div className="grid grid-cols-3 gap-8">
            <div className="bg-white text-gray-800 p-6 shadow-lg rounded-lg">
              <h3 className="text-xl font-bold mb-2">Total Anime</h3>
              <p className="text-4xl">150</p>
            </div>
            <div className="bg-white text-gray-800 p-6 shadow-lg rounded-lg">
              <h3 className="text-xl font-bold mb-2">Users Registered</h3>
              <p className="text-4xl">500</p>
            </div>
            <div className="bg-white text-gray-800 p-6 shadow-lg rounded-lg">
              <h3 className="text-xl font-bold mb-2">Pending Reviews</h3>
              <p className="text-4xl">20</p>
            </div>
          </div>
        </div>
    </>
  )
}

export default Adminmaincontent