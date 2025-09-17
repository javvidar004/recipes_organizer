import React from "react";

function Profilebar() {
    return (
        <>
            <div className="profile-bar-collapse ">
                <table>
                    <tr>
                        <th><h2>Profile</h2></th>
                    </tr>
                    <tr>
                        <td>
                                <i className="fa fa-mail-forward"></i>
                                Recipes Published

                        </td>
                        <td>#</td>
                    </tr>
                    <tr>
                        <td>
                                <i className="fa fa-book"></i>
                                Favorite Recipes
                        </td>
                        <td>#</td>
                    </tr>
                    <tr>
                        <td>
                                <i className="fa fa-bookmark"></i>
                                Saved Recipes
                        </td>
                        <td>#</td>
                    </tr>
                    <tr>
                        <td>
                                <i className="fa fa-sign-out"></i>
                                Log out
                        </td>
                    </tr>
                </table>
            </div>
        </>
    );
}

export default  Profilebar;