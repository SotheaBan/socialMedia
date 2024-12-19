import React from 'react';
import SearchBar from './searchbar';

function nav() {
  return (
        <div>
            <div className='grid grid-cols-7'>
                <div className='col-span-1 bg-[#490057] p-8'>
                    <div className='w-14 bg-[#490057]'>
                            <img src="https://freepnglogo.com/images/all_img/1715965947instagram-logo-png%20(1).png" alt="" />
                    </div>
                </div>
                <div className='col-span-6'>
                    <div className='grid grid-cols-5 gap-4 items-center text-center'>
                
                            <SearchBar />
                            
                            <div className='col-span-1'>
                            
                                <div class="flex items-center gap-4">
                                    <div class="font-medium text-[#490057]">
                                        <div className='text-sm font-bold'>Jese Leos</div>
                                        <div class="text-xs">Log out</div>
                                    </div>
                                    <img class="w-10 h-10 rounded-full" src="https://images.pexels.com/photos/14653174/pexels-photo-14653174.jpeg" alt=""/>
                                </div>
                            </div>
                    </div>
                </div>

            </div>
        </div>
  );
}

export default nav;
