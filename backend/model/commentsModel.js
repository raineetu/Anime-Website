import mongoose from 'mongoose';

// Define the comments schema
const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the User model
        ref: 'User',
        required: true,
    },
    userName: {
        type: String,
        required: true, 
    },
    animeTitle: {
        type: String, 
        required: true,
    },
    commentText: {
        type: String,
        required: false,
        minlength: 1,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    profileImage: {  
        type: String,
        required: true, 
    },
});

// Create the model from the schema
const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
