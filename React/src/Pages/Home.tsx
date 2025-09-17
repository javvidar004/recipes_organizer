import React from "react";
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Content from '../components/Content';
import '../components/Navbar.css'
import '../components/Sidebar.css'
import '../components/Content.css'

function Home() {
    return (
        <>
            <Navbar />
                    <Sidebar />
                    <Content />
        </>
    );
}

export default Home;