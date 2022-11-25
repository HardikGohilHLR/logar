// Signup
import React from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
    return (
        <React.Fragment>
            <div className="container">

                <div className="l_logo">
                    <img src="/logar.svg" alt="Logar" />
                </div>

                <div className="auth_container">
                    <div className="auth_header">
                        <h3>Sign up</h3>
                        <p>Fill this details to continue with Logar.</p>
                    </div>

                    <div className="auth_content">
                        <form>

                            <div className="form-control-col">
                                <div className="form-control">
                                    <label htmlFor="firstName">Firstname <span>*</span></label>
                                    <input type="text" name="firstName" id="firstName"  />
                                </div>
                                <div className="form-control">
                                    <label htmlFor="lastName">Lastname <span>*</span></label>
                                    <input type="text" name="lastName" id="lastName"  />
                                </div>
                            </div>

                            <div className="form-control">
                                <label htmlFor="email">Email <span>*</span></label>
                                <input type="text" name="email" id="email"  />
                            </div>
                            
                            <div className="form-control">
                                <label htmlFor="password">Password <span>*</span></label>
                                <input type="password" name="password" id="password"  />
                            </div>

                            <div className="btn-control">
                                <button type="submit" className="btn btn-primary">
                                    Signup
                                </button>
                            </div>

                            <p className="text-center">
                                Already have an account? <Link to="/" className="font-medium">Sign In</Link>
                            </p>

                            <div className="social-login">
                                <div className="social-login-header">
                                    <p>Or</p>
                                </div>

                                <div className="social-login-btns">
                                    <button className="social-login-btn">
                                        <img src="/images/google-icon.svg" alt="Google" />
                                        Login with Google 
                                    </button>
                                    
                                    <button className="social-login-btn"> 
                                        <img src="/images/facebook-icon.svg" alt="Facebook" />
                                        Login with Facebook 
                                    </button>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Signup;