import React from "react";

function Sidebar() {
    return (
        <>
          <div className="side-nav-collapse ">
                
              <ul>
                <h2>Options</h2>
                    <li>
                        <a href="">
                            <i className="fa fa-dashboard"></i>
                            Recipes
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <i className="fa fa-search"></i>
                            Search
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <i className="fa fa-book"></i>
                            Favorites
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <i className="fa fa-cog"></i>
                            Configurations
                        </a>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default Sidebar;
