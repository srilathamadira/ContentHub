import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/css/DashBoard.css';

function DashBoard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');
  const [newsData, setNewsData] = useState([]); // ✅ Ensuring default is an array
  const [userProfileImage, setUserProfileImage] = useState('');

  useEffect(() => {
   

    // Fetch news data from API
    axios.get('/api/news')
      .then(response => {
        setNewsData(response.data.articles || []); // ✅ Ensuring API response is always an array
      })
      .catch(error => {
        console.error('Error fetching news:', error);
        setNewsData([]); // ✅ Fallback to empty array if request fails
      });
  }, []);

  const handleLogout = () => {
    navigate('/');
  };

  const tabs = ['All', 'Saved', 'Your', 'Subscriptions', 'Followed', 'Recent'];

  // Function to get filtered content based on the active tab
  const getFilteredContent = () => {
    if (!Array.isArray(newsData)) return []; // ✅ Ensure `newsData` is an array

    switch (activeTab) {
      case 'All':
        return newsData;
      case 'Saved':
        return newsData.filter(item => item.saved);
      case 'Your':
        return newsData.filter(item => item.yours);
      case 'Subscriptions':
        return newsData.filter(item => item.subscribed);
      case 'Followed':
        return newsData.filter(item => item.followed);
      case 'Recent':
        return [...newsData].sort((a, b) =>
          new Date(b.date) - new Date(a.date)
        ).slice(0, 5);
      default:
        return newsData;
    }
  };

  const contentItems = getFilteredContent();

  const stats = [
    { label: 'Most Viewed', value: 789 },
    { label: 'Likes Received', value: 563 },
    { label: 'Subscribers', value: 205 },
    { label: 'Followers', value: 173 }
  ];

  return (
    <div className="app-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-left">
          <div className="nav-links">
            <a href="#" className="nav-link">Top</a>
            <a href="#" className="nav-link">Trending</a>
            <a href="#" className="nav-link">Categories</a>
            <a href="#" className="nav-link">Personalize</a>
          </div>
        </div>

        <div className="nav-center">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search for news, articles, and posts"
              className="search-input"
            />
            <button className="search-button">🔍</button>
          </div>
        </div>

        <div className="nav-right">
          <button className="read-button" onClick={handleLogout}>Logout</button>
          <div className="profile-image">
            <img
              src={userProfileImage || 'https://via.placeholder.com/100'}
              alt="Profile"
              onError={(e) => e.target.src = 'https://via.placeholder.com/100'}
            />
          </div>
        </div>
      </nav>

      {/* Main Layout */}
      <div className="content-layout">
        {/* Sidebar */}
        <aside className="profile-sidebar">
          <div className="profile-container">
            <div className="profile-image-container">
              <img
                src={userProfileImage || 'https://via.placeholder.com/100'}
                alt="Profile"
                className="profile-image"
                onError={(e) => e.target.src = 'https://via.placeholder.com/100'}
              />
            </div>
            <h2 className="profile-title">ContentHub Updates</h2>
            <p className="profile-subtitle">Global News Hub</p>
          </div>

          <div className="customize-container">
            <button className="customize-button">Customize Feed</button>
          </div>

          <div className="stats-container">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <span className="stat-label">{stat.label}</span>
                <span className="stat-value">{stat.value}</span>
              </div>
            ))}
          </div>

          <div className="about-section">
            <h3 className="about-title">ABOUT US</h3>
            <p className="about-text">
              Welcome to ContentHub! Your go-to platform for the latest news and trending articles across various categories. Stay informed, stay connected! Contact us for partnerships and collaborations.
            </p>
          </div>
        </aside>

        {/* Content Feed */}
        <div className="content-feed">
          <div className="feed-tabs">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`tab-button ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="feed-grid">
            {Array.isArray(contentItems) && contentItems.length > 0 ? (
              contentItems.map((item) => (
                <div key={item.id} className="content-card">
                  <div className="card-image-container">
                    <img
                      src={item.image || 'https://via.placeholder.com/200'}
                      alt={item.title}
                      className="card-image"
                      onError={(e) => e.target.src = 'https://via.placeholder.com/200'}
                    />
                  </div>
                  <div className="card-overlay">
                    <h3 className="card-title">{item.title}</h3>
                    <span className="card-category">{item.category}</span>
                    <span className="card-date">{item.date}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <p>No content available for this tab</p>
              </div>
            )}
          </div>

          <div className="load-more-container">
            <button className="load-more-button">Load More</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
