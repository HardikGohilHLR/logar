// Navbar
import React from 'react';

import { auth, signOut } from '../firebase.config';

const Navbar = () => {
    
    const logout = () => {
        signOut(auth);
    }

    return (
        <React.Fragment>
            <header>
                <div className="container">
                    <div className="navbar">
                        <div className="l_logo">
                            <img src="/logar.svg" alt="Logar" />
                        </div>

                        <div className="navbar-actions">
                            <button className="btn btn-small btn-primary-outlined" onClick={logout}>
                                Logout
                            </button>

                        </div>
                    </div>
                </div>
            </header>
        </React.Fragment>
    )
}

export default Navbar;