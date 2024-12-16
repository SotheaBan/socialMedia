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
    <div>
      <div className='p-5 rounded-lg text-[#A303A0]'>
                <div className='flex gap-4 justify-center'>
                <h3>Follower</h3>
                <h3>Following</h3>
                <h3>Posts</h3>
                </div>
                <ul>
        {posts.map((post) => (
            <li key={post.id} className="mt-5">
            <div className="flex items-center gap-4 pt-6">
                {/* Author Image */}
                <img
                className="w-20 h-20 rounded-full"
                src={post.profile_picture || "https://images.pexels.com/photos/14653174/pexels-photo-14653174.jpeg"} // Fallback if no author image
                alt={post.author || "Author"}
                />
                
                <div className="font-medium text-gray-700">
                {/* Author Name */}
                <div className="text-sm font-bold">{post.author}</div>
                {/* Time */}
                <div className="text-sm text-[#A303A0]">
                    {new Date(post.created_at).toLocaleString()}
                </div>
                </div>
            </div>

            <div className="pt-5 p-5 items-center ">
                {/* Post Image */}
                {post.image && (
                <img
                    src={post.image}
                    alt="Post Image"
                    className="w-2/3 items-center"
                    style={{ objectFit: 'cover' }}
                />
                )}
            </div>

            {/* Post Content */}
            <div className='ml-6 flex gap-4 justify-items-center'>
                <p className="text-lg text-[#A303A0] font-bold">{post.author} :</p>
                <p className="text-base text-gray-800">{post.content}</p>
            </div>

            {/* Post Likes */}
            <div className="mt-3 text-sm text-gray-600 ml-6">
                <strong>Likes:</strong> {post.likes}
            </div>
            </li>
        ))}
        </ul>

            </div>
    </div>
  );
};

export default Body;
