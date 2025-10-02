import {Link} from 'react-router-dom'
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
                        <h2>Login</h2>
                        <form action="" method="post">
                            <div className="Dform">
                                <input type="text" id="username" name="username" required placeholder="email/username"/>
                            </div>
                            <div className="Dform">
                                <input type="password" id="password" name="password" required placeholder="password"/>
                            </div>
                            <div className="Dform">
                                <Link to="/forgot-password">Forgot password?</Link>
                            </div>
                            <div className="Dform">
                                <input className="send" type="submit" value="Log in"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;