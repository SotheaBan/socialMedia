import React, { useState } from 'react';
import Nav from './components/navbar';
import Sidebar from './components/side_bar';
import Body from './components/body';
import Suggestion from './components/suggestion_friend';

function Home() {

    const [searchResults, setSearchResults] = useState(null); // Track search results

    return (
        <div className="bg-[#ffffff] md">
            <Nav />
            <div className="grid grid-cols-7 h-screen overflow-hidden">
                <div className="md:bg-[#490057] h-full overflow-hidden">
                    <Sidebar />
                </div>
                <div className="col-span-7 h-screen  md:col-span-5 overflow-y-scroll mb-28">
                    <Body />
                </div>
            </div>
        </div>

    );
}

export default Home;
