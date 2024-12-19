import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const UserProfile = () => {
  const { userId } = useParams(); // Get the userId from the URL
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  const navigate = useNavigate();

  // Get the access token from localStorage
  const accessToken = localStorage.getItem("accessToken");

  // Decode the JWT token to get current user info
  const decodedToken = accessToken ? jwtDecode(accessToken) : null;
  const currentUserId = decodedToken ? decodedToken.user_id : null; // Assuming 'user_id' is part of the token payload

  console.log("Access Token from localStorage:", accessToken);
  console.log("Current User ID from Token:", currentUserId);

  // Fetch the user profile data and check if the current user is following them
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!accessToken) {
        setError("No access token found. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        // Fetch the user profile by userId
        const response = await axios.get(
          `http://127.0.0.1:8000/api/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        // Debugging: Log the API response to check if we get the correct data
        console.log("User Profile Response:", response.data);

        if (response.data && response.data.data) {
          const fetchedUser = response.data.data;

          // Safely check if 'followers' is an array before using 'includes'
          setUser(fetchedUser);
          setIsFollowing(
            Array.isArray(fetchedUser.followers) &&
              fetchedUser.followers.includes(currentUserId)
          );
        } else {
          setError("User not found.");
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId, accessToken, currentUserId]); // Added accessToken and currentUserId to the dependency array

  // Handle follow/unfollow button click
  const handleFollowToggle = async () => {
    if (!accessToken) {
      setError("No access token found. Please log in again.");
      return;
    }

    try {
      const url = isFollowing
        ? `http://127.0.0.1:8000/api/users/${userId}/unfollow`
        : `http://127.0.0.1:8000/api/users/${userId}/follow`;

      const response = await axios.post(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Debugging: Log the API response for follow/unfollow
      console.log("Follow/Unfollow Response:", response.data);

      // Toggle follow status based on response
      if (response.data.status === "success") {
        setIsFollowing(!isFollowing); // Toggle the follow status
      }
    } catch (err) {
      console.error("Error updating follow status:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  // Handle "Edit Profile" button click
  const handleEditProfile = () => {
    navigate(`/edit-profile/${userId}`);
  };

  // Show loading or error message if needed
  if (loading) {
    console.log("Loading profile..."); // Debugging: Log when loading
    return <p>Loading...</p>;
  }

  if (error) {
    console.error("Error:", error); // Debugging: Log error message
    return <p>{error}</p>;
  }

  // Render user profile page
  return (
    <div>
      <main className="bg-gray-100 bg-opacity-25">
        <div className="lg:w-8/12 lg:mx-auto mb-8">
          <header className="flex flex-wrap items-center p-4 md:py-8">
            <div className="md:w-3/12 md:ml-16">
              <img
                className="w-20 h-20 md:w-40 md:h-40 object-cover rounded-full border-2 border-pink-600 p-1"
                src={
                  user?.profile_picture
                    ? `http://127.0.0.1:8000${user.profile_picture}`
                    : "https://images.unsplash.com/photo-1502791451862-7bd8c1df43a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80"
                }
                alt="profile"
              />
            </div>

            <div className="w-8/12 md:w-7/12 ml-4">
              <div className="md:flex md:flex-wrap md:items-center mb-4">
                <h2 className="text-3xl inline-block font-light md:mr-2 mb-2 sm:mb-0">
                  {user?.username || "Unnamed User"}
                </h2>

                {/* Only show the Follow/Unfollow button if the logged-in user is not viewing their own profile */}
                {user && currentUserId && currentUserId !== user.id && (
                  <button
                    onClick={handleFollowToggle}
                    className={`${
                      isFollowing ? "bg-red-500" : "bg-blue-500"
                    } px-4 py-2 text-white font-semibold text-sm rounded block text-center sm:inline-block block`}
                  >
                    {isFollowing ? "Unfollow" : "Follow"}
                  </button>
                )}

                {/* Show "Edit Profile" button only when the logged-in user is viewing their own profile */}
                {currentUserId && user && currentUserId === user.id && (
                  <button
                    onClick={handleEditProfile}
                    className="bg-blue-500 px-4 py-2 text-white font-semibold text-sm rounded block text-center sm:inline-block block"
                  >
                    Edit Profile
                  </button>
                )}
              </div>

              <ul className="hidden md:flex space-x-8 mb-4">
                <li>
                  <span className="font-semibold">
                    {user?.posts_count || 0}
                  </span>
                  posts
                </li>

                <li>
                  <span className="font-semibold">
                    {user?.followers_count || 0}
                  </span>
                  followers
                </li>
                <li>
                  <span className="font-semibold">
                    {user?.following_count || 0}
                  </span>
                  following
                </li>
              </ul>

              <div className="hidden md:block">
                <h1 className="font-semibold">
                  {user?.full_name || "Full Name"}
                </h1>
                <span>{user?.bio || "Bio information not available"}</span>
                <p>{user?.bio || "Lorem ipsum dolor sit amet consectetur"}</p>
              </div>
            </div>

            <div className="md:hidden text-sm my-2">
              <h1 className="font-semibold">
                {user?.full_name || "Full Name"}
              </h1>
              <span>{user?.bio || "Bio information not available"}</span>
              <p>{user?.bio || "Lorem ipsum dolor sit amet consectetur"}</p>
            </div>
          </header>

          <div className="px-px md:px-3">
            <ul className="flex md:hidden justify-around space-x-8 border-t text-center p-2 text-gray-600 leading-snug text-sm">
              <li>
                <span className="font-semibold text-gray-800 block">
                  {user?.posts_count || 0}
                </span>
                posts
              </li>

              <li>
                <span className="font-semibold text-gray-800 block">
                  {user?.followers_count || 0}
                </span>
                followers
              </li>
              <li>
                <span className="font-semibold text-gray-800 block">
                  {user?.following_count || 0}
                </span>
                following
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;
