import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SearchBar({ setSearchResults }) {
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [localResults, setLocalResults] = useState({ users: [], posts: [] });

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

    return (
        <div className='col-span-4 p-5'>
            <div className="w-full flex flex-col relative">
                <div className="flex px-4 py-3 rounded-md border-2 overflow-hidden font-[sans-serif] gap-2 bg-white">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-[#490057]">
                        <path d="M8.25 10.875a2.625 2.625 0 1 1 5.25 0 2.625 2.625 0 0 1-5.25 0Z" />
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.125 4.5a4.125 4.125 0 1 0 2.338 7.524l2.007 2.006a.75.75 0 1 0 1.06-1.06l-2.006-2.007a4.125 4.125 0 0 0-3.399-6.463Z" clipRule="evenodd" />
                    </svg>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search Something..."
                        className="w-full outline-none bg-transparent text-gray-600 text-sm m-1"
                    />
                </div>
                
                {/* Search Results Dropdown */}
                {(query.trim() && (localResults.users.length > 0 || localResults.posts.length > 0)) && (
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