import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Skeleton from "@mui/material/Skeleton";
import Navbar from "./NavbarExplore";
import axios from "axios";

const categories = ["general", "sports", "business", "entertainment", "health", "science", "technology"];
const API_BASE_URL = "http://localhost:5000"; // Your Express server URL

const ExplorePage = () => {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [allNews, setAllNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(
    localStorage.getItem("preferredCategory") || "general"
  );
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);

      try {
        const response = await axios.get(`${API_BASE_URL}/api/news?category=${selectedCategory}`);
        setNews(response.data.articles);
        setAllNews(response.data.articles);
      } catch (error) {
        console.error("Error fetching news:", error);
        setNews([]);
        setAllNews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [selectedCategory]);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser)); // Set user if found in localStorage
    }
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (user) {
      localStorage.setItem("preferredCategory", category);
    }
  };

  const handleSearch = (query) => {
    if (!query.trim()) {
      setNews(allNews);
      return;
    }

    const filteredNews = allNews.filter((article) =>
      article.title.toLowerCase().includes(query.toLowerCase())
    );

    setNews(filteredNews);
  };

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user from local storage
    setUser(null);
    window.location.reload(); // Keep the user on the same page after logout
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <Navbar onSearch={handleSearch} user={user} onLogout={handleLogout} />

      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              category === selectedCategory ? "bg-[#4a90e2] text-black" : "bg-[#4a90e2] hover:bg-gradient-to-r from-[#4D90FE] to-[#357ae8] text-black"
            }`}
          >
            {category.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <Skeleton variant="rectangular" width="100%" height={200} animation="wave" />
              <div className="p-4">
                <Skeleton variant="text" width="80%" height={24} animation="wave" />
                <Skeleton variant="text" width="60%" height={20} animation="wave" />
                <Skeleton variant="text" width="40%" height={20} animation="wave" />
              </div>
            </div>
          ))
        ) : news.length > 0 ? (
          news.map((article) => (
            <div key={article.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{article.title}</h3>
                <p className="text-sm text-gray-500">{article.category}</p>
                <p className="text-sm text-gray-400">{article.date}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-blue-600 font-bold">
                  Read More →
                </a>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 text-lg">No news found.</p>
        )}
      </div>
    </div>
  );
};

export default ExplorePage;
