
// src/Home.jsx
import React, { useState } from 'react';
import SearchBar from './searchbar';

function Navbar() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Call setSearchResults to update results (assuming you have a function to fetch results)
    console.log('Search query:', searchQuery);
    // For example, call an API or filter results here and setSearchResults accordingly
  };
  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };


  return (
            <div>
                <nav className="">
                    <div className="flex flex-wrap justify-between md:grid md:grid-cols-7">
                        <a href="" className="md:col-span-1 md:bg-[#490057]">
                            <img
                            src="https://flowbite.com/docs/images/logo.svg"
                            className="h-8 m-5"
                            alt="Flowbite Logo"
                            />
                        </a>
                        <div className="hidden md:block md:col-span-5">
                            <SearchBar setSearchResults={setSearchResults} />
                        </div>
                    
                    <div className="flex justify-center gap-5 md:col-span-1">
                    <button 
                            className="md:hidden" 
                            // Toggle the search input visibility
>
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-7 text-[#A303A0]">
                            <path d="M8.25 10.875a2.625 2.625 0 1 1 5.25 0 2.625 2.625 0 0 1-5.25 0Z" />
                            <path
                                fillRule="evenodd"
                                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.125 4.5a4.125 4.125 0 1 0 2.338 7.524l2.007 2.006a.75.75 0 1 0 1.06-1.06l-2.006-2.007a4.125 4.125 0 0 0-3.399-6.463Z"
                                clipRule="evenodd"
                            />
                            </svg>
                    </button>

                        <a href="" className="flex gap-5 m-5">
                        <div className="hidden md:block">
                            <p>User</p>
                            <p>Login</p>
                        </div>
                        <img
                            src="https://flowbite.com/docs/images/logo.svg"
                            className="h-8"
                            alt="Flowbite Logo"
                        />
                        </a>
                    </div>
                    </div>
                </nav>
            </div>
  );
}

export default Navbar;
