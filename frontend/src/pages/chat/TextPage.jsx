import '@fortawesome/fontawesome-free/css/all.min.css';

import React from 'react'

const TextPage = () => {
  return (
    
    <div className="h-screen flex flex-col  bg-slate-700 ">
        <div className="top p-4 grid grid-cols-7 items-center bg-gray-800 flex-shrink-0">
              <div className='col-span-5 flex'>
                <div className="">
                    <span className="ml-4">
                        <i class="fa-solid fa-arrow-left text-white"></i>
                    </span>
                </div>
                <div className=" grid grid-rows-1 ">
                    <div className="flex">
                          <img
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Hanni_OLENS_2.jpg/640px-Hanni_OLENS_2.jpg"
                          alt="Profile"
                          class="w-10 h-10 mt-1 ml-10 rounded-full"
                        />
                        <div className='ml-2 text-white'>
                            <p>Sothea</p>
                            <p className='text-gray-400'>
                              1 hour ago
                            </p>

                        </div>
                    </div>

                </div>
              </div>
              <div className="col-span-2">
                  <ul class="flex justify-end pr-5">

                          <li><a href="#" class="text-white mx-3 text-2xl hover:text-blue-500"><i class="fa-solid fa-phone"></i></a></li>
                          <li><a href="#" class="text-white mr-3 text-2xl hover:text-blue-500"><i class="fa-solid fa-video"></i></a></li>
                          <li><a href="#" class="text-white text-2xl hover:text-blue-500"><i class="fa-solid fa-circle-exclamation"></i></a></li>
                  </ul>
              </div>
          </div>

        <div className="middle w-full h-96 bg-white flex-grow"></div>

        <div className="bottom p-4 grid grid-cols-7 items-center bg-gray-800 flex-shrink-0">
              <div className="col-span-2 md:col-span-1">
                  <ul className="flex gap-4 ">
                      <li><a href="" class="text-white md:text-xl text-base"><i class="fa-solid fa-circle-plus"></i></a></li>
                      <li><a href="" class="text-white md:text-xl text-base"><i class="fa-solid fa-camera"></i></a></li>
                      <li><a href="" class="text-white md:text-xl text-base"><i class="fa-solid fa-image"></i></a></li>
                      <li><a href="" class="text-white md:text-xl text-base"><i class="fa-solid fa-microphone"></i></a></li>
                  </ul>
              </div>
              <div className="col-span-4 flex justify-center w-full md:col-span-5">
                    <input
                      id="search-input"
                      type="text"
                      placeholder="Search..."
                      class="w-full mt-3  h-10 pl-4 pr-12 text-gray-700 bg-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      id="search-button"
                      class="absolute  right-3 transform -translate-y-1/2 text-gray-500"
                      aria-label="Search"
                    >
        
                    </button>
              </div>
              <div className="col-span-1 f ml-5 flex justify-center">
                    <button className='fa-solid fa-thumbs-up text-white text-2xl'>
                        
                    </button>
              </div>
            </div>
        </div>
  )
}

export default TextPage
