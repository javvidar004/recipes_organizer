import React from 'react';

// If state is 0 show home and login (home)
// If state is 1 show home and register (login)
// If state is 2 show home, login (register)
// If state is 3 show home, login (forgot password)

interface NavbarProps {
  state: number;
  setState: React.Dispatch<React.SetStateAction<number>>;
}

const renderLinks = (state: number, setState: React.Dispatch<React.SetStateAction<number>>) => {
    switch (state) {
        case 0:
            return (
                <>
                    <li><a href="/" onClick={() => setState(0)}>Home</a></li>
                    <li><a href="/login" onClick={() => setState(1)}>Login</a></li>
                </>
            );
        case 1:
            return (
                <>
                    <li><a href="/" onClick={() => setState(0)}>Home</a></li>
                    <li><a href="/register" onClick={() => setState(2)}>Register</a></li>
                </>
            );
        case 2:
            return (
                <>
                    <li><a href="/" onClick={() => setState(0)}>Home</a></li>
                    <li><a href="/login" onClick={() => setState(1)}>Login</a></li>
                </>
            );
        case 3:
            return (
                <>
                    <li><a href="/" onClick={() => setState(0)}>Home</a></li>
                    <li><a href="/login" onClick={() => setState(1)}>Login</a></li>
                </>
            );
        default:
            return null;
    }
};

const Navbar: React.FC<NavbarProps> = ({ state, setState }) => {
    return (
        <nav>
            <ul>
                {renderLinks(state, setState)}
            </ul>
        </nav>
    );
};

export default Navbar;





