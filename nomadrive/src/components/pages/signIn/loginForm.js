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
        <div id="container1">
            <div className='login-wrapper'>
                <div>
                    <h2 className="headerTitle">Login</h2>
                </div>
                
                <form>
                    <div className='row'>
                        <label>Email</label>
                        <input type='email' placeholder='Enter your email' name='email' value={values.email} onChange={handleChange} />
                    </div>

                    <div className='row'>
                        <label>Password</label>
                        <input type='password' placeholder='Enter your password' name='password' value={values.password} onChange={handleChange} />
                    </div>

                    <div id="button" className='row'>
                        <button onClick={handleSubmit}>Log In</button>

                    </div>

                    <div className='alternativeLogin'>
                        {/* <a href='#'>forgot your password?</a> */}
                        <a href='/signup'> You don't have an account? Join Now! </a>
                    </div>
                </form>

            </div>
        </div>

    );
}