import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/pages/homePage/homePage";
import CountryMedia from "./components/pages/countryMedia/countryMedia";
import MapPage from "./components/pages/mapPage/mapPage";
import SigninPage from "./components/pages/signin";
import About from "./components/pages/About/about";
import Signup from "./components/pages/signup";


export default class MyRoutes extends Component {
    render() {
        return (
            <Routes>
                <Route path="/map" element={<MapPage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/CountryMedia" element={<CountryMedia />} />
                <Route path="/signin" element={<SigninPage />} />
                <Route path="/about" element={<About />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        )
    }
}