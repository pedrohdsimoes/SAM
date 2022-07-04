import React, { useEffect } from 'react'
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink } from './NavbarElements'
import { useNavigate, useLocation } from "react-router-dom";
import AccountMenu from './accountMenu';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const Navbar = ({ toggle }) => {
    let authentication = getAuth();
    let authToken = sessionStorage.getItem('Auth Token')

    onAuthStateChanged(authentication, (user) => {
        if (!user) {
            // no user logged in
            let signUp = document.getElementById("signUp")
            if (signUp !== null)
                signUp.style.display = "flex"

            let signIn = document.getElementById("signIn")
            if (signIn !== null)
                signIn.style.display = "flex"
        }
    });

    if (!authToken) {
        // no user logged in
        let signUp = document.getElementById("signUp")
        if (signUp !== null)
            signUp.style.display = "flex"

        let signIn = document.getElementById("signIn")
        if (signIn !== null)
            signIn.style.display = "flex"
    }
    else {
        // user already logged in -> SignUp btn and SignIn btn disappear 
        let signUp = document.getElementById("signUp")
        if (signUp !== null)
            signUp.style.display = "none"

        let signIn = document.getElementById("signIn")
        if (signIn !== null)
            signIn.style.display = "none"
    }


    let location = useLocation();
    let country_url = "";
    if (location.state === null) country_url = "";
    else country_url = 'https://countryflagsapi.com/svg/' + location.state.code;

    return (
        <>
            <Nav>
                <NavLink to="/">
                    <img src='/logo.png' alt="logo" height={80} />
                    <h1 style={{ fontSize: '30px', backgroundImage: `url(https://countryflagsapi.com/svg/804)`, backgroundSize: 'cover', backgroundClip: 'text', WebkitBackgroundClip: 'text', color: 'transparent', display: 'inline-block', WebkitTextStroke: '0.65px', WebkitTextStrokeColor: '#ffffff', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                        NOMADRIVE
                    </h1>
                    <img style={{ height: '40px', paddingLeft: "10px", position: 'center' }} src={country_url}></img>
                </NavLink>
                <Bars onClick={toggle} />
                <NavMenu>
                    <NavLink to="/map"> Map </NavLink>
                    <NavLink to="/about"> About Us</NavLink>
                    <NavLink id="signUp" to="/signup"> Sign Up </NavLink>
                    <NavBtnLink id="signIn" to="/signin">Sign In</NavBtnLink>
                    <AccountMenu />
                </NavMenu>
            </Nav>
        </>
    )
}

export default Navbar