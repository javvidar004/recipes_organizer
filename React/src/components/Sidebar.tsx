import { Link } from 'react-router-dom';
import React from "react";
import './Sidebar.css'

function Sidebar() {
    return (
        <>
          <div className="side-nav-collapse ">
                
              <ul>
                <h2>Options</h2>
                    <li>
                        <Link to="/menus">
                            <i className="fa fa-dashboard"></i>
                            Menus
                        </Link>
                    </li>
                    <li>
                        <Link to="/superlist">
                            <i className="fa fa-dashboard"></i>
                            Super list
                        </Link>
                    </li>
                    <li>
                        <Link to="/recipes">
                            <i className="fa fa-dashboard"></i>
                            Recipes
                        </Link>
                    </li>
                    <li>
                        <Link to="/search">
                            <i className="fa fa-search"></i>
                            Search
                        </Link>
                    </li>
                    <li>
                        <Link to="/favorites">
                            <i className="fa fa-book"></i>
                            Favorites
                        </Link>
                    </li>
                    <li>
                        <Link to="/configurations">
                            <i className="fa fa-cog"></i>
                            Configurations
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default Sidebar;
