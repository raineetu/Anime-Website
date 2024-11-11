import { calculateSimilarityMatrix, recommendAnime } from '../utils/recommendation.js';
import Comment from '../model/commentsModel.js';
import Details from '../model/animeDetails.js';

export const getRecommendations = async (req, res) => {
  try {
    const userId = req.params.userId.trim();
    // console.log('Recommendations route hit for user:', userId);
    
    // Fetch user ratings
    const userRatings = await Comment.find({ user: userId });
    // console.log("User Ratings:", userRatings);

    if (!userRatings.length) {
      return res.status(404).json({ message: "No ratings found for this user." });
    }

    // Calculate the similarity matrix
    const similarityMatrix = await calculateSimilarityMatrix();
    // console.log("Similarity Matrix:", similarityMatrix);

    // Generate recommendations for the user
    let recommendations = await recommendAnime(userRatings, similarityMatrix);
    // console.log("Recommendations before filtering:", recommendations);

    // Ensure recommendations is an array
    if (!Array.isArray(recommendations) || recommendations.length === 0) {
      // console.error("recommendAnime did not return valid recommendations:", recommendations);
      return res.status(404).json({ message: "No recommendations found for this user." });
    }

    // Remove duplicates from recommendations array
    recommendations = [...new Set(recommendations)];

    // Fetch comments and descriptions for each recommended anime
    const animeDetails = await Promise.all(recommendations.map(async (animeTitle) => {
      const detail = await Details.findOne({ title: animeTitle });
      const comment = await Comment.findOne({ animeTitle });

      return {
        animeTitle,
        id: detail ? detail.id : "No id",
        profileImage: detail ? detail.imageUrl : (comment ? comment.profileImage : "default-image.jpg"),
        rating: comment ? comment.rating : "No rating available",
        genre: detail ? detail.genre : "No genre",
      };
    }));

    // Filter out any null values
    const validAnimeDetails = animeDetails.filter(detail => detail !== null);

    // Handle case where no recommendations were found
    if (validAnimeDetails.length === 0) {
      return res.status(404).json({ message: "No recommendations found for this user." });
    }

    // Return the final list of anime details
    return res.status(200).json(validAnimeDetails);
  } catch (error) {
    // console.error("Error fetching recommendations:", error.message);
    res.status(500).json({ message: "Server error occurred while fetching recommendations." });
  }
};
