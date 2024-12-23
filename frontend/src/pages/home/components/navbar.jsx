import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./searchbar";
import { jwtDecode } from "jwt-decode";

function Navbar() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const dropdownRef = useRef(null); // Ref for dropdown menu

  useEffect(() => {
    // Check localStorage for accessToken
    const token = localStorage.getItem("accessToken");

    console.log("Access Token from LocalStorage:", token);

    if (token) {
      setAccessToken(token);
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded User Data:", decoded);
        setUser(decoded);

        fetchUserProfile(decoded.user_id, token);
      } catch (err) {
        console.error("Token decoding error:", err);
        setAccessToken(null);
      }
    } else {
      console.log("No access token found in LocalStorage.");
    }
  }, []);

  const fetchUserProfile = (userId, token) => {
    // Add token to the Authorization header
    fetch(`http://127.0.0.1:8000/api/users/${userId}/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          console.log("User Profile Data:", data.data);
          setUserProfile(data.data);
        } else {
          console.error("Failed to fetch user profile:", data.message);
        }
      })
      .catch((error) => console.error("Error fetching user profile:", error));
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log("Search query:", searchQuery);
  };

  const handleDropdownToggle = () => {
    setDropdownVisible(!dropdownVisible); // Toggle dropdown visibility
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    setUserProfile(null);
    setAccessToken(null);
    console.log("Logged out successfully");
  };

  // Close dropdown if clicked outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false); // Close dropdown if click is outside
      }
    };

    // Add event listener for outside click
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <nav className="bg-white shadow-md">
        <div className="flex flex-wrap justify-between md:grid md:grid-cols-7">
          {/* Logo */}
          <a href="/" className="md:col-span-1 md:bg-[#490057]">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8 m-5"
              alt="Logo"
            />
          </a>

          {/* Search Bar */}
          <div className="hidden md:block md:col-span-5">
            <SearchBar setSearchResults={setSearchResults} />
          </div>

          {/* User Profile or Login */}
          <div className="flex justify-center gap-5 md:col-span-1 items-center">
            <button className="md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-7 text-[#A303A0]"
              >
                <path d="M8.25 10.875a2.625 2.625 0 1 1 5.25 0 2.625 2.625 0 0 1-5.25 0Z" />
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.125 4.5a4.125 4.125 0 1 0 2.338 7.524l2.007 2.006a.75.75 0 1 0 1.06-1.06l-2.006-2.007a4.125 4.125 0 0 0-3.399-6.463Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {/* Conditional rendering for user profile */}
            {userProfile ? (
              <div className="relative flex items-center gap-5 m-5">
                {/* Display user profile picture */}
                <img
                  src={`http://127.0.0.1:8000${userProfile.profile_picture}`}
                  className="h-8 w-8 rounded-full cursor-pointer"
                  alt="User Profile"
                  onClick={handleDropdownToggle}
                />
                {dropdownVisible && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md p-3 border border-gray-300"
                  >
                    <div>
                      <p className="font-semibold">{userProfile.username}</p>
                      <p>{userProfile.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-red-500 mt-2 text-sm text-left"
                    >
                      Logout
                    </button>

                    <Link
                      to={`/profile/${userProfile.id}`}
                      className="w-full text-blue-500 mt-2 text-sm text-left"
                    >
                      Profile
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <a href="/login" className="flex gap-5 m-5">
                <div className="hidden md:block">
                  <p>User</p>
                  <p>Login</p>
                </div>
                <img
                  src="https://flowbite.com/docs/images/logo.svg"
                  className="h-8"
                  alt="Logo"
                />
              </a>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
