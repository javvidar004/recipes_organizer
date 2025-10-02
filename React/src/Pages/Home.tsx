import React from "react";
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Content from '../components/Content';
import Profilebar from '../components/Profilebar';
import '../components/Navbar.css'
import '../components/Sidebar.css'
import '../components/Content.css'
import '../components/Profilebar.css'
import './Home.css'

function Home() {
    return (
        <>
            <Navbar />
            <div className="home-container">
                <div className="content-area">
                    <div className="content-data">
                        <h2>Home</h2>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;