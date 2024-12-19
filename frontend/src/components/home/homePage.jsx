// src/Home.jsx
import React from 'react';
import Nav from './components/navbar'
import Sidebar from './components/side_bar'
import Body  from './components/body'
import Suggestion  from './components/suggestion_friend';
import PostPage from '../Post/postPage';
function Home() {
  return (
      <div className="bg-[#EEEEEE] overscroll-contain">
        <div className=''>
          <Nav />
          <div className="grid grid-cols-7 h-screen"> 
            <div className="bg-[#490057] h-full">
              <Sidebar />
            </div>
            {/* <div className="col-span-4 overflow-y-auto  h-full w-fit rounded-xl ml-7"> 
              <Body />
            </div>
            <div className=" h-full col-span-2  overflow-hidden scrollbar-hidden w-64">
              <Suggestion />
            </div> */}
          </div>
        </div>
 
          
  </div>
  );
}

export default Home;
