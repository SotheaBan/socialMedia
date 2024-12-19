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
    // Navigate to the edit profile page using the userId
    navigate(`/edit-profile/${userId}`); // This will route to the frontend edit page
  };

  // Show loading or error message if needed
  if (loading) {
    return <p className="text-center py-4 text-gray-600">Loading profile...</p>;
  }

  if (error) {
    return <p className="text-center py-4 text-red-600">{error}</p>;
  }

  // Render user profile page
  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-6 md:px-12">
        <header className="flex flex-col items-center md:flex-row md:justify-between mb-8">
          <div className="w-40 h-40 mb-6 md:mb-0">
            <img
              className="w-full h-full object-cover rounded-full border-4 border-pink-600"
              src={
                user?.profile_picture
                  ? `http://127.0.0.1:8000${user.profile_picture}`
                  : "https://images.unsplash.com/photo-1502791451862-7bd8c1df43a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80"
              }
              alt="profile"
            />
            <div className="font-bold mt-2 text-center">{user.username}</div>
          </div>

          <div className="md:w-2/3 ml-0 md:ml-6">
            <div className="flex flex-col md:flex-row md:items-center md:space-x-6 mb-6">
              <h2 className="text-3xl font-semibold">
                {user?.username || "Unnamed User"}
              </h2>
              {user && currentUserId && currentUserId !== user.id && (
                <button
                  onClick={handleFollowToggle}
                  className={`${
                    isFollowing ? "bg-red-500" : "bg-blue-500"
                  } mt-4 md:mt-0 px-4 py-2 text-white font-semibold rounded-full`}
                >
                  {isFollowing ? "Unfollow" : "Follow"}
                </button>
              )}

              {currentUserId && user && currentUserId === user.id && (
                <button
                  onClick={handleEditProfile}
                  className="mt-4 md:mt-0 bg-indigo-600 px-4 py-2 text-white font-semibold rounded-full"
                >
                  Edit Profile
                </button>
              )}
            </div>

            <div className="flex justify-between text-lg text-gray-700 mb-4">
              <div>
                <strong>{user?.posts_count || 0}</strong> posts
              </div>
              <div>
                <strong>{user?.followers_count || 0}</strong> followers
              </div>
              <div>
                <strong>{user?.following_count || 0}</strong> following
              </div>
            </div>

            <div>
              <p>{user?.bio || "Bio information not available"}</p>
            </div>
          </div>
        </header>

        {/* Mobile View - Profile Info */}
        <div className="block md:hidden text-center">
          <h3 className="text-xl font-semibold mb-2">
            {user?.full_name || "Full Name"}
          </h3>
          <p>{user?.bio || "Bio information not available"}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
