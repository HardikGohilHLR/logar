// Google Login
import React from 'react';

import { auth, signInWithPopup, GoogleAuthProvider } from '../firebase.config';

const GoogleLogin = ({ googleLoginError }) => {

	const googleSignIn = () => {
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider)
		.catch((error) => {
            googleLoginError(error?.message);
		});		
	};

    return (
        <React.Fragment>
                <button type="button" onClick={googleSignIn} className="social-login-btn google-login-button">
                    <img src="/images/google-icon.svg" alt="Google" />
                    Login with Google 
                </button>
        </React.Fragment>
    )
}

export default GoogleLogin;