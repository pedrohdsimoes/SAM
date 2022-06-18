import React, { useState } from 'react'
import validationForm from './validationForm';
import { FaTwitter, FaFacebook, FaGoogle } from 'react-icons/fa'

export default function RegisterForm() {

    const [errors, setErrors] = useState({});

    const [values, setValues] = useState({
        firstname: '', lastname: '', email: '', password: '', confirmpassword: ''
    });

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(validationForm(values));
    }

    return (
        <div className="container">
            <div className="app-wrapper">
                <div>
                    <h2 className='title'> Create Account </h2>
                </div>
                <form className='from-wapper'>
                    <div className='firstName'>
                        <label className='label'>First Name</label>
                        <input className='input' type='text' name='firstname' value={values.firstname} onChange={handleChange} />
                    </div>
                    {errors.firstname && <p className='error'>{errors.firstname}</p>}

                    <div className='lastName'>
                        <label className='label'>Last Name</label>
                        <input className='input' type='text' name='lastname' value={values.lastname} onChange={handleChange} />
                    </div>
                    {errors.lastname && <p className='error'>{errors.lastname}</p>}

                    <div className='email'>
                        <label className='label'>Email</label>
                        <input className='input' type='email' name='email' value={values.email} onChange={handleChange} />
                    </div>
                    {errors.email && <p className='error'>{errors.email}</p>}

                    <div className='password'>
                        <label className='label'>Password</label>
                        <input className='input' type='password' name='password' value={values.password} onChange={handleChange} />
                    </div>
                    {errors.password && <p className='error'>{errors.password}</p>}


                    <div className='confirmPassword'>
                        <label className='label'>Confirm Password</label>
                        <input className='input' type='password' name='confirmpassword' value={values.confirmpassword} onChange={handleChange} />
                    </div>
                    {errors.confirmpassword && <p className='error'>{errors.confirmpassword}</p>}

                    <div>
                        <button className='submit' onClick={handleSubmit}>Sign Up</button>
                    </div>

                    <div id="alternativeLogin">
                        <label>Or sign in with:</label>
                        <div id="iconGroup" >
                            < FaTwitter />
                            <FaFacebook />
                            <FaGoogle />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}