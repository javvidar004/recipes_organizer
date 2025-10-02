import React from "react";
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Content from '../components/Content';
import Profilebar from '../components/Profilebar';
import './Home.css'

function Home() {
    return (
        <>
            <Navbar />
            <div className="home-container">
                <Sidebar/>
                <div className="content-area">
                    <div className="content-data">
                        <h2>Home</h2>
                    </div>
                </div>
                <Profilebar/>
            </div>
        </>
    );
}

export default Home;