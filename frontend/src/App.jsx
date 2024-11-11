import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './Components/auth/AuthProvider';
import { Toaster } from 'react-hot-toast';
import MainPage from './Components/Home/MainPage';
import Home from './Components/Home/home';
import Login from './Components/auth/login';
import Signup from './Components/auth/signup';
import Navbar from './Components/shared/Navbar';
import AnimePage from './Components/Home/AnimePage';
import Details from './Components/Home/Details';
import AnimeList from './Components/Home/AnimeList';
import VideoPlayer from './Components/Home/VideoPlayer';
import Movies from './Components/Home/Movies';
import NewAnimeAdd from './Components/Admin/NewAnimeAdd';
import UserDashboard from './Components/Home/UserDashboard';
import Users from './Components/Admin/Users';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster />
        <ConditionalNavbar /> {/* Moved Navbar here to show conditionally */}
        <Routes>
          {/* Public routes */}
          <Route path='/' element={<Navigate to="/home" />} />
          <Route path='/home' element={<Home />} />
          <Route path='/mainpage' element={<MainPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/anime/:id' element={<AnimePage />} />
          <Route path='/details/:id' element={<Details />} />
          <Route path='/list' element={<AnimeList />} />
          <Route path='/anime/:id/video' element={<VideoPlayer />} />
          <Route path='/movies' element={<Movies />} />
          <Route path="/addanime" element={<NewAnimeAdd />} />
          <Route path="/userdashboard" element={<UserDashboard />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

// ConditionalNavbar Component
function ConditionalNavbar() {
  const location = useLocation();

  // Hide Navbar on specific routes
  const hideNavbarRoutes = ['/mainpage', '/login', '/signup'];
  if (hideNavbarRoutes.includes(location.pathname)) {
    return null;
  }

  return <Navbar />;
}

export default App;
