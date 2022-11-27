// App
import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { auth, onAuthStateChanged } from './firebase.config';

import Home from './logar-app/home';
import Login from './logar-app/login';
import Signup from './logar-app/signup';
import ForgotPassword from './logar-app/forgot-password';

const App = () => {

	const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate('/');
            }
        });
    }, [navigate]);

  	return (
		<React.Fragment>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/login' element={<Login />} />
				<Route path='/signup' element={<Signup />} />
				<Route path='/forgot-password' element={<ForgotPassword />} />
			</Routes>
		</React.Fragment>
	)
}

export default App;