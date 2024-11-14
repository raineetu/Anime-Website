import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fs from 'fs';
import path from 'path';
import animeDetailsroute from './routes/animeDetailsRoute.js';
import userRoute from './routes/userRoute.js';
import commentRoutes from './routes/commentRoutes.js';
import recommendationRoutes from './routes/recommendationRoute.js'; 
import popularRoute from './routes/popularRoute.js';  // Ensure this path is correct

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8001;
const MONGOURL = process.env.MONGOURL;

// Connect to MongoDB
mongoose.connect(MONGOURL)
  .then(() => console.log("Database connected successfully"))
  .catch(error => {
    console.error("Database connection error:", error.message);
    process.exit(1);
  });

app.use(cookieParser());

// Define routes
app.use("/populars", popularRoute); // Confirm this path
app.use("/detail", animeDetailsRoute);
app.use("/user", userRoute);
app.use('/comments', commentRoutes);
app.use('/recommendations', recommendationRoutes); 

// Fix for ES module path handling
const __dirname = path.resolve();
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Serve static files from 'uploads' folder
app.use('/uploads', express.static(uploadDir));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});

// Add a route to log all incoming requests for debugging
app.use((req, res, next) => {
  console.log(`Received URL: "${req.originalUrl}"`);
  next();
});
