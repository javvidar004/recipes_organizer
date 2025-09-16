import React from "react";

function Sidebar() {
    return (
        <>
          <div className="side-nav-collapse ">
                <h2>Options</h2>
              <ul>
                    <li>
                        <a href="">
                            <i className="fa fa-dashboard"></i>
                            <span>Recipes</span>
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <i className="fa fa-desktop"></i>
                            <span>Strikes</span>
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <i className="fa fa-cloud"></i>
                            <span>Search</span>
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <i className="fa fa-book"></i>
                            <span>Favorites</span>
                        </a>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default Sidebar;
