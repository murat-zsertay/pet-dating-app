import React, {useEffect} from 'react';
import './navBar.css';
import {Link} from 'react-router-dom';

const NavBar = () => {
    let token = window.localStorage.getItem("token");

    useEffect(() => {
        token = window.localStorage.getItem("token")
    });

    return (
        <nav className='nav'>
            <div className='nav-container'>
                <Link to="/" className='site-title'>Pawty Time</Link>
                <ul>
                    {!token && <CustomLink to="/login" id="login-navbar">Login</CustomLink>}
                    {!token && <CustomLink to="/signup" id="signup-navbar">Sign-up</CustomLink>}
                    {token && <CustomLink to="/findPetsPage" id="findpets-navbar">Find Pets</CustomLink>}
                    {token && <Link to="/login" id ="logout-navbar" onClick={() => window.localStorage.removeItem("token")}>Logout</Link>}
                </ul>
            </div>
        </nav>
    )
}

const CustomLink = ({to, children}) => {
    const path = window.location.pathname;
    return (
        <li className={path === to ? 'active' : ''}>
            <Link to={to}>
                {children}
            </Link>
        </li>
    )
}

export default NavBar;