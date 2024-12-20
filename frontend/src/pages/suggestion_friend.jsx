// src/Home.jsx
import React from 'react';
function Suggestion() {
  return (
    <div className='bg-white p-10 max-w-full rounded-lg'>
        <div className=' text-white '>
            <h1 className='font-bold items-center text-center text-rose-700'>You might Know</h1>
           
            <div class="flex items-center gap-4 mt-6">
                <img class="w-10 h-10 rounded-full" src="https://images.pexels.com/photos/14653174/pexels-photo-14653174.jpeg" alt=""/>
                <div class="font-medium text-black">
                        <div className='text-sm '>Jese Leos</div>
                        <div class="text-sm">Sothea</div>
                </div>   
            </div>
            <div class="flex items-center gap-4 mt-6">
                <img class="w-10 h-10 rounded-full" src="https://images.pexels.com/photos/14653174/pexels-photo-14653174.jpeg" alt=""/>
                <div class="font-medium text-black ">
                        <div className='text-sm'>Jese Leos</div>
                        <div class="text-sm">admin</div>
                </div>   
            </div>
            <div class="flex items-center gap-4 mt-6">
                <img class="w-10 h-10 rounded-full" src="https://images.pexels.com/photos/14653174/pexels-photo-14653174.jpeg" alt=""/>
                <div class="font-medium text-black">
                        <div className='text-sm '>Jese Leos</div>
                        <div class="text-sm">bansothea</div>
                </div>   
            </div>
        </div>
    </div>
  );
}

export default Suggestion;