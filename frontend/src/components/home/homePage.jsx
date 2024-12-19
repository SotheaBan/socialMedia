import React, { useState } from 'react';
import Nav from './components/navbar';
import Sidebar from './components/side_bar';
import Body from './components/body';
import Suggestion from './components/suggestion_friend';

function Home() {

    const [searchResults, setSearchResults] = useState(null); // Track search results

    return (
        <div className="bg-[#EEEEEE] overscroll-contain">
            <Nav setSearchResults={setSearchResults} />
            <div className="grid grid-cols-7 h-screen">
                <div className="bg-[#490057] h-full">
                    <Sidebar />
                </div>
                <div className="col-span-4 overflow-y-auto h-full w-fit rounded-xl ml-7">
                    <Body searchResults={searchResults} />
                </div>
                <div className="h-full col-span-2 overflow-hidden scrollbar-hidden w-64">
                    <Suggestion />
                </div>
            </div>

        </div>
    );
}

export default Home;
