import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/homePage";
import CountryMedia from "./components/countryMedia";

export default class MyRoutes extends Component {
    render() {
        return (
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/CountryMedia" element={<CountryMedia />} />
            </Routes>
        )
    }
}