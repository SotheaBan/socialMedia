import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function SearchBar({ setSearchResults }) {
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [localResults, setLocalResults] = useState({ users: [], posts: [] });
    const [showSearchBox, setShowSearchBox] = useState(false);
    const searchRef = useRef(null);

    const getImageUrl = (image) => {
        if (!image) return null;
        return image.startsWith('http') ? image : `http://127.0.0.1:8000${image}`;
    };

    useEffect(() => {
        const debounceTimer = setTimeout(async () => {
            if (query.trim()) {
                setIsLoading(true);
                try {
                    const response = await axios.get(`http://127.0.0.1:8000/api/searchh/?q=${encodeURIComponent(query)}`);
                    setLocalResults(response.data);
                    setSearchResults(response.data);
                } catch (error) {
                    console.error('Search error:', error);
                    setLocalResults({ users: [], posts: [] });
                    setSearchResults({ users: [], posts: [] });
                } finally {
                    setIsLoading(false);
                }
            } else {
                setLocalResults({ users: [], posts: [] });
                setSearchResults({ users: [], posts: [] });
            }
        }, 500);

        return () => clearTimeout(debounceTimer);
    }, [query, setSearchResults]);

    // Close search box if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSearchBox(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='col-span-2 p-5'>
            <div className="relative" ref={searchRef}>
                {/* Search Icon */}
                {!showSearchBox && (
                   <button
                   onClick={() => setShowSearchBox(true)}
                   className="text-2xl p-3 bg-gray-200 rounded-full shadow hover:bg-gray-300 focus:outline-none "
                 >
                   🔍
                 </button>
                )}

                {/* Search Box with Transition */}
                <div
    className={`absolute top-0 left-0 w-full bg-white  rounded-md transition-transform duration-200 ease-in-out ${
        showSearchBox ? 'transform translate-y-0 opacity-100' : 'transform -translate-y-full opacity-0'
    }`}
>
{showSearchBox && (
  <div className="flex items-center px-4 py-3 rounded-md border-2 overflow-hidden font-[sans-serif] gap-2 w-full ">
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search Something..."
      className="w-full outline-none bg-transparent text-gray-600 text-sm m-1"
    />
    <button
      onClick={() => setShowSearchBox(false)}
      className="text-xl text-gray-500 hover:text-gray-700 focus:outline-none"
    >
      ✖
    </button>
  </div>
)}

</div>


                {/* Search Results Dropdown */}
                {showSearchBox && query.trim() && (localResults.users.length > 0 || localResults.posts.length > 0) && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
                        {/* Users Section */}
                        {localResults.users.length > 0 && (
                            <div className="p-4">
                                <h3 className="text-sm font-semibold text-[#490057] mb-2">Users</h3>
                                {localResults.users.map(user => (
                                    <div key={user.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md">
                                        <img 
                                            src={user.profile_picture || "https://images.pexels.com/photos/14653174/pexels-photo-14653174.jpeg"} 
                                            alt={user.username}
                                            className="w-8 h-8 rounded-full"
                                        />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{user.username}</p>
                                            {user.bio && (
                                                <p className="text-xs text-gray-500 truncate">{user.bio}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Posts Section */}
                        {localResults.posts.length > 0 && (
                            <div className="p-4 border-t">
                                <h3 className="text-sm font-semibold text-[#490057] mb-2">Posts</h3>
                                {localResults.posts.map(post => (
                                    <div key={post.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md">
                                        {post.image && (
                                            <img 
                                                src={getImageUrl(post.image)}                                                alt="Post"
                                                className="w-12 h-12 rounded object-cover"
                                            />
                                        )}
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{post.author}</p>
                                            <p className="text-xs text-gray-500 truncate">{post.content}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {isLoading && (
                    <div className="mt-2 text-center text-sm text-gray-500">Loading...</div>
                )}
            </div>
        </div>
    );
}

export default SearchBar;
