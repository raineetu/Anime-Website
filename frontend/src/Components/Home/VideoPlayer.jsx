import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import Modal from "react-modal";
import toast from "react-hot-toast";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";

const API_URL = "http://localhost:8001";

function VideoPlayer() {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [error, setError] = useState(null);
  const [currentVideoUrl, setCurrentVideoUrl] = useState(""); //////yo gara 
  const [userRating, setUserRating] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userReview, setUserReview] = useState(null);

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const loggedInUserName = storedUser ? storedUser.name : "Anonymous User";
  const loggedInUserAvatar = storedUser
    ? storedUser.profileImage
    : "default-avatar-url";

  useEffect(() => {
    const fetchAnimeData = async () => {
      try {
        const animeRes = await axios.get(`http://localhost:8001/detail/${id}`); ////api bata video ko leu
        setAnime(animeRes.data);
        if (animeRes.data.episode.length > 0) {
          setCurrentVideoUrl(animeRes.data.episode[0].videoUrl); 
        } ////yetti samman ho video ko lagi

        const reviewsRes = await axios.get(
          `${API_URL}/comments/${animeRes.data.title}`
        );
        setReviews(reviewsRes.data.comments.reverse());
        const existingReview = reviewsRes.data.comments.find(
          (review) => review.username === loggedInUserName
        );
        if (existingReview) {
          setUserReview(existingReview);
          setReviewText(existingReview.commentText);
          setUserRating(existingReview.rating);
          setIsSubmitted(true);
        }

        // Check localStorage for submission status
        const submittedStatus = localStorage.getItem(
          `reviewed_${animeRes.data.title}`
        );
        if (submittedStatus === "true") {
          setIsSubmitted(true);
        }
      } catch (error) {
        handleFetchError(error);
      }
    };

    fetchAnimeData();
  }, [id, loggedInUserName]);

  const handleFetchError = (error) => {
    console.error("Error fetching data:", error);
    setError(error);
    toast.error("Failed to fetch data. Please try again later.");
  };

  const handleRating = (rating) => {
    if (!isSubmitted) {
      setUserRating(rating);
    }
  };

  const handleEpisodeClick = (videoUrl) => { ////yo click garda chalnu parxa vanera
    setCurrentVideoUrl(videoUrl);
  };

  const handleSubmitRating = async () => {
    if (!reviewText || userRating === 0) {
      toast.error(
        "Please select a rating and enter a review before submitting!"
      );
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User is not authenticated.");

      const commentData = {
        animeTitle: anime.title,
        commentText: reviewText,
        rating: userRating,
        username: loggedInUserName,
        avatar: loggedInUserAvatar,
        datePosted: new Date().toISOString(),
      };

      if (userReview) {
        await axios.put(`${API_URL}/comments/${userReview._id}`, commentData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Review updated successfully!");
      } else {
        await axios.post(`${API_URL}/comments`, commentData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Comment and Review posted successfully!");
      }

      const res = await axios.get(`${API_URL}/comments/${anime.title}`);

      setUserReview(commentData);
      setIsModalOpen(false);
      setReviewText("");
      setUserRating(0);
      setIsSubmitted(true);
      localStorage.setItem(`reviewed_${anime.title}`, "true");
    } catch (error) {
      console.error(
        "Error submitting review:",
        error.response ? error.response.data : error.message
      );
      toast.error("Failed to submit review. Please try again!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8001/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setReviews(reviews.filter((review) => review._id !== commentId));
      toast.success("Comment deleted successfully!");
    } catch (error) {
      console.error(
        "Error deleting comment:",
        error.response ? error.response.data : error.message
      );
      toast.error("Failed to delete comment. Please try again.");
    }
  };

  const handleEditComment = (commentId) => {
    const existingReview = reviews.find((review) => review._id === commentId);
    if (existingReview) {
      setUserReview(existingReview);
      setReviewText(existingReview.commentText);
      setUserRating(existingReview.rating);
      setIsModalOpen(true);
    }
  };

  if (error) {
    return (
      <div className="text-white">
        Error fetching data. Please try again later.
      </div>
    );
  }

  if (!anime) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <>
      <div className="pt-[18vh] h-full w-full flex pb-[5vh]">
        <div className="w-1/4 mx-[2vh] rounded-[3vh] bg-[rgb(32,31,49)] p-[2vh] shadow-lg">
          <h1 className="text-yellow-300 text-3xl font-bold">
            List of Episodes:
          </h1>
          {anime.episode && Array.isArray(anime.episode) ? (
            <ul className="mt-4 list-none p-0">
              {anime.episode.map((episode, index) => (
                <li
                  key={index}
                  className={`cursor-pointer p-2 mb-1 rounded transition-colors ${
                    currentVideoUrl === episode.videoUrl
                      ? "bg-yellow-300 text-gray-800"
                      : "text-white"
                  }`}
                  onClick={() => handleEpisodeClick(episode.videoUrl)}
                >
                  Episode {index + 1}: {episode.title}
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-white">No episodes available.</div>
          )}
        </div>

        <div className="w-[45%]">
          <div className="player-wrapper">
            <ReactPlayer
              className="react-player"
              url={currentVideoUrl}
              width="100%"
              height="500px"
              controls={true}
            />
          </div>
        </div>

        <div className="w-[14] mx-[2vh] rounded-[3vh] bg-[rgb(32,31,49)] p-[2vh] shadow-lg">
          <img
            src={anime.imageUrl}
            alt={anime.title}
            className="rounded-lg shadow-lg my-[3vh] w-[15vh] h-[15vh] object-cover"
          />
          <h1 className="text-white text-3xl font-bold">{anime.title}</h1>
          <div
            className="w-[45vh] h-[35vh] bg-opacity-75 rounded-[3vh] mt-[2vh]"
            style={{ backgroundColor: "rgba(47, 47, 47, 0.8)" }}
          >
            <div className="text-green-400 p-1">
              <FontAwesomeIcon icon={faStar} /> {anime.averageRating}
            </div>
            <h1 className="text-white pl-[12vh] font-bold text-xl underline">
              Rate this Anime
            </h1>

            <button
              className={`bg-pink-300 hover:bg-pink-400 text-gray-800 font-bold py-2 px-4 rounded mt-4 ml-[13vh] ${
                isSubmitted ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => {
                if (!isSubmitted) {
                  setIsModalOpen(true);
                }
              }}
              disabled={isSubmitted} // Disable if review is submitted
            >
              {isSubmitted ? "Review Submitted" : "Submit Review"}
            </button>
            <img src="/handpointing.png" className="w-[15vh] h-[15vh]" />
          </div>
        </div>
      </div>

      {/* Modal for review */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="modal-content"
        overlayClassName="modal-overlay"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
          },
          content: {
            position: "absolute",
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "10px",
            padding: "20px",
          },
        }}
      >
        <div className="shadow-lg bg-gray-950 bg-opacity-75 shadow-black rounded-lg p-6 w-[60vh] h-[60vh] mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-yellow-300">
            Add Review for {anime.title}
          </h2>
          <p className="text-white mb-4 text-2xl">
            Reviewing as:{" "}
            <span className="font-semibold text-green-400">
              {loggedInUserName}
            </span>
          </p>
          <div className="rating mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <FontAwesomeIcon
                key={star}
                icon={faStar}
                className={`cursor-pointer text-3xl ${
                  star <= userRating ? "text-yellow-500" : "text-gray-400"
                }`}
                onClick={() => handleRating(star)}
              />
            ))}
          </div>
          <textarea
            className="w-full p-2 mb-4 border rounded"
            placeholder="Write your review..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
          <button
            onClick={handleSubmitRating}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      </Modal>

      {/* Display reviews */}
      <div className="reviews-section ">
        <h2 className="text-3xl font-bold text-green-400 font-serrif ml-[70vh]">
          Comments and Ratings:
        </h2>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review._id}
              className="review bg-gray-800 rounded-lg p-4 my-4 flex justify-between"
            >
              <div>
                <div className="flex items-center">
                  <div className="ring-primary ring-offset-base-100 w-14 h-14 rounded-full ring ring-offset-7 flex justify-center items-center">
                    <img
                      src={`http://localhost:8001/${review.profileImage.replace(/\\/g, "/" )}`}
                      alt={`${review.userName}'s profile`}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>

                  <div className="ml-[5vh]">
                    <h4 className="text-white font-bold">{review.userName}</h4>
                    <p className="text-gray-400">
                      Posted on:{" "}
                      {moment(review.createdAt).format("MMMM Do YYYY, h:mm A")}{" "}
                      {/* Display full date and time */}
                      <span className="ml-2">
                        ({moment(review.createdAt).fromNow()})
                      </span>{" "}
                      {/* Relative time */}
                    </p>
                    <div className="text-yellow-500 flex">
                      {Array.from({ length: review.rating }, (_, index) => (
                        <FontAwesomeIcon key={index} icon={faStar} />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-white mt-2 ml-[6vh]">{review.commentText}</p>
              </div>
              <div className="flex ">
                <button onClick={() => handleDeleteComment(review._id)}>
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="text-red-600 hover:text-red-500 mr-[2vh] text-xl"
                  />
                </button>
                <button onClick={() => handleEditComment(review._id)}>
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="text-green-400 hover:text-green-600 mr-[4vh] text-xl"
                  />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-white">No reviews yet.</div>
        )}
      </div>
    </>
  );
}

export default VideoPlayer;
