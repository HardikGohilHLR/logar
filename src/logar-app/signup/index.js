// Signup
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { auth, createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from '../../firebase.config';

const Signup = () => {

    const navigate = useNavigate();

    const [formMessages, setFormMessages] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate('/');
            }
        });
    }, [navigate]);

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('Firstname is required.'),
            lastName: Yup.string().required('Lastname is required.'),
            email: Yup.string().required('Email is required.').email('Please enter a valid email'),
            password: Yup.string().required('Password is required.'),
        }),
        onSubmit: values => {
            setIsLoading(true);
            const { firstName, lastName, email, password } = values;

            const name = `${firstName} ${lastName}`;

			createUserWithEmailAndPassword(auth, email, password)
			.then(() => {
				updateProfile(auth.currentUser, {
					displayName: name
				})
				.then(() => {
                    navigate('/')
					setFormMessages({type: 'success', message: 'Registerd successfully!'});
                    setIsLoading(false);
                })
				.catch((error) => {
                    setIsLoading(false);
					setFormMessages({type: 'danger', message: error?.message});
				});
			})
			.catch((error) => { 
                setIsLoading(false);
                setFormMessages({type: 'danger', message: error?.message});
			});
        }
    });

    const getError = name => {
        return formik?.errors?.[name] && formik?.touched?.[name] ? 'form-control-error' : '';
    }

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

                    {
                        formMessages &&
                        <div className={`message is-${formMessages?.type}`}>
                            <p>{ formMessages?.message }</p>
                            <button type="button" className="delete" onClick={() => setFormMessages(null)}>&#10005;	</button>
                        </div>
                    }

                    <div className="auth_content">
                        <form onSubmit={formik.handleSubmit}>

                            <div className="form-control-col">

                                <div className="form-control">
                                    <label htmlFor="firstName">Firstname <span>*</span></label>
                                    <input type="text" name="firstName" id="firstName" value={formik.values.firstName} onChange={formik.handleChange} className={getError('firstName')} />
                                    
                                    {
                                        getError('firstName') &&
                                        <span className="form-error">{formik?.errors?.firstName}</span>
                                    }
                                </div>

                                <div className="form-control">
                                    <label htmlFor="lastName">Lastname <span>*</span></label>
                                    <input type="text" name="lastName" id="lastName" value={formik.values.lastName} onChange={formik.handleChange} className={getError('lastName')} />

                                    {
                                        getError('lastName') &&
                                        <span className="form-error">{formik?.errors?.lastName}</span>
                                    }
                                </div>

                            </div>

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

                            <div className="btn-control">
                                <button type="submit" className={`btn btn-primary ${isLoading ? 'loading' : ''}`}> Signup </button>
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