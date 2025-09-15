import React from "react";
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Content from '../components/Content';
import '../components/Navbar.css'
import '../components/Sidebar.css'

function Home() {
    return (
        <>
            <Navbar />
                <div>
                    <Sidebar />
                    <Content />
                </div>
        </>
    );
}

export default Home;