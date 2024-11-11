
import axios from 'axios';

// This function sends a request to track the view of an anime
export const trackView = async (animeId, token) => {
    if (!animeId || !token) {
        console.warn('trackView: animeId or token is missing.');
        return;
    }

    try {
        const response = await axios.post(
            '/api/anime/view',  // Adjust this endpoint based on your backend route
            { animeId },        // Send the anime ID in the request body
            {
                headers: {
                    Authorization: `Bearer ${token}`,  // Send the auth token in headers
                },
            }
        );

        console.log(`View tracked successfully for animeId: ${animeId}`, response.data);
    } catch (error) {
        console.error('Failed to track view:', error);
    }
};
