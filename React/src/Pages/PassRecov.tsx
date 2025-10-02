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
                    <div className="content-form">
                        <h2>Forgot password</h2>
                        <form action="register.html" method="post">
                            <div className="Dform">
                                <input type="text" id="username" name="username" required placeholder="email"/>
                            </div>
                            <div className="Dform">
                                <input className="send" type="submit" value="Recuperar"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;