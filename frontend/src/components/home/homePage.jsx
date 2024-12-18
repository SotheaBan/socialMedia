// src/Home.jsx
import React from 'react';
import Nav from './components/navbar'
import Sidebar from './components/side_bar'
import Body  from './components/body'
import Suggestion  from './components/suggestion_friend';
function Home() {
  return (
      <div className="bg-[#EEEEEE] overflow-hidden">
        <div className='mr-5'>
          <Nav />
          <div className="grid grid-cols-7 h-screen"> 
            <div className="bg-[#490057] h-full">
              <Sidebar />
            </div>
            <div className="col-span-5 overflow-y-auto overflow-hidden h-full w-fit rounded-xl"> 
              <Body />
            </div>
            <div className=" h-full col-span-1 w-fit  overflow-hidden scrollbar-hidden">
              <Suggestion />
            </div>
          </div>
        </div>
          
  </div>
  );
}

export default Home;
