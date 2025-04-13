import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();  // Load environment variables from .env

const app = express();
const PORT = process.env.PORT || 5000;

// Allow your React frontend to access this backend
app.use(cors());  

// API route to fetch news based on query parameters
app.get('/api/news', async (req, res) => {
  const API_KEY = process.env.VITE_NEWS_API;  // The API key from the .env file

  const options = {
    method: 'GET',
    url: 'https://newsapi.org/v2/everything',
    params: {
      q: 'cryptocurrency',  // The query you want to search for
      language: 'en',       // Language of the news
      sortBy: 'publishedAt', // Sort by most recent
      pageSize: 25,         // Limit to 25 results
      apiKey: API_KEY,      // The API key
    },
  };

  try {
    const response = await axios(options);
    res.status(200).json(response.data);  // Return the news data to the frontend
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ message: 'Something went wrong' });  // Handle errors
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
