import Popularity from '../model/popularity.js';
import Comment from '../model/commentsModel.js';
import Details from '../model/animeDetails.js';

export const getPopularAnime = async (req, res) => {
    // console.log('Received request: GET /populars');

    try {
        const allAnimeDetails = await Details.find().lean();
        const popularityEntries = await Popularity.find();
        const popularityMap = {};

        popularityEntries.forEach(entry => {
            if (entry.animeId) {
                popularityMap[entry.animeId.toString()] = entry;
            } else {
                // console.warn(`animeId is missing for entry: ${entry.title}`);
            }
        });

        const updatedAnimeList = await Promise.all(
            allAnimeDetails.map(async (anime) => {
                let popularityEntry = popularityMap[anime._id.toString()];

                // If no popularity entry exists, create one with initial values
                if (!popularityEntry) {
                    popularityEntry = new Popularity({
                        animeId: anime._id,
                        title: anime.animeTitle,
                        viewCount: 1,
                        averageRating: 0,
                        viewedBy: [req.user._id]
                    });
                    await popularityEntry.save();
                }

                // Check if the user has already viewed this anime
                if (!popularityEntry.viewedBy.includes(req.user._id)) {
                    popularityEntry.viewCount += 1;
                    popularityEntry.viewedBy.push(req.user._id);
                    await popularityEntry.save();
                }

                // Using MongoDB aggregation to calculate the average rating
                const averageRatingResult = await Comment.aggregate([
                    { $match: { animeTitle: anime.title } },  // Match comments for this anime
                    { $group: { _id: null, avgRating: { $avg: "$rating" } } }  // Calculate average rating
                ]);

                const averageRating = averageRatingResult.length > 0 ? averageRatingResult[0].avgRating : 0;

                // Update the average rating in the Popularity entry
                popularityEntry.averageRating = averageRating;
                await popularityEntry.save();  // Save the updated Popularity entry

                // Also update the average rating in the Details model
                await Details.findByIdAndUpdate(anime._id, { averageRating: averageRating });

                // Calculate popularity score
                const popularityScore = popularityEntry.viewCount + averageRating;

                return {
                    _id: anime._id,
                    title: anime.title,
                    viewCount: popularityEntry.viewCount,
                    averageRating: averageRating,
                    popularityScore: popularityScore,
                };
            })
        );

        // Sort and return top 10 anime
        const top10Anime = updatedAnimeList
            .sort((a, b) => {
                if (b.popularityScore === a.popularityScore) {
                    return b.viewCount - a.viewCount;
                }
                return b.popularityScore - a.popularityScore;
            })
            .slice(0, 10);

        res.status(200).json(top10Anime);
    } catch (error) {
        // console.error('Error fetching popular anime:', error);
        res.status(500).json({ error: 'Failed to retrieve popular anime' });
    }
};
