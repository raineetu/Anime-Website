import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouseUser,
  faList,
  faFilm,
  faUser,
  faHeart,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import axios from "axios";
import ImgLogo from "./Imglogo";
import Login from "../auth/login";
import SearchResults from "../Home/SearchResults";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import AdminDashboard from "../Admin/AdminDashboard";

export default function Navbar() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [mdropdownVisible, msetDropdownVisible] = useState(false);
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [input, setInput] = useState("");
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchData = async (value) => {
    try {
      const response = await axios.get("http://localhost:8001/detail");
      const json = response.data;
      const filteredResults = json.filter(
        (item) =>
          item &&
          item.title &&
          item.title.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(filteredResults);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (value) => {
    setInput(value);
    if (value) {
      fetchData(value);
    } else {
      setSearchResults([]);
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const handleShowLogin = () => {
    setIsLoginVisible(true);
  };

  useEffect(() => {
    if (user) {
      setIsLoginVisible(false);
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      const res = await axios.post("http://localhost:8001/user/logout");
      console.log(res.data);
      if (res.data.success) {
        dispatch(logout());
        navigate("/");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const NavItems = () => (
    <div className="flex space-x-7">
      <li className="text-xl">
        <Link to="/" className="text-white">
          <FontAwesomeIcon icon={faHouseUser} /> Home
        </Link>
      </li>
      <li className="text-xl">
        <Link to="/list" className="hover:text-gray-400 text-white">
          <FontAwesomeIcon icon={faList} /> Anime List
        </Link>
      </li>
      <li className="text-xl">
        <Link to="/movies" className="hover:text-gray-400 text-white">
          <FontAwesomeIcon icon={faFilm} /> Movies
        </Link>
      </li>
    </div>
  );

  return (
    <>
      <div className="navbar flex items-center w-full h-[8rem] fixed top-0 z-50 px-[4vh] py-2 bg-opacity-80 bg-[#162a41] shadow-md">
        {/* Logo */}
        <div className="flex-none">
          <ImgLogo />
        </div>

        {/* Conditional rendering based on user role */}
        {user && user.role === "admin" ? (
          <div className="flex-1 ml-auto">
            {/* Profile */}
            <div className="ml-[150vh]">
              <div className="avatar cursor-pointer" onClick={toggleDropdown}>
                <div className="ring-primary ring-offset-base-100 w-14 rounded-full ring ring-offset-7">
                  <img
                    src="https://e1.pxfuel.com/desktop-wallpaper/478/632/desktop-wallpaper-artstation-nezuko-chibi.jpg"
                    alt="Profile"
                    className="rounded-full object-cover"
                  />
                </div>
              </div>

              {dropdownVisible && (
                <div className="absolute right-0 mt-1 w-48 text-white shadow-lg rounded-lg bg-gray-800 bg-opacity-75 shadow-black">
                  <ul className="space-y-4">
                    <Link to="/admindashboard">
                      <li className="pt-2 flex items-center px-4 pb-2 cursor-pointer">
                        <FontAwesomeIcon
                          icon={faUser}
                          className="mr-1 text-green-500"
                        />
                        <span>Admin Dashboard</span>
                      </li>
                    </Link>
                    <li
                      className="flex items-center px-4 pb-2 cursor-pointer"
                      onClick={handleLogout}
                    >
                      <FontAwesomeIcon
                        icon={faSignOutAlt}
                        className="mr-1 text-red-500"
                      />
                      <span>Logout</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            {/* Nav items */}
            <div className="flex-1 hidden lg:flex justify-center mr-[5vh]">
              <ul className="menu menu-horizontal space-x-7">
                <NavItems />
              </ul>
            </div>

            {/* Mobile navbar toggle */}
            <div className="lg:hidden flex items-center mx-[2vh]">
              <button
                onClick={() => msetDropdownVisible(!mdropdownVisible)}
                className="text-white"
              >
                <FontAwesomeIcon icon={faList} />
              </button>
              {mdropdownVisible && (
                <div className="absolute  mt-[15vh] w-48 text-white shadow-lg rounded-lg bg-gray-800 bg-opacity-75 shadow-black">
                  <ul className=" ">
                    <li className="text-xl">
                      <Link to="/" className="text-white">
                        <FontAwesomeIcon icon={faHouseUser} /> Home
                      </Link>
                    </li>
                    <li className="text-xl">
                      <Link
                        to="/list"
                        className="hover:text-gray-400 text-white"
                      >
                        <FontAwesomeIcon icon={faList} /> Anime List
                      </Link>
                    </li>
                    <li className="text-xl">
                      <Link
                        to="/movies"
                        className="hover:text-gray-400 text-white"
                      >
                        <FontAwesomeIcon icon={faFilm} /> Movies
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Search Bar */}
            <div className="w-[30%] flex mr-[2vh] md:mx-2">
              <div className="relative flex-none w-1/5 flex items-center space-x-5 justify-start mr-40">
                <input
                  type="text"
                  placeholder="Enter anime name"
                  className="input"
                  style={{
                    height: "40px",
                    padding: "10px",
                    fontSize: "16px",
                    borderRadius: "10px",
                  }}
                  value={input}
                  onChange={(e) => handleChange(e.target.value)}
                />
                {input && searchResults.length > 0 && (
                  <SearchResults results={searchResults} />
                )}
              </div>

              {/* Show Login button if no user */}
              {!user ? (
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-lg mr-12"
                  onClick={handleShowLogin}
                >
                  Login
                </button>
              ) : (
                <div className="relative">
                  <div
                    className="avatar cursor-pointer"
                    onClick={toggleDropdown}
                  >
                    <div className="ring-primary ring-offset-base-100 w-14 h-14 rounded-full ring ring-offset-7 flex justify-center items-center ml-[3vh] md:ml[1vh]">
                      <img
                        src={`http://localhost:8001/${user.profileImage.replace(
                          /\\/g,
                          "/"
                        )}`}
                        alt="Profile"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                  </div>

                  {dropdownVisible && (
                    <div className="absolute left-0 mt-1 w-48 text-white shadow-lg rounded-lg bg-gray-800 bg-opacity-75 shadow-black">
                      <ul className="space-y-4">
                        <Link to="/userdashboard">
                          <li className="pt-2 flex items-center px-4 pb-2 cursor-pointer">
                            <FontAwesomeIcon
                              icon={faUser}
                              className="mr-1 text-green-500"
                            />
                            <span>Profile</span>
                          </li>
                        </Link>
                        <li
                          className="flex items-center px-4 pb-2 cursor-pointer"
                          onClick={handleLogout}
                        >
                          <FontAwesomeIcon
                            icon={faSignOutAlt}
                            className="mr-1 text-red-500"
                          />
                          <span>Logout</span>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {user && user.role === "admin" && <AdminDashboard />}

      {isLoginVisible && !user && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-35">
          <div>
            <Login onClose={() => setIsLoginVisible(false)} />
          </div>
        </div>
      )}
    </>
  );
}
