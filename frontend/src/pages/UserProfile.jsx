import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const decodedToken = accessToken ? jwtDecode(accessToken) : null;
  const currentUserId = decodedToken ? decodedToken.user_id : null;

  // Fetch the user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      console.log("Fetching user profile for userId:", userId); // Debug log
      if (!accessToken) {
        setError("No access token found. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        console.log("Fetched user data:", response.data); // Debug log

        if (response.data && response.data.data) {
          const fetchedUser = response.data.data;
          setUser(fetchedUser);

          // Check if the current user is following the fetched user
          const isFollowingUser =
            Array.isArray(fetchedUser.followers) &&
            fetchedUser.followers.includes(currentUserId);
          console.log("Is current user following:", isFollowingUser); // Debug log
          setIsFollowing(isFollowingUser);
        } else {
          setError("User not found.");
        }
      } catch (err) {
        setError("Something went wrong. Please try again.");
        console.log("Error fetching user profile:", err); // Debug log
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId, accessToken, currentUserId]);

  // Handle the follow/unfollow toggle
  const handleFollowToggle = async () => {
    console.log("Follow/unfollow button clicked"); // Debug log
    if (!accessToken) {
      setError("No access token found. Please log in again.");
      return;
    }

    const url = `http://127.0.0.1:8000/api/users/${userId}/follow/`;

    // Set method dynamically: use POST for following, PUT for unfollowing
    const method = isFollowing ? "PUT" : "POST";
    console.log("Making API call to:", url, "with method:", method); // Debug log

    // Optimistically update the button state (toggle it immediately)
    setIsFollowing((prevState) => {
      console.log("Optimistically updating isFollowing:", !prevState); // Debug log
      return !prevState;
    });

    try {
      // Make the follow/unfollow API request
      const response = await axios({
        method,
        url,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log("Response after follow/unfollow action:", response.data); // Debug log

      if (response.data.status === "success") {
        // Check if the user is already following and handle accordingly
        if (response.data.message === "You are already following test5.") {
          console.log("User is already following. No need to toggle state."); // Debug log
          // Do not toggle the state, show a success message or handle differently
        } else {
          // After a successful follow/unfollow action, update user data
          const updatedResponse = await axios.get(
            `http://127.0.0.1:8000/api/users/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          console.log(
            "Updated user data after follow/unfollow:",
            updatedResponse.data
          ); // Debug log

          if (updatedResponse.data && updatedResponse.data.data) {
            const updatedUser = updatedResponse.data.data;
            setUser(updatedUser);

            // Check if the current user is following the fetched user
            const isFollowingUser =
              Array.isArray(updatedUser.followers) &&
              updatedUser.followers.includes(currentUserId);
            console.log(
              "Is current user following after API update:",
              isFollowingUser
            ); // Debug log
            setIsFollowing(isFollowingUser);
          }
        }
      } else {
        setError(
          response.data.message || "Something went wrong. Please try again."
        );
        console.log("API call failed. Reverting button state"); // Debug log
        // Revert the button state if necessary (fallback)
        setIsFollowing((prevState) => !prevState);
      }
    } catch (err) {
      // In case of an error, revert the optimistic UI update and show the error
      setError("Something went wrong. Please try again.");
      console.log("Error during follow/unfollow request:", err); // Debug log
      setIsFollowing((prevState) => !prevState);
    }
  };

  // Navigate to the edit profile page
  const handleEditProfile = () => {
    console.log("Navigating to edit profile for userId:", userId); // Debug log
    navigate(`/edit-profile/${userId}`);
  };

  // Loading state
  if (loading) {
    return <p className="text-center py-4 text-gray-600">Loading profile...</p>;
  }

  // Error state
  if (error) {
    return <p className="text-center py-4 text-red-600">{error}</p>;
  }

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
      </div>
    </div>
  );
};

export default UserProfile;
