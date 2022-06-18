import React, { useState } from 'react'

export default function LoginForm() {

    const [values, setValues] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        // setErrors(validationForm(values));
    }

    return (
        <form onSubmit={handleSubmit}>

            <div className='form-inner'>
                <h2> Login </h2>
            </div>

            <div className='form-group'>
                <input type='email' required placeholder="Enter your email" name='email' value={values.email} onChange={handleChange} />
                <label>Email</label>
            </div>

            <div className='form-group'>
                <input type='password' required placeholder="Enter your password" name='password' value={values.password} onChange={handleChange} />
                <label>Password</label>
            </div>

            <button className='form_button'>Log In</button>

        </form>
        // <div className='form_other'>
        //     <a href='#'>forgot your password?</a>
        //     <a href='/signup'>Join Now</a>
        // </div>

    );
}