// App
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ForgotPassword from './logar-app/forgot-password';

import Login from './logar-app/login';
import Signup from './logar-app/signup';

const App = () => {
  	return (
		<React.Fragment>
			<Routes>
				<Route path='/' element={<Login />} />
				<Route path='/signup' element={<Signup />} />
				<Route path='/forgot-password' element={<ForgotPassword />} />
			</Routes>
		</React.Fragment>
	)
}

export default App;