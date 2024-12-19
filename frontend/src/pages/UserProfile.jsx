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

        if (response.data && response.data.data) {
          const fetchedUser = response.data.data;
          setUser(fetchedUser);

          // Check if the current user is following the fetched user
          const isFollowingUser =
            Array.isArray(fetchedUser.followers) &&
            fetchedUser.followers.includes(currentUserId);
          setIsFollowing(isFollowingUser);

          // Debugging the fetched user and follow status
          console.log("Fetched User:", fetchedUser);
          console.log("Is following:", isFollowingUser);
        } else {
          setError("User not found.");
        }
      } catch (err) {
        setError("Something went wrong. Please try again.");
        console.error("Error fetching user profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId, accessToken, currentUserId]);

  const handleFollowToggle = async () => {
    if (!accessToken) {
      setError("No access token found. Please log in again.");
      return;
    }

    const url = `http://127.0.0.1:8000/api/users/${userId}/follow/`;
    const method = isFollowing ? "PUT" : "POST";

    try {
      // Optimistically update the button state before making the API call
      setIsFollowing((prevState) => !prevState);

      // Make the API request (either POST for follow or PUT for unfollow)
      const response = await axios({
        method,
        url,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.data.status === "success") {
        // Directly update the follower and following counts based on the response
        setUser((prevUser) => ({
          ...prevUser,
          followers_count: response.data.data.followers_count,
          following_count: response.data.data.following_count,
        }));

        // Toggle the follow status
        setIsFollowing(!isFollowing);
      } else {
        setError(response.data.message || "Something went wrong.");
        setIsFollowing(isFollowing); // Revert UI changes on error
      }
    } catch (err) {
      console.error("Error during follow/unfollow request:", err);
      setIsFollowing(isFollowing); // Revert UI changes on error
      setError("Something went wrong. Please try again.");
    }
  };

  // Navigate to the edit profile page
  const handleEditProfile = () => {
    navigate(`/edit-profile/${userId}`);
  };

  // Loading state
  if (loading) {
    console.log("Loading profile...");
    return <p className="text-center py-4 text-gray-600">Loading profile...</p>;
  }

  // Error state
  if (error) {
    console.error("Error:", error);
    return <p className="text-center py-4 text-red-600">{error}</p>;
  }

  // Debugging the values of user and currentUserId before rendering the profile
  console.log("User Profile Data:", user);
  console.log("Current User ID:", currentUserId);
  console.log("Profile User ID:", user?.id);

  // Ensure we have user data and currentUserId available for comparison
  if (!user || !currentUserId) {
    return (
      <p className="text-center py-4 text-gray-600">Profile not available.</p>
    );
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

              {/* Debugging the condition for showing buttons */}
              {currentUserId === user.id
                ? (console.log("Showing Edit Profile button"),
                  (
                    <button
                      onClick={handleEditProfile}
                      className="mt-4 md:mt-0 bg-indigo-600 px-4 py-2 text-white font-semibold rounded-full"
                    >
                      Edit Profile
                    </button>
                  ))
                : (console.log("Showing Follow button"),
                  (
                    <button
                      onClick={handleFollowToggle}
                      className={`${
                        isFollowing ? "bg-red-500" : "bg-blue-500"
                      } mt-4 md:mt-0 px-4 py-2 text-white font-semibold rounded-full`}
                    >
                      {isFollowing ? "Unfollow" : "Follow"}
                    </button>
                  ))}
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
