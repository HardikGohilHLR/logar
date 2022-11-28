// Home
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { auth, onAuthStateChanged } from '../../firebase.config';

import Navbar from '../../components/navbar';

const Home = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [searchParams] = useSearchParams();
    
    useEffect(() => {
        const resetCode = searchParams.get("oobCode");
		if(resetCode) {
			navigate(`/reset-password?oobCode=${resetCode}`);
		} else {
            onAuthStateChanged(auth, user => user ? setUser(user) : navigate('/login'));
		}
    }, [navigate, searchParams]);
    
    return (
        <React.Fragment>

            <Navbar />

            <div className="home">
                <div className="container">
                    <h1>Hey, {user?.displayName}</h1>

                    <h2> Email - {user?.email} </h2>
    
                    {
                        user?.providerData?.length === 1 && user?.providerData?.[0]?.providerId === 'google.com' &&
                        <span className="login-method">
                            Logged in with <img src="/images/google-icon.svg" alt="Google" width={20} />
                        </span>
                    }    

                </div>
            </div>

        </React.Fragment>
    )
}

export default Home;