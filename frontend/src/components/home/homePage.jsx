// src/Home.jsx
import React from 'react';
import Nav from './components/navbar'
import Sidebar from './components/side_bar'
import Body  from './components/body'
import Suggestion  from './components/suggestion_friend';
function Home() {
  return (
    <div className='bg-white overflow-hidden'>
        <Nav/>
        <div className='grid grid-cols-5'>
            <div className='bg-[#490057] h-screen'>
              <Sidebar/>
            </div>
            <div className='col-span-3'> 
              <Body/>
            </div>
            <div className='p-2'>
            <Suggestion/>
            </div>
        </div>

        
    </div>
  );
}

export default Home;
