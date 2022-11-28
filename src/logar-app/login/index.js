// Login
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { auth, onAuthStateChanged, signInWithEmailAndPassword } from '../../firebase.config';
import { ERROR_MESSAGES } from '../../common/constant';

import Alert from '../../components/alert';
import GoogleLogin from '../../components/google-login';

const Login = () => {

    const navigate = useNavigate();

    const [formMessages, setFormMessages] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => user && navigate('/'));
    }, [navigate]);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().required('Please enter you email.').email('Please enter a valid email.'),
            password: Yup.string().required('Please Enter your password.').matches(/^(?=.{8,})/, 'Must Contain 8 Characters.') 
        }),
        onSubmit: values => {
            setIsLoading(true);
			signInWithEmailAndPassword(auth, values.email, values.password)
			.then(({user}) => {
				setIsLoading(false);
				localStorage.setItem('token', user?.accessToken);
				localStorage.setItem('user', JSON.stringify({ email: user.email }));
				navigate('/');
			})
			.catch((error) => {
                setIsLoading(false);
				setFormMessages({type: 'danger', message: ERROR_MESSAGES?.[error?.code] || error?.code});
			});
        }
    });

    const getError = name => {
        return formik?.errors?.[name] && formik?.touched?.[name] ? 'form-control-error' : '';
    }

    const loginError = (message) => {
        setFormMessages({type: 'danger', message});
    }

    return (
        <React.Fragment>
            <div className="form_container container">

                <div className="l_logo">
                    <img src="/logar.svg" alt="Logar" />
                </div>

                <div className="auth_container">
                    <div className="auth_header">
                        <h3>Log in</h3>
                        <p>Welcome back! Please enter your credentials to continue.</p>
                    </div>

                    { formMessages && <Alert alert={formMessages} setAlert={setFormMessages} /> }

                    <div className="auth_content">
                        <form onSubmit={formik.handleSubmit}>
                            
                            <div className="form-control">
                                <label htmlFor="email">Email <span>*</span></label>
                                <input type="text" name="email" id="email" value={formik.values.email} onChange={formik.handleChange} className={getError('email')} />

                                {
                                    getError('email') &&
                                    <span className="form-error">{formik?.errors?.email}</span>
                                }
                            </div>
                            
                            <div className="form-control">
                                <label htmlFor="password">Password <span>*</span></label>
                                <input type="password" name="password" id="password" value={formik.values.password} onChange={formik.handleChange} className={getError('password')}  />
                                
                                {
                                    getError('password') &&
                                    <span className="form-error">{formik?.errors?.password}</span>
                                } 
                            </div>

                            <div className="form-note">
                                <div className="form-remember">
                                    <div className="form-radio">
                                        <input type="checkbox" name="remember" id="remember" />
                                        <label htmlFor="remember"> Keep me signed in </label>
                                    </div>
                                </div>

                                <p> <Link to="/forgot-password" className="text-dark">Forgot Password?</Link> </p>
                            </div>
                            
                            <div className="btn-control">
                                <button type="submit" className={`btn btn-primary ${isLoading ? 'loading' : ''}`}> Login </button>
                            </div>

                            <p className="text-center">
                                Don't have an account? <Link to="/signup" className="font-medium">Sign up</Link>
                            </p>

                            <div className="social-login">
                                <div className="social-login-header">
                                    <p>Or</p>
                                </div>

                                <div className="social-login-btns">
                                    <GoogleLogin googleLoginError={loginError} />
                                    
                                    {/* <button className="social-login-btn"> 
                                        <img src="/images/facebook-icon.svg" alt="Facebook" />
                                        Login with Facebook 
                                    </button> */}
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Login;