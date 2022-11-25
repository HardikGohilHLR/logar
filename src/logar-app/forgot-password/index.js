// ForgotPassword
import React from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    return (
        <React.Fragment>
            <div className="container">

                <div className="l_logo">
                    <img src="/logar.svg" alt="Logar" />
                </div>

                <div className="auth_container">
                    <div className="auth_header">
                        <h3>Forgot Password</h3>
                        <p>No Worries, we'll send you reset instructions to reset your password.</p>
                    </div>

                    <div className="auth_content">
                        <form>

                            <div className="form-control">
                                <label htmlFor="email">Email <span>*</span></label>
                                <input type="text" name="email" id="email"  />
                            </div>
                            
                            <div className="btn-control">
                                <button type="submit" className="btn btn-primary"> Send Reset Instructions </button>
                            </div>

                            <p className="text-center form-back-login">
                                <Link to="/">
                                    <span>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11.4375 18.75L4.6875 12L11.4375 5.25M5.625 12H19.3125" stroke="#1D2B3B" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </span>
                                    Back to Login
                                </Link>
                            </p>

                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ForgotPassword;