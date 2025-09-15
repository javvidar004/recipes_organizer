import React from 'react';

// If state is 0 show home and login (home)
// If state is 1 show home and register (login)
// If state is 2 show home, login (register)
// If state is 3 show home, login (forgot password)

function Navbar(){
    return (
        <>
            <div className='header-navbar'>
                        <a href="">Home</a>
                        <a href="">Login</a>
                        <a href="">Sign up</a>
            </div>
        </>
    )
};

export default Navbar;





