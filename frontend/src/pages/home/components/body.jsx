import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Body = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [showLikesModal, setShowLikesModal] = useState(false);
  const [selectedPostLikes, setSelectedPostLikes] = useState([]);
  const [users, setUsers] = useState({}); // Store user info by user ID

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAccessToken(token);
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.user_id); // Extract user_id from token
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (accessToken) {
      axios
        .get("http://127.0.0.1:8000/api/postlist/", {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((response) => {
          const postsWithLikeState = response.data.map((post) => {
            const likedPosts =
              JSON.parse(localStorage.getItem("likedPosts")) || [];
            const isLiked = likedPosts.includes(post.id);
            return { ...post, isLiked };
          });
          setPosts(postsWithLikeState);
          setLoading(false);

          // Fetch user details for all users who liked the posts
          const allUserIds = new Set(
            response.data.flatMap((post) => post.liked_by)
          );
          fetchUserDetails(Array.from(allUserIds));
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
          setError("Error fetching posts");
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [accessToken]);

  const fetchUserDetails = async (userIds) => {
    try {
      const usersData = await Promise.all(
        userIds.map((userId) =>
          axios.get(`http://127.0.0.1:8000/api/users/${userId}/`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
        )
      );
      const userInfo = {};
      usersData.forEach((response) => {
        const { id, username } = response.data;
        userInfo[id] = username;
      });
      setUsers((prevUsers) => ({ ...prevUsers, ...userInfo }));
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleLikeCountClick = (likedBy) => {
    setSelectedPostLikes(likedBy);
    setShowLikesModal(true);
  };

  const handleLikeClick = async (postId) => {
    try {
      // Send the like/unlike request to the backend
      const response = await axios.post(
        `http://127.0.0.1:8000/api/post/${postId}/like/`,
        null,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      let likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || [];

      // Toggle the like status for the current post
      if (likedPosts.includes(postId)) {
        // If already liked, unlike the post
        likedPosts = likedPosts.filter((id) => id !== postId);
      } else {
        // If not liked, like the post
        likedPosts.push(postId);
      }

      // Store the updated liked posts in localStorage
      localStorage.setItem("likedPosts", JSON.stringify(likedPosts));

      // Update the posts state based on the new like count and like status
      setPosts((prevPosts) => {
        return prevPosts.map((post) => {
          if (post.id === postId) {
            const isLiked = likedPosts.includes(postId);
            // Update likes count and isLiked status based on the backend response
            return {
              ...post,
              likes: response.data.likes, // Update the like count
              liked_by: response.data.liked_by, // Update the liked_by array
              isLiked, // Update isLiked status
            };
          }
          return post;
        });
      });
    } catch (error) {
      console.error("Error liking post:", error);
      setError("Failed to like post.");
    }
  };

  const closeLikesModal = () => {
    setShowLikesModal(false);
    setSelectedPostLikes([]);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const timeAgo = (timestamp) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffInMs = now - postTime;
    const diffInSecs = Math.floor(diffInMs / 1000);
    const diffInMins = Math.floor(diffInSecs / 60);
    const diffInHours = Math.floor(diffInMins / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays > 0) {
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
    } else if (diffInHours > 0) {
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    } else if (diffInMins > 0) {
      return `${diffInMins} minute${diffInMins > 1 ? "s" : ""} ago`;
    } else {
      return `${diffInSecs} second${diffInSecs > 1 ? "s" : ""} ago`;
    }
  };

  return (
    <div className="p-4 md:p-4 rounded-xl text-[#A303A0] flex flex-col bg-white h-screen">
      <div className="flex gap-4 justify-center text-xl">
        <button
          type="button"
          className="px-4 py-2 text-lg font-medium text-gray-900 bg-white rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:ring-blue-700 focus:text-blue-700"
        >
          Following
        </button>
        <button
          type="button"
          className="px-4 py-2 text-lg font-medium text-gray-900 bg-white border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-blue-700 focus:text-blue-700"
        >
          Follower
        </button>
        <button
          type="button"
          className="px-4 py-2 text-lg font-medium text-gray-900 bg-white rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:text-blue-700"
        >
          Post
        </button>
      </div>
      <hr className="w-full mt-7" />
      <ul className="flex flex-col items-center overflow-y-auto max-h-screen overflow-clip">
        {[...posts].reverse().map((post) => (
          <li key={post.id} className="mt-5 w-full max-w-4xl">
            <div className="flex items-center gap-4 pt-6">
              <img
                className="w-10 h-10 rounded-xl md:w-20 md:h-20"
                src={
                  post.profile_picture ||
                  "https://images.pexels.com/photos/14653174/pexels-photo-14653174.jpeg"
                }
                alt={post.author || "Author"}
              />
              <div className="font-medium text-gray-700">
                <div className="text-xl text-[#490057] font-bold">
                  {users[post.author] || post.author}{" "}
                </div>
                <div className="text-xs text-[#A303A0]">
                  {timeAgo(post.created_at)}
                </div>
              </div>
            </div>

            <div className="pt-5 p-5 flex justify-center items-center">
              {post.image && (
                <img
                  src={post.image}
                  alt="Post Image"
                  className="w-full object-cover"
                />
              )}
            </div>

            <div className="ml-6 flex gap-4 justify-start">
              <p className="text-xl text-[#490057] font-medium">
                {users[post.author] || post.author}
              </p>
              <p className="text-lg font-light text-[#490057]">
                {post.content}
              </p>
            </div>

            <div className="mt-3 text-sm text-gray-600 ml-6 flex gap-7">
              <div className="flex gap-3 text-center items-center font-bold text-xl">
                <button
                  onClick={() => handleLikeClick(post.id)}
                  className={`${
                    post.isLiked ? "text-pink-500" : "text-[#490057]"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={post.isLiked ? "currentColor" : "none"}
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 md:size-10"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                </button>
                {post.likes > 0 && (
                  <button
                    onClick={() => handleLikeCountClick(post.liked_by)}
                    className="text-[#490057]"
                  >
                    {post.likes} {post.likes === 1 ? "Like" : "Likes"}
                  </button>
                )}
              </div>
            </div>

            <hr className="w-full mt-7" />
          </li>
        ))}
      </ul>

      {/* Likes Modal */}
      {showLikesModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-1/2 max-w-md">
            <h2 className="text-lg font-bold text-[#490057]">Liked by:</h2>
            <ul className="mt-4">
              {selectedPostLikes.length > 0 ? (
                selectedPostLikes.map((userId) => (
                  <li key={userId}>{users[userId] || `User ${userId}`}</li>
                ))
              ) : (
                <li>No likes yet</li>
              )}
            </ul>
            <button
              className="mt-4 px-4 py-2 bg-[#A303A0] text-white rounded"
              onClick={closeLikesModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Body;
