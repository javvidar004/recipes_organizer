import { Link } from 'react-router-dom';
import React from 'react';
import './Navbar.css'

// If state is 0 show home and login (home)
// If state is 1 show home and register (login)
// If state is 2 show home, login (register)
// If state is 3 show home, login (forgot password)

function Navbar(){
    return (
        <>
            <div className='header-navbar'>
                    <button className='menu-btn'>
                        <i className="fa fa-bars" ></i>
                    </button>
                    <h1>Recipes Organizer</h1>
                    <Link to="/">Home</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Sign up</Link>
            </div>
        </>
    )
};

export default Navbar;





