import Comment from '../model/commentsModel.js';
import User from '../model/userModel.js'; // Import User model

// Controller to create a new comment or rating
export const createComment = async (req, res) => {
    const { animeTitle, commentText, rating } = req.body;

    try {
        // Fetch the user's profile image from the database
        const user = await User.findById(req.user._id).select('profileImage name');

        const newComment = await Comment.create({
            animeTitle,
            commentText, 
            rating,
            user: req.user._id, // Use req.user._id instead of req.id
            userName: user.name, // Get user's name from the fetched user object
            profileImage: user.profileImage || "default-avatar-url" // Set profile image, use a default if none
        });

        res.status(201).json({
            success: true,
            message: "Comment and/or rating created successfully",
            comment: newComment,
        });
    } catch (error) {
        console.error("Error creating comment:", error);
        res.status(500).json({ success: false, message: "Failed to create comment", error: error.message });
    }
};

// Fetch comments for a specific anime episode
export const fetchCommentsForEpisode = async (req, res) => {
    const { animeTitle } = req.params;

    try {
        // Make the anime title search case insensitive
        const comments = await Comment.find({ animeTitle: { $regex: new RegExp(animeTitle, 'i') } })
                                      .populate('user', 'username avatar profileImage'); // Include profileImage

        res.status(200).json({ success: true, comments });
    } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({ success: false, message: "Failed to fetch comments", error: error.message });
    }
};

// Delete a comment
export const deleteComment = async (req, res) => {
    const { commentId } = req.params;

    try {
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({ success: false, message: "Comment not found" });
        }

        // Check if the user is the owner of the comment
        if (comment.user.toString() !== req.user._id.toString()) { // Ensure you are comparing ObjectId correctly
            return res.status(403).json({ success: false, message: "Not authorized to delete this comment" });
        }

        await Comment.findByIdAndDelete(commentId);
        res.status(200).json({ success: true, message: "Comment deleted successfully" });
    } catch (error) {
        console.error("Error deleting comment:", error);
        res.status(500).json({ success: false, message: "Failed to delete comment", error: error.message });
    }
};

// Update a comment
export const updateComment = async (req, res) => {
    const { commentId } = req.params;
    const { commentText, rating } = req.body;

    try {
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({ success: false, message: "Comment not found" });
        }

        // Check if the user is the owner of the comment
        if (comment.user.toString() !== req.user._id.toString()) { // Ensure you are comparing ObjectId correctly
            return res.status(403).json({ success: false, message: "Not authorized to update this comment" });
        }

        // Update the comment text and rating
        comment.commentText = commentText;
        comment.rating = rating;

        const updatedComment = await comment.save(); // Save the updated comment

        res.status(200).json({
            success: true,
            message: "Comment updated successfully",
            comment: updatedComment,
        });
    } catch (error) {
        console.error("Error updating comment:", error);
        res.status(500).json({ success: false, message: "Failed to update comment", error: error.message });
    }
};
