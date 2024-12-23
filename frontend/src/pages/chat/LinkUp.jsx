import React from 'react'
import  './TextPage'
const LinkUp = () => {
  return (
    
    <div className="min-w-screen mx-auto bg-black pt-4 ">
       <div class="">
        <button
          id="menu-button"
          class="relative bg-gray-800 w-10 h-10 mx-10  rounded-full flex items-center justify-center focus:outline-none"
          aria-label="Menu"
        >
        
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
         
          <div
            class="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full"
          ></div>
          
        </button>
        <div className="text-white   font-semibold"><h2>Link UP</h2></div>
        </div>

        <div className="search items-center justify-center flex my-5">
        <input
            id="search-input"
            type="text"
            placeholder="Search..."
            class="w-1/2   h-12 pl-4 pr-12 text-gray-700 bg-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            id="search-button"
            class="absolute   top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
            aria-label="Search"
          >
           
          </button>
        
        </div>
        <div class="space-y-4 mt-4">
       
       <a href="TextPage.jsx" class="block">
         <div class="flex mt-3 items-center mb-3 px-4 space-x-4">
           <img
             src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Hanni_OLENS_2.jpg/640px-Hanni_OLENS_2.jpg"
             alt="Profile"
             class="w-16 h-16 rounded-full"
           />
           <div class="flex-1">
             <div class="flex justify-between">
               <span class="font-semibold text-white">Many</span>
               <span class="text-sm text-gray-500">2:25 PM</span>
             </div>
             <p class="text-sm text-gray-400">HI</p>
           </div>
         </div>
       </a>

   </div>

   </div>
  )
}

export default LinkUp
