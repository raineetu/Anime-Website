import mongoose from 'mongoose'; 
import Details from '../model/animeDetails.js';

export const getDetails = async (req, res) => {
    const { id, letter } = req.params;

    // Trim the ID to remove any whitespace or newline characters
    const trimmedId = id ? id.trim() : null;

    try {
        // Check if an ID is provided
        if (trimmedId) {
            // Check if the ID is a valid MongoDB ObjectId
            if (mongoose.isValidObjectId(trimmedId)) {
                // console.log('Fetching detail by MongoDB ObjectId:', trimmedId);
                const detail = await Details.findById(trimmedId);
                if (!detail) {
                    return res.status(404).json({ message: 'Anime not found' });
                }
                return res.status(200).json(detail);
            } else {
                // If not a valid ObjectId, check if it's a numeric ID
                const numericId = Number(trimmedId);
                if (isNaN(numericId)) {
                    return res.status(400).json({ message: 'Invalid ID format' });
                }
                const detail = await Details.findOne({ id: numericId });
                if (!detail) {
                    return res.status(404).json({ message: 'Anime not found' });
                }
                return res.status(200).json(detail);
            }
        } 
        
        // Check if a letter is provided
        else if (letter) {
            const trimmedLetter = letter.trim();
            const regexPattern = new RegExp(`^${trimmedLetter}`, 'i');
            const details = await Details.find({
                title: { $regex: regexPattern }
            });
            if (details.length === 0) {
                return res.status(404).json({ message: 'No anime found for this letter' });
            }
            return res.status(200).json(details);
        } 
        
        // If neither id nor letter is provided, fetch all details
        else {
            const details = await Details.find();
            return res.status(200).json(details);
        }
    } catch (error) {
        console.error('Error while fetching details:', error);
        return res.status(500).json({ message: 'Server Error', error });
    }
};

export const postDetails = async (req, res) => {
    const { id, title, description, imageUrl, genre, released, status, otherName, videoUrl, episode, type } = req.body;

    // Validation: Check if all required fields are present
    if (!id || !title || !description || !imageUrl || !genre || !released || !status || !episode || !type) {
        return res.status(400).json({ message: 'Please fill in all required fields' });
    }

    // Ensure type is either 'TV' or 'Movie'
    if (type !== 'TV' && type !== 'Movie') {
        return res.status(400).json({ message: 'Type must be either "TV" or "Movie"' });
    }

    try {
        // Check if an anime with the same id already exists
        const existingAnime = await Details.findOne({ id });
        if (existingAnime) {
            return res.status(409).json({ message: 'Anime with this ID already exists' });
        }

        // Create a new anime detail
        const newAnimeDetail = new Details({
            id,
            title,
            description,
            imageUrl,
            genre,
            released,
            status,
            otherName: otherName || '',
            videoUrl,
            episode,
            type  // Add the type field
        });

        // Save the new anime detail to the database
        const savedAnime = await newAnimeDetail.save();
        console.log('Received data:', req.body);

        // Send a success response with the saved anime detail
        return res.status(201).json(savedAnime);
    } catch (error) {
        console.error('Error while saving anime details:', error);
        return res.status(500).json({ message: 'Server error', error });
    }
};
export const updateDetails = async (req, res) => {
    const { id } = req.params;
    const { imageUrl, videoUrl, episode } = req.body;

    // Ensure the ID is trimmed of whitespace or newline characters
    const trimmedId = id ? id.trim() : null;

    // Only allow updating imageUrl, videoUrl, and episode fields
    const updateData = {};
    if (imageUrl) updateData.imageUrl = imageUrl;
    if (videoUrl) updateData.videoUrl = videoUrl;
    if (episode) updateData.episode = episode;

    try {
        // Validate ObjectId or numeric ID
        if (trimmedId && mongoose.isValidObjectId(trimmedId)) {
            // Update by MongoDB ObjectId
            const updatedAnime = await Details.findByIdAndUpdate(trimmedId, updateData, { new: true });
            if (!updatedAnime) {
                return res.status(404).json({ message: 'Anime not found' });
            }
            return res.status(200).json(updatedAnime);
        } else {
            // Update by numeric ID if it's valid
            const numericId = Number(trimmedId);
            if (isNaN(numericId)) {
                return res.status(400).json({ message: 'Invalid ID format' });
            }

            const updatedAnime = await Details.findOneAndUpdate({ id: numericId }, updateData, { new: true });
            if (!updatedAnime) {
                return res.status(404).json({ message: 'Anime not found' });
            }
            return res.status(200).json(updatedAnime);
        }
    } catch (error) {
        console.error('Error while updating details:', error);
        return res.status(500).json({ message: 'Server Error', error });
    }
};
export const deleteDetails = async (req, res) => {
    const { id } = req.params;

    // Trim whitespace or newline characters from the ID
    const trimmedId = id ? id.trim() : null;

    try {
        if (trimmedId && mongoose.isValidObjectId(trimmedId)) {
            // Delete by MongoDB ObjectId
            const deletedAnime = await Details.findByIdAndDelete(trimmedId);
            if (!deletedAnime) {
                return res.status(404).json({ message: 'Anime not found' });
            }
            return res.status(200).json({ message: 'Anime deleted successfully' });
        } else {
            // Delete by numeric ID if it's valid
            const numericId = Number(trimmedId);
            if (isNaN(numericId)) {
                return res.status(400).json({ message: 'Invalid ID format' });
            }

            const deletedAnime = await Details.findOneAndDelete({ id: numericId });
            if (!deletedAnime) {
                return res.status(404).json({ message: 'Anime not found' });
            }
            return res.status(200).json({ message: 'Anime deleted successfully' });
        }
    } catch (error) {
        console.error('Error while deleting details:', error);
        return res.status(500).json({ message: 'Server Error', error });
    }
};

export const updateRating = async (req, res) => {
    const { id } = req.params;
    const { rating } = req.body;

    if (!rating || rating < 1 || rating > 5) {
        return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    const trimmedId = id.trim();

    try {
        let anime;
        if (mongoose.isValidObjectId(trimmedId)) {
            anime = await Details.findById(trimmedId);
        } else {
            const numericId = Number(trimmedId);
            if (isNaN(numericId)) {
                return res.status(400).json({ message: 'Invalid ID format' });
            }
            anime = await Details.findOne({ id: numericId });
        }

        if (!anime) {
            return res.status(404).json({ message: 'Anime not found' });
        }

        // Update the ratings array and recalculate average
        anime.ratings.push(rating);
        const totalRatings = anime.ratings.reduce((acc, curr) => acc + curr, 0);
        anime.averageRating = (totalRatings / anime.ratings.length).toFixed(2);

        await anime.save();
        return res.status(200).json({ message: 'Rating added successfully', averageRating: anime.averageRating });
    } catch (error) {
        console.error('Error while updating rating:', error);
        return res.status(500).json({ message: 'Server Error', error });
    }
};
