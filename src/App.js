// App
import React, { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Preloader from './components/preloader';

import { auth, onAuthStateChanged } from './firebase.config';

import Login from './logar-app/login';
const Home = lazy(() => import('./logar-app/home'));
const Signup = lazy(() => import('./logar-app/signup'));
const ForgotPassword = lazy(() => import('./logar-app/forgot-password'));
const ResetPassword = lazy(() => import('./logar-app/reset-password'));

const App = () => {

	const navigate = useNavigate();

    useEffect(() => {
		onAuthStateChanged(auth, user => user && navigate('/'));
    }, [navigate]);

  	return (
		<React.Fragment>
			
			<Suspense fallback={<Preloader />}>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/login' element={<Login />} />
					<Route path='/signup' element={<Signup />} />
					<Route path='/forgot-password' element={<ForgotPassword />} />
					<Route path='/reset-password' element={<ResetPassword />} />
				</Routes>
			</Suspense>
		</React.Fragment>
	)
}

export default App;