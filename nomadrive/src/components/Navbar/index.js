import React from 'react'
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink } from './NavbarElements'


const Navbar = ({toggle}) => {
  return (
    <>
        <Nav>
            <NavLink to="/">
                <img src='/logo.png' alt="logo" height={80}/>
            </NavLink>
            <Bars onClick={toggle}/>
            <NavMenu>
                <NavLink to="/about"> About </NavLink>
                <NavLink to="/contact-us"> Contact Us </NavLink>
                <NavLink to="/sign-up"> Sign Up </NavLink>
                <NavBtnLink to="/signin">Sign In</NavBtnLink>
            </NavMenu>
        </Nav>
    </>
  )
}

export default Navbar