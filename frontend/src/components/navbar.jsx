import React from 'react';

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
                
                            <div className='col-span-4 p-5 '>
                                    <div class=" w-full  flex  px-4 py-3 rounded-md border-2  overflow-hidden  font-[sans-serif] gap-2 bg-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-[#490057]">
                                            <path d="M8.25 10.875a2.625 2.625 0 1 1 5.25 0 2.625 2.625 0 0 1-5.25 0Z" />
                                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.125 4.5a4.125 4.125 0 1 0 2.338 7.524l2.007 2.006a.75.75 0 1 0 1.06-1.06l-2.006-2.007a4.125 4.125 0 0 0-3.399-6.463Z" clipRule="evenodd" />
                                        </svg>
                                        <input type="email" placeholder="Search Something..." class="w-full outline-none bg-transparent text-gray-600 text-sm m-1" />
                                    </div>
                            </div>
                            
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
