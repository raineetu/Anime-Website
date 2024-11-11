import mongoose from 'mongoose';

const popularitySchema = new mongoose.Schema({
    animeId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Details',
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    viewCount: {
        type: Number,
        default: 0,
        min: 0
    },
    averageRating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    viewedBy: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }]
}, { timestamps: true });

export default mongoose.model("Popularity", popularitySchema, "popularities");
