import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Body = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch posts from Django API
    axios.get('http://127.0.0.1:8000/api/postlist/')
      .then(response => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching data');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className=''>
      <div className='p-4 rounded-xl text-[#A303A0] flex flex-col bg-white mx-10 '>

                <div className='flex gap-4 justify-center text-xl '>

                  <button type="button" class="px-4 py-2 text-lg font-medium text-gray-900 bg-white  rounded-s-lg hover:bg-gray-100 hover:text-blue-700  focus:ring-blue-700 focus:text-blue-700  dark:border-gray-700 dark:text-gray dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-gray">
                    Following
                  </button>
                  <button type="button" class="px-4 py-2 text-lg font-medium text-gray-900 bg-white  border-gray-200 hover:bg-gray-100 hover:text-blue-700  focus:ring-blue-700 focus:text-blue-700 0 dark:border-gray-700 dark:text-gray dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-gray">
                    Follower
                  </button>
                  <button type="button" class="px-4 py-2 text-lg font-medium text-gray-900 bg-white rounded-e-lg hover:bg-gray-100 hover:text-blue-700   focus:text-blue-700  dark:border-gray-700 dark:text-gray dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-gray ">
                    Post
                  </button>

                </div>
          <hr className='w-full mt-7' />
          <ul className="flex flex-col items-center ">
                {posts.map((post) => (
                  <li key={post.id} className="mt-5 w-full max-w-4xl"> {/* Limit width of the post */}
                    <div className="flex items-center gap-4 pt-6 ">
                      {/* Author Image */}
                      <img
                        className="w-20 h-20 rounded-xl "
                        src={post.profile_picture || "https://images.pexels.com/photos/14653174/pexels-photo-14653174.jpeg"}
                        alt={post.author || "Author"}
                      />
                      
                      <div className="font-medium text-gray-700">
                        {/* Author Name */}
                        <div className="text-xl text-[#490057] font-bold">{post.author}</div>
                        {/* Time */}
                        <div className="text-xs text-[#A303A0]">
                          {new Date(post.created_at).toLocaleString()}
                        </div>
                      </div>
                    </div>

                    <div className="pt-5 p-5 flex justify-center items-center">
                      {/* Post Image */}
                      {post.image && (
                        <img
                          src={post.image}
                          alt="Post Image"
                          className="w-2/3 object-cover"  // Keeps image responsive
                        />
                      )}
                    </div>

                    {/* Post Content */}
                    <div className="ml-6 flex gap-4 justify-start">
                      <p className="text-xl text-[#490057] font-medium">{post.author} </p>
                      <p className="text-lg font-light text-[#490057]">{post.content}</p>
                    </div>

                    {/* Post Likes */}
                    <div className="mt-3 text-sm text-gray-600 ml-6  flex gap-7">
                        <div className='flex gap-3 text-center items-center font-bold text-xl'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 text-[#490057]">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                            </svg>

                            {post.likes}
                        </div> 
                        <div className='flex'>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 text-[#490057]">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                              </svg>

                        </div>
                    </div>
                    <hr className='w-full mt-7' />
                  </li>
                  
                ))}
             
           </ul>
           


            </div>
    </div>
  );
};

export default Body;
