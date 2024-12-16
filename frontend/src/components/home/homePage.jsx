// src/Home.jsx
import React from 'react';
import Nav from './components/navbar'
import Sidebar from './components/side_bar'
import Body  from './components/body'
import Suggestion  from './components/suggestion_friend';
function Home() {
  return (
      <div className="bg-white overflow-hidden">
        <Nav />
        <div className="grid grid-cols-5 h-screen"> {/* Make the grid take full screen height */}
          <div className="bg-[#490057] h-full">
            <Sidebar />
          </div>
          <div className="col-span-3 overflow-y-auto overflow-hidden h-full"> {/* Make Body scrollable */}
            <Body />
          </div>
          <div className="p-2 h-full">
            <Suggestion />
          </div>
        </div>
  </div>
  );
}

export default Home;
