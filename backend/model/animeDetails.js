import mongoose from 'mongoose';

const animedetailSchema = new mongoose.Schema({
    id: { 
        type: Number, 
        required: true,
        unique: true 
    },
    title: {
        type: String,
        required: true,
        minlength: 1,
    },
    description: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    released: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['TV', 'Movie'], 
        required: true,
    },
    otherName: {
        type: String,
        default: '',
    },
    prevSlide: {
        type: Number,
    },
    nextSlide: {
        type: Number,
    },
    averageRating: {
         type: Number,
          default: 0 
    }, 
    videoUrl: String,
    episode: [ 
        {
          title: { type: String, required: true },
          videoUrl: { type: String, required: true },
        }
    ]
});

export default mongoose.model('Details', animedetailSchema);
