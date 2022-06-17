import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/pages/homePage";
import CountryMedia from "./components/pages/countryMedia";
import MapPage from "./components/pages/mapPage";

export default class MyRoutes extends Component {
    render() {
        return (
            <Routes>
                <Route path="/map" element={<MapPage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/CountryMedia" element={<CountryMedia />} />
            </Routes>
        )
    }
}