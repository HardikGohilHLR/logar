// Home
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { auth, onAuthStateChanged } from '../../firebase.config';

import Navbar from '../../components/navbar';

const Home = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                navigate('/login');
            }
        });
    }, [navigate]);
    
    return (
        <React.Fragment>

            <Navbar />

            <div className="home">
                <div className="container">

                    <h1>Hey, {user?.displayName}</h1>

                    <h2>{user?.email}</h2>

                    {
                        user?.providerData?.length === 1 && user?.providerData?.[0]?.providerId === 'google.com' &&
                        <span className="tag is-danger ml-3 is-inline-flex is-align-items-center">
                            Logged in with Google
                        </span>
                    }
                </div>
            </div>

        </React.Fragment>
    )
}

export default Home;