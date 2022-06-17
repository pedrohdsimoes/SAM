import React from 'react'
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink } from './NavbarElements'
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = ({ toggle }) => {
  let location = useLocation();
  let country_url = "";
  console.log(location)
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
          <NavLink to="/sign-up"> Sign Up </NavLink>
          <NavBtnLink to="/signin">Sign In</NavBtnLink>
        </NavMenu>
      </Nav>
    </>
  )
}

export default Navbar