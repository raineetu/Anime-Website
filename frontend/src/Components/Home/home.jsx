import Trending from "./Trending";
import Carousel from "./Carousel"; 
import Share from "./share";
import Recentanime from "./Recentanime";
import Comments from "./Comments";
import Recommended from "./Recommended";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Home = () => {
  const {user} = useSelector(store => store.auth);
  const navigate = useNavigate();
  useEffect(() =>{
    if(user?.role ==='admin'){
      navigate("/admin/admindashboard");
    }
  }, []);
  return (
    <div>
      <Carousel />
      <Trending />
      <Recentanime />
      <Recommended />
      <Comments />
      <Share />
    </div>
  );
};

export default Home;
