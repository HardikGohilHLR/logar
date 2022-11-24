// App
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Login from './logar-app/login';

const App = () => {
  	return (
		<React.Fragment>
			<Routes>
				<Route path='/' element={<Login />} />
			</Routes>
		</React.Fragment>
	)
}

export default App;