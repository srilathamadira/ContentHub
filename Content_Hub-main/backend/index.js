const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Route to fetch news from an external API (e.g., NewsAPI)
const NEWS_API_KEY = process.env.NEWS_API_KEY;

app.get('/api/news', async (req, res) => {
    const category = req.query.category || "general";
    const API_URL = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=us&max=10&apikey=${NEWS_API_KEY}`;
  
    try {
      const response = await axios.get(API_URL);
       
  
      if (!response.data.articles) {
        console.error("❌ No articles received from GNews API.");
        return res.status(500).json({ message: "Error fetching news" });
      }
  
      const formattedNews = response.data.articles.map((article, index) => ({
        id: index + 1,
        category: article.source.name || "News",
        title: article.title || "No title available",
        date: article.publishedAt ? new Date(article.publishedAt).toDateString() : "No date",
        image: article.image || "https://via.placeholder.com/300",
        url: article.url
      }));
  
      res.json({ articles: formattedNews });
    } catch (error) {
      console.error("❌ Error fetching news:", error.message);
      res.status(500).json({ message: "Failed to fetch news" });
    }
});

// Route to handle user logout
app.post('/api/logout', (req, res) => {
    res.json({ message: "User logged out successfully" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
