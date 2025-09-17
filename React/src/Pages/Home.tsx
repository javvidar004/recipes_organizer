import React from "react";
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Content from '../components/Content';
import Profilebar from '../components/Profilebar';
import '../components/Navbar.css'
import '../components/Sidebar.css'
import '../components/Content.css'
import '../components/Profilebar.css'

function Home() {
    return (
        <>
            <Navbar />
            <Sidebar />
            <Content />
            <Profilebar />
        </>
    );
}

export default Home;