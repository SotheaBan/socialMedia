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

  const dropdownRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAccessToken(token);
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
        fetchUserProfile(decoded.user_id, token);
      } catch (err) {
        setAccessToken(null);
      }
    }
  }, []);

  const fetchUserProfile = (userId, token) => {
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
          setUserProfile(data.data);
        }
      })
      .catch((error) => console.error("Error fetching user profile:", error));
  };

  const handleDropdownToggle = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    setUserProfile(null);
    setAccessToken(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <nav className="bg-white">
        <div className="flex flex-wrap justify-between md:grid md:grid-cols-7">
          <a href="/" className="md:col-span-1 md:bg-[#490057]">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8 m-5"
              alt="Logo"
            />
          </a>
          <div className="hidden md:block md:col-span-5">
            <SearchBar setSearchResults={setSearchResults} />
          </div>
          <div className="flex justify-center gap-5 md:col-span-1 items-center">
            {userProfile ? (
              <div className="relative flex items-center gap-4">
                {!dropdownVisible && (
                  <img
                    src={`http://127.0.0.1:8000${userProfile.profile_picture}`}
                    className="h-8 w-8 rounded-full cursor-pointer"
                    alt="User Profile"
                    onClick={handleDropdownToggle}
                  />
                )}
                <div
                  ref={dropdownRef}
                  className={`absolute top-0 -right-40 bg-white rounded-md w-52 h-52 transition-transform duration-100 ${
                    dropdownVisible
                      ? "transform translate-y-0 opacity-100"
                      : "transform -translate-y-2 opacity-0 pointer-events-none"
                  }`}
                >
                  <div className="">
                    <p className="font-semibold">{userProfile.username}</p>
                    <p>{userProfile.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-red-500  text-sm text-left"
                  >
                    Logout
                  </button>
                  <Link
                    to={`/profile/${userProfile.id}`}
                    className="w-full text-blue-500 text-sm "
                  >
                    Profile
                  </Link>
                </div>
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
