// Login
import React from 'react';

const Login = () => {
    return (
        <React.Fragment>
            <div className="container">

                <div className="l_logo">
                    <img src="/logar.svg" alt="Logar" />
                </div>

                <div className="auth_container">
                    <div className="auth_header">
                        <h3>Log in</h3>
                        <p>Welcome back! Please enter your credentials to continue.</p>
                    </div>

                    <div className="auth_content">
                        <form>
                            
                            <div className="form-control">
                                <label htmlFor="email">Email <span>*</span></label>
                                <input type="text" name="email" id="email"  />
                            </div>
                            
                            <div className="form-control">
                                <label htmlFor="password">Password <span>*</span></label>
                                <input type="password" name="password" id="password"  />
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Login;