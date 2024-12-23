import '@fortawesome/fontawesome-free/css/all.min.css';
import React from 'react'
const TextPage = () => {
  return (
    <div className="min-w-screen max-auto bg-slate-700">
        <div className="w-full h-16 flex justify-between  items-center bg-gray-800">
            <div className="left  w-[10%] text-white text-xl "><span className="ml-4"><i class="fa-solid fa-arrow-left"></i>
            </span></div>
            <div className="pf w-[20%] ">
            <img
             src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Hanni_OLENS_2.jpg/640px-Hanni_OLENS_2.jpg"
             alt="Profile"
             class="w-14 h-14 mt-1 ml-10 rounded-full"
           />
            </div>
            <div className="username w-[30%]">
            <div class="flex-1">
             <div class="flex  justify-between">
               <span class="font-semibold mt-2 text-white">Many</span>
              
             </div>
             <p class="text-sm  text-gray-400">Active 1hours a...</p>
           </div>
         
            </div>
            <div className="icon w-[40%] ml-5 flex justify-between  items-center">
    <ul class="flex space-x-4">
        <li><a href="#" class="text-white mx-3 text-2xl hover:text-blue-500"><i class="fa-solid fa-phone"></i></a></li>
        <li><a href="#" class="text-white mr-3 text-2xl hover:text-blue-500"><i class="fa-solid fa-video"></i></a></li>
        <li><a href="#" class="text-white text-2xl hover:text-blue-500"><i class="fa-solid fa-circle-exclamation"></i></a></li>
    </ul>
    </div>
        </div>
        <div className="w-full h-96 bg-white"></div>
        <div className="w-full flex h-16">
            <div className=" w-[40%]   h-full  ">
                <ul className="flex mt-5 mx-6 justify-between items-center">
                    <li><a href="" class="text-white text-xl"><i class="fa-solid fa-circle-plus"></i></a></li>
                    <li><a href="" class="text-white text-xl"><i class="fa-solid fa-camera"></i></a></li>
                    <li><a href="" class="text-white text-xl"><i class="fa-solid fa-image"></i></a></li>
                    <li><a href="" class="text-white text-xl"><i class="fa-solid fa-microphone"></i></a></li>
                </ul>
            </div>
            <div className=" w-[50%] h-full">
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
            <div className=" w-[10%] h-full  ">
                <ul class="flex mt-5 mx-6 justify-between items-center">
                    <li><a href="" class="text-white text-xl"><i class="fa-solid fa-thumbs-up"></i></a></li>
                </ul>
            </div>


        </div>
    </div>
  )
}

export default TextPage
