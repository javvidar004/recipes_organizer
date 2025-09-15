import React from "react";

function Sidebar() {
    return (
        <>
          <div className="side-nav-collapse ">
              <ul className="sidebar-menu" id="nav-accordion">
                    <li className="mt">
                        <a href="">
                            <i className="fa fa-dashboard"></i>
                            <span>Main Dashboard</span>
                        </a>
                    </li>
                    <li className="sub-menu">
                        <a href="javascript:;">
                            <i className="fa fa-desktop"></i>
                            <span>Social Media Platforms</span>
                        </a>
                    </li>
                    <li className="sub-menu">
                        <a href="javascript:;">
                            <i className="fa fa-cloud"></i>
                            <span>Countries</span>
                        </a>
                    </li>
                    <li className="sub-menu">
                        <a href="javascript:;">
                            <i className="fa fa-book"></i>
                            <span>Genders</span>
                        </a>
                    </li>
                    <li className="sub-menu">
                        <a href="javascript:;">
                            <i className="fa fa-tasks"></i>
                            <span>Entertainment</span>
                        </a>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default Sidebar;
