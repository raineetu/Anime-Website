import { FaTachometerAlt, FaFilm, FaUserFriends } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";

function Admindashboard() {
  return (
    <div className="flex h-[100vh] mt-[16vh]">
      {/* Sidebar */}
      <div className="w-[40vh] bg-gray-800 text-white p-5">
        <h1 className="text-3xl font-bold font-serif mb-10">Anime Website</h1>
        <ul className="space-y-4">
          
          <li className="flex items-center text-[22px] font-serif">
            <FaFilm className="mr-2 text-green-600" />
            <Link to="addanime" className="block py-2 px-4 hover:bg-gray-700">
              Manage Anime
            </Link>
          </li>
          <li className="flex items-center text-[22px] font-serif">
            <FaUserFriends className="mr-2 text-green-600" />
            <Link to="/users" className="block py-2 px-4 hover:bg-gray-700">
              Users
            </Link>
          </li>
          
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-gray-100 p-10 ">
        <Outlet /> 
      </div>
    </div>
  );
}

export default Admindashboard;
