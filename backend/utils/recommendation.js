import Comment from '../model/commentsModel.js';
import Details from '../model/animeDetails.js';

// Calculate anime similarity matrix based on both ratings and genres
export const calculateSimilarityMatrix = async () => {
  const ratings = await Comment.find();
  const allAnime = await Details.find({}, { title: 1, genre: 1 }); // Fetch anime titles and genres
  let animeRatings = {};
  let animeGenres = {};

  // Step 1: Organize ratings by anime
  ratings.forEach((rating) => {
    const { animeTitle, user, rating: userRating } = rating;

    if (!animeTitle || !userRating) {
      console.error(`Invalid data found: animeTitle=${animeTitle}, userRating=${userRating}`);
      return;
    }

    if (!animeRatings[animeTitle]) {
      animeRatings[animeTitle] = {};
    }
    animeRatings[animeTitle][user] = userRating;
  });

  // Organize genres by anime using the data from the Anime collection
  allAnime.forEach((anime) => {
    const { title, genre } = anime;

    if (!title || !genre) {
      // console.error(`Invalid genre data found for animeTitle=${title}, genre=${genre}`);
      return;
    }

    animeGenres[title] = [genre]; // Convert string genre to array
  });

  let similarityMatrix = {};

  // Initialize matrix with default values
  for (let animeA in animeRatings) {
    similarityMatrix[animeA] = {};
    for (let animeB in animeRatings) {
      if (animeA !== animeB) {
        similarityMatrix[animeA][animeB] = 0;
      }
    }
  }

  // Calculate similarity scores (combining ratings and genres)
  for (let animeA in animeRatings) {
    for (let animeB in animeRatings) {
      if (animeA !== animeB) {
        const ratingSimilarity = computeCosineSimilarity(animeRatings[animeA], animeRatings[animeB]);
        const genreSimilarity = computeGenreSimilarity(animeGenres[animeA], animeGenres[animeB]);

        // Combine ratings similarity and genre similarity (weighted average)
        const combinedSimilarity = 0.7 * ratingSimilarity + 0.3 * genreSimilarity;
        similarityMatrix[animeA][animeB] = combinedSimilarity;

        // console.log(`Similarity between ${animeA} and ${animeB}: Rating=${ratingSimilarity}, Genre=${genreSimilarity}, Combined=${combinedSimilarity}`);
      }
    }
  }

  return similarityMatrix;
};

// Helper to compute cosine similarity between two anime rating vectors (Collaborative Filtering)
const computeCosineSimilarity = (ratingsA, ratingsB) => {
  const keysA = Object.keys(ratingsA);
  const keysB = Object.keys(ratingsB);
  const commonKeys = keysA.filter((key) => keysB.includes(key));

  if (commonKeys.length === 0) return 0; // No common users, similarity is 0

  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;

  for (let key of commonKeys) {
    dotProduct += ratingsA[key] * ratingsB[key];
    magnitudeA += Math.pow(ratingsA[key], 2);
    magnitudeB += Math.pow(ratingsB[key], 2);
  }

  magnitudeA = Math.sqrt(magnitudeA);
  magnitudeB = Math.sqrt(magnitudeB);

  if (magnitudeA === 0 || magnitudeB === 0) return 0;

  return dotProduct / (magnitudeA * magnitudeB);
};

// Helper to compute genre similarity using cosine similarity (Content-Based Filtering)
const computeGenreSimilarity = (genresA, genresB) => {
  if (!genresA || !Array.isArray(genresA) || genresA.length === 0 || !genresB || !Array.isArray(genresB) || genresB.length === 0) {
    return 0; // Invalid genre data
  }

  const allGenres = [...new Set([...genresA, ...genresB])];

  const vectorA = allGenres.map((genre) => (genresA.includes(genre) ? 1 : 0));
  const vectorB = allGenres.map((genre) => (genresB.includes(genre) ? 1 : 0));

  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;

  for (let i = 0; i < allGenres.length; i++) {
    dotProduct += vectorA[i] * vectorB[i];
    magnitudeA += Math.pow(vectorA[i], 2);
    magnitudeB += Math.pow(vectorB[i], 2);
  }

  magnitudeA = Math.sqrt(magnitudeA);
  magnitudeB = Math.sqrt(magnitudeB);

  return (magnitudeA === 0 || magnitudeB === 0) ? 0 : dotProduct / (magnitudeA * magnitudeB);
};

export function recommendAnime(userRatings, similarityMatrix) {
  const recommendedTitles = new Set();

  // Check if the user has any ratings
  if (userRatings.length === 0) {
    // Recommend popular anime if the user has no ratings
    return recommendPopularAnime();
  }

  userRatings.forEach((userRating) => {
    const animeTitle = userRating.animeTitle;
    const rating = userRating.rating;

    if (rating > 0) {
      for (const [otherTitle, similarityScore] of Object.entries(similarityMatrix[animeTitle] || {})) {
        if (otherTitle !== animeTitle && similarityScore > 0.7) {
          recommendedTitles.add(otherTitle);
        }
      }
    }
  });

  return Array.from(recommendedTitles);
}

// Fallback function to recommend popular anime (you may customize the logic here)
const recommendPopularAnime = async () => {
  const allAnime = await Details.find({}, { title: 1 }).sort({ rating: -1 }).limit(10); // Assuming you have a 'rating' field
  return allAnime.map(anime => anime.title);
};
