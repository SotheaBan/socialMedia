import React from 'react';

function Body() {
  return (
    <div>
            <div className=' p-5 rounded-lg text-[#A303A0]'>
                <div className='flex gap-4 justify-center '>
                    <h3>Follower</h3>
                    <h3>Following</h3>
                    <h3>Posts</h3>
                </div>
                <div className='mt-5' >
                    <div>
                    <div className='col-span-1'>
               
                        <div class="flex items-center gap-4 pt-6">
                            <img class="w-10 h-10 rounded-full" src="https://images.pexels.com/photos/14653174/pexels-photo-14653174.jpeg" alt=""/>
                            <div class="font-medium text-gray-700">
                                <div className='text-sm font-bold'>Jese Leos</div>
                                <div class="text-sm text-[#A303A0]"> 15 mn ago</div>
                            </div>
                        </div>
                        <div className='pt-5 p-5'>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1024px-Image_created_with_a_mobile_phone.png" alt="" />
                        </div>
                        <div>
                            <p>
                                Hello world
                            </p>
                        </div>
                    </div>
                    </div>
                </div>

            </div>
    </div>
  );
}

export default Body;