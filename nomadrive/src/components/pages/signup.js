import React, { useState } from 'react';
import './signup.css';
import RegisterForm from './registerForm'
import RegisterFormSuccess from './registerFormSuccess';

const Signup = () => {
    const [formIsSubmitted, setFormIsSubmitted] = useState(false);

    const submitForm = () => {
        setFormIsSubmitted(true);
    };

    return (
        <div>
           { !formIsSubmitted ? (<RegisterForm submitForm={submitForm}/>) : (<RegisterFormSuccess/>) }
        </div>

    );
};

export default Signup;