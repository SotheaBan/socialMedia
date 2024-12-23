import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Body = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({}); // Store comments for each post by post ID
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activePostId, setActivePostId] = useState(null);  // State to track the active post's dropdown visibility

  // Fetch posts from Django API
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/postlist/')
      .then(response => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching posts');
        setLoading(false);
      });
  }, []);

  // Fetch comments for a specific post
  const fetchComments = async (postId) => {
    try {
      setLoading(true);

      // Fetch comments for the specific post from the correct URL
      const response = await fetch(`http://127.0.0.1:8000/api/${postId}/comments/`);

      // Check if the response is successful
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }

      const data = await response.json();
      
      // Update the comments state with the comments for the specific post
      setComments((prevComments) => ({
        ...prevComments,
        [postId]: data, // Save the comments under the specific postId
      }));
    } catch (error) {
      setError('Failed to fetch comments');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Toggle dropdown visibility for a specific post
  const toggleDropdown = (postId) => {
    setActivePostId((prevId) => {
      if (prevId === postId) {
        // If the clicked post is already active, toggle it off
        return null;
      } else {
        // Otherwise, set the new active post
        fetchComments(postId); // Fetch comments for the new post
        return postId;
      }
    });
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
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    } else if (diffInHours > 0) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else if (diffInMins > 0) {
      return `${diffInMins} minute${diffInMins > 1 ? 's' : ''} ago`;
    } else {
      return `${diffInSecs} second${diffInSecs > 1 ? 's' : ''} ago`;
    }
  };
  
  

  return (
    <div className="p-4 md:p-4 rounded-xl text-[#A303A0] flex flex-col bg-white h-screen">
      <div className="flex gap-4 justify-center text-xl ">
        <button type="button" className="px-4 py-2 text-lg font-medium text-gray-900 bg-white rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-700 dark:text-gray dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-gray">
          Following
        </button>
        <button type="button" className="px-4 py-2 text-lg font-medium text-gray-900 bg-white border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-700 dark:text-gray dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-gray">
          Follower
        </button>
        <button type="button" className="px-4 py-2 text-lg font-medium text-gray-900 bg-white rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:text-blue-700 dark:border-gray-700 dark:text-gray dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-gray ">
          Post
        </button>
      </div>
      <hr className="w-full mt-7" />
      <ul className="flex flex-col items-center overflow-y-auto max-h-screen overflow-clip">
        {[...posts].reverse().map((post) => (
          <li key={post.id} className="mt-5 w-full max-w-4xl">
            <div className="flex items-center gap-4 pt-6 ">
              <img
                className="w-10 h-10 rounded-xl md:w-20 md:h-20"
                src={post.profile_picture || "https://images.pexels.com/photos/14653174/pexels-photo-14653174.jpeg"}
                alt={post.author || "Author"}
              />
              <div className="font-medium text-gray-700">
                <div className="text-xl text-[#490057] font-bold">{post.author}</div>
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
              <p className="text-xl text-[#490057] font-medium">{post.author}</p>
              <p className="text-lg font-light text-[#490057]">{post.content}</p>
            </div>

            <div className="mt-3 text-sm text-gray-600 ml-6 flex gap-7">
              <div className="flex gap-3 text-center items-center font-bold text-xl">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 md:size-10 text-[#490057]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
                {post.likes}
              </div>
              <div className="">
                <button id="dropdownDefaultButton" className="relative" onClick={() => toggleDropdown(post.id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 md:size-10 text-[#490057]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                  </svg>
                </button>
              </div>
            </div>

            {activePostId === post.id && (
              <div id="dropdown" className="w-full z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-lg">
                <h1 className="p-2">Comments</h1>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 p-2 gap-2">
                  {comments[post.id]?.map((comment) => (
                    <li key={comment.id} className="pt-2">
                      <div className="flex items-center gap-4 pl-2">
                        <img
                          className="w-6 h-6 rounded-xl md:w-10 md:h-10"
                          src="https://images.pexels.com/photos/14653174/pexels-photo-14653174.jpeg"  // Placeholder profile image
                          alt={comment.author || "Author"}
                        />
                        <div className="font-medium text-gray-700">
                          <div className="text-sm text-[#490057] font-bold">{comment.author}</div>
                        </div>
                      </div>
                      <div className="ml-10 flex gap-4 justify-start">
                        <p className="text-lg font-light text-[#490057]">{comment.content}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <hr className="w-full mt-7" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Body;
