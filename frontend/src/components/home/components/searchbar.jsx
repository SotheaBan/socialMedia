import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SearchBar() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState({ users: [], posts: [] });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const debounceTimer = setTimeout(async () => {
            if (query.trim()) {
                setIsLoading(true);
                try {
                    const response = await axios.get(`/api/searchh/?q=${encodeURIComponent(query)}`);
                    setResults(response.data);
                } catch (error) {
                    console.error('Search error:', error);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setResults({ users: [], posts: [] });
            }
        }, 500); // 500ms debounce delay

        return () => clearTimeout(debounceTimer);
    }, [query]);

    return (
        <div className='col-span-4 p-5'>
            <div className="w-full flex flex-col">
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

                {isLoading && <div className="mt-2">Loading...</div>}
                
                {!isLoading && (results.users.length > 0 || results.posts.length > 0) && (
                    <div className="mt-4 bg-white rounded-md shadow-md p-4">
                        {results.users.length > 0 && (
                            <div className="mb-4">
                                <h3 className="font-bold mb-2">Users</h3>
                                {results.users.map(user => (
                                    <div key={user.id} className="p-2 hover:bg-gray-100 rounded">
                                        {user.username}
                                    </div>
                                ))}
                            </div>
                        )}
                        
                        {results.posts.length > 0 && (
                            <div>
                                <h3 className="font-bold mb-2">Posts</h3>
                                {results.posts.map(post => (
                                    <div key={post.id} className="p-2 hover:bg-gray-100 rounded">
                                        {post.content}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchBar;