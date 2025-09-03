import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const NavbarExplore = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if user is logged in from localStorage
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  const handleSearchSubmit = () => {
    onSearch(query);
  };

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user session
    setUser(null);
    navigate("/"); // Redirect to Explore page after logout
  };

  const handleLogin = () => {
    navigate("/login", { state: { from: location.pathname } }); // Redirect to login & save current page
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md mb-10">
      <h1 className="text-5xl font-serif font-bold">Top Headlines</h1>

      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search for news..."
          className="border px-2 p-1.5 rounded-md w-75"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearchSubmit()}
        />
        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white px-3 py-1 rounded"
          onClick={handleSearchSubmit}
        >
          🔍
        </button>
      </div>

      {/* Login/Profile/Logout Buttons */}
      <div className="flex items-center gap-3">
        {user ? (
          <>
            <button
              className="px-6 py-2 bg-blue-500 font-bold text-l text-white rounded hover:bg-blue-600"
              onClick={() => navigate("/dashboard")}
            >
              Profile
            </button>
            <button
              className="px-6 py-2 bg-red-500 font-bold text-l text-white rounded hover:bg-red-600"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <button
            className="px-6 py-2 bg-[#4a90e2] font-bold text-l text-white rounded hover:bg-blue-600"
            onClick={handleLogin} // Corrected login navigation
          >
            Sign in
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavbarExplore;
