// Reset Password
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { auth, onAuthStateChanged, verifyPasswordResetCode, confirmPasswordReset } from '../../firebase.config';
import { ERROR_MESSAGES } from '../../common/constant';

import Alert from '../../components/alert';

const ResetPassword = () => {

    const [searchParams] = useSearchParams();
   
    const navigate = useNavigate();

    const [formMessages, setFormMessages] = useState('');
    const [isValidCode, setIsValidCode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => user && navigate('/'));
    }, [navigate]);

    useEffect(() => {
        const resetCode = searchParams.get("oobCode");
        if(resetCode) {
            verifyPasswordResetCode(auth, resetCode)
            .then(() => {
                setIsValidCode(true);
            })
            .catch(error => {
                setIsValidCode(false);
				setFormMessages({type: 'danger', message: ERROR_MESSAGES?.[error?.code] || error?.code});
            })
        }
    }, [searchParams]);    

    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            password: Yup.string().required('Please Enter your password.').matches(/^(?=.{8,})/, 'Must Contain 8 Characters.'),
            confirmPassword: Yup.string().required('Please Re-type your password.').oneOf([Yup.ref('password'), null], 'Passwords must match.')
        }),
        onSubmit: values => {
            setIsLoading(true);
            if(isValidCode) {
                confirmPasswordReset(auth, searchParams.get("oobCode"), values.password)
                .then(() => {
                    setIsLoading(false);
                    setFormMessages({type: 'success', message: 'Password reset successfully! Please Login...'});
                })
                .catch(error => {
                    setIsLoading(false);
                    setFormMessages({type: 'danger', message: ERROR_MESSAGES?.[error?.code] || error?.code});
                })
            }
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
                        <h3>Reset Password</h3>
                        <p>Please choose a new password which must be diffrent from old password.</p>
                    </div>

                    { formMessages && <Alert alert={formMessages} setAlert={setFormMessages} /> }

                    <div className="auth_content">
                        <form onSubmit={formik.handleSubmit}>
                            
                            <div className="form-control">
                                <label htmlFor="password">Password <span>*</span></label>
                                <input type="password" name="password" id="password" value={formik.values.password} onChange={formik.handleChange} className={getError('password')}  />
                                
                                {
                                    getError('password') &&
                                    <span className="form-error">{formik?.errors?.password}</span>
                                } 
                            </div>

                            <div className="form-control">
                                <label htmlFor="confirmPassword">Confirm Password <span>*</span></label>
                                <input type="password" name="confirmPassword" id="confirmPassword" value={formik.values.confirmPassword} onChange={formik.handleChange} className={getError('confirmPassword')}  />
                                
                                {
                                    getError('confirmPassword') &&
                                    <span className="form-error">{formik?.errors?.confirmPassword}</span>
                                } 
                            </div>
                            
                            <div className="btn-control">
                                <button type="submit" className={`btn btn-primary ${isLoading ? 'loading' : ''} ${isValidCode ? '' : 'disabled'}`}> Reset </button>
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

export default ResetPassword;