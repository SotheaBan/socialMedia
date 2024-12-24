import React from 'react'

const Posted = () => {

  return (
    <div>
     <div className="min-w-screen  flex-col  bg-slate-700">
        <div className=" bg-white">
              <div className='mt-5 ml-5'>
                <img src="https://mystickermania.com/cdn/stickers/k-pop/bt21-chimmy-welcomes-512x512.png" 
                alt="" 
                className="rounded-full w-20 h-20 border-2 border-gray-300 shadow-lg hover:scale-110 transition-transform"/>
                <h1 className='ml-6 mt-1'>title</h1>
              </div>
              <hr class="border-black mt-4"/>
             </div>
      </div> 
      <div className="w-full">
              <div className="grid grid-cols-2 ">
                <div className=" col-span-1 h-24">
                  <div class="w-full flex items-center justify-center mt-8">
                        <a
                          href=""
                          class="relative group hover:bg-slate-100 shadow-lg hover:text-black transition p-4 rounded"
                        >
                          <i class="fa-solid fa-table-cells text-2xl lg:text-4xl"></i>
                          <i
                            class="fa-solid fa-minus  absolute top-full left-1/2 mt-2 -translate-x-1/2 text-black text-xl scale-0 opacity-0 transition group-hover:scale-100 group-hover:opacity-100"
                          ></i>
                        </a>

                  </div>
                </div>
                <div className=" col-span-1 h-24">
                  <div class="w-full flex items-center justify-center mt-8">
                        <a
                          href=""
                          class="relative group hover:bg-slate-100 shadow-lg hover:text-black transition p-4 rounded"
                        >
                          <i class="fa-solid fa-user text-2xl lg:text-4xl"></i>
                          <i
                            class="fa-solid fa-minus  absolute top-full left-1/2 mt-2 -translate-x-1/2 text-black text-xl scale-0 opacity-0 transition group-hover:scale-100 group-hover:opacity-100"
                          ></i>
                        </a>
                  </div>
                </div>
              </div>
      </div>
     
 

<div class="grid grid-cols-2 mt-4 md:grid-cols-3 gap-4">
    <div>
        <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg" alt=""/>
    </div>
    <div>
        <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" alt=""/>
    </div>
    <div>
        <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg" alt=""/>
    </div>
    <div>
        <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg" alt=""/>
    </div>
    <div>
        <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg" alt=""/>
    
</div>


</div>
</div>
  )
}

export default Posted
