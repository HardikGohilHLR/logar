// ForgotPassword
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { ERROR_MESSAGES } from '../../common/constant';
import { auth, sendPasswordResetEmail } from '../../firebase.config';

import Alert from '../../components/alert';

const ForgotPassword = () => {
    
    const [formMessages, setFormMessages] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().required('Email is required.').email('Please enter a valid email'),
        }),
        onSubmit: values => {
			setIsLoading(true);
			sendPasswordResetEmail(auth, values?.email)
			.then(() => {
                setIsLoading(false);
                setFormMessages({type: 'success', message: `Email has been sent to ${values?.email}`});
                formik.resetForm();
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

    return (
        <React.Fragment>
            <div className="form_container container">

                <div className="l_logo">
                    <img src="/logar.svg" alt="Logar" />
                </div>

                <div className="auth_container">
                    <div className="auth_header">
                        <h3>Forgot Password</h3>
                        <p>No Worries, we'll send you reset instructions to reset your password.</p>
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
                            
                            <div className="btn-control">
                                <button type="submit"  className={`btn btn-primary ${isLoading ? 'loading' : ''}`}> Send Reset Instructions </button>
                            </div>

                            <p className="text-center form-back-login">
                                <Link to="/">
                                    <span>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11.4375 18.75L4.6875 12L11.4375 5.25M5.625 12H19.3125" stroke="#1D2B3B" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"/>
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