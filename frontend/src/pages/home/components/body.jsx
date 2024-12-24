import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Body = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAccessToken(token);
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.user_id);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  // Fetch posts from API
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

  const handleLikeClick = async (postId) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/post/${postId}/like/`,
        null,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Get the current liked posts from localStorage
      let likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || [];

      if (likedPosts.includes(postId)) {
        likedPosts = likedPosts.filter((id) => id !== postId);
      } else {
        likedPosts.push(postId);
      }

      // Save the updated likedPosts array back to localStorage
      localStorage.setItem("likedPosts", JSON.stringify(likedPosts));

      // Optimistically update the state
      setPosts((prevPosts) => {
        const updatedPosts = prevPosts.map((post) => {
          if (post.id === postId) {
            const isLiked = likedPosts.includes(postId);
            return {
              ...post,
              likes: response.data.likes, // Update likes count
              isLiked, // Update the isLiked status
            };
          }
          return post; // Return the post as-is if it's not the one being liked
        });
        return updatedPosts;
      });
    } catch (error) {
      console.error("Error liking post:", error);
      setError("Failed to like post.");
    }
  };

  // Handle error and loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Time ago calculation
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
          className="px-4 py-2 text-lg font-medium text-gray-900 bg-white rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-700 dark:text-gray dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-gray"
        >
          Following
        </button>
        <button
          type="button"
          className="px-4 py-2 text-lg font-medium text-gray-900 bg-white border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-700 dark:text-gray dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-gray"
        >
          Follower
        </button>
        <button
          type="button"
          className="px-4 py-2 text-lg font-medium text-gray-900 bg-white rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:text-blue-700 dark:border-gray-700 dark:text-gray dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-gray"
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
                  {post.author}
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
                {post.author}
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
                {post.likes}
              </div>
            </div>

            <hr className="w-full mt-7" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Body;
