import React from "react";

function Content() {
    return (
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
                            <a href="">Forgot password?</a>
                        </div>
                        <div className="Dform">
                            <input className="send" type="submit" value="Log in"/>
                        </div>
                    </form>
            </div>

            <div className="content-form">
                <h2>Sign up</h2>
                    <form action="" method="post">
                        <div className="Dform">
                            <input type="text" id="email" name="email" required placeholder="email"/>
                        </div>
                        <div className="Dform">
                            <input type="text" id="username" name="username" required placeholder="username"/>
                        </div>
                        <div className="Dform">
                            <input type="text" id="name" name="name" required placeholder="name"/>
                        </div>
                        <div className="Dform">
                            <input type="text" id="lastname" name="lastname" required placeholder="lastname"/>
                        </div>
                        <div className="Dform">
                            <input type="password" id="password" name="password" required placeholder="password"/>
                        </div>
                        <div className="Dform">
                            <input type="password" id="password" name="password" required placeholder="confirm password"/>
                        </div>
                        <div className="Dform">
                            <input className="send" type="submit" value="Registrarse"/>
                        </div>
                    </form>
            </div>

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

            <div className="content-data">
                <h2>Home</h2>
            </div>

            <div className="content-data">
                <h2>Main</h2>
            </div>
        </div>
    )
};

export default Content;
