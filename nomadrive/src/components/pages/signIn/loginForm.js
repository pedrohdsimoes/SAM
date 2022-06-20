import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginForm() {
    let navigate = useNavigate();
    const [values, setValues] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const authentication = getAuth();

        signInWithEmailAndPassword(authentication, values.email, values.password)
            .then((response) => {
                // console.log(response)              
                navigate('/map')
                sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
            })
            .catch((error) => {
                if(error.code === 'auth/wrong-password'){
                    toast.error('Please check the Password');
                  }
                  if(error.code === 'auth/user-not-found'){
                    toast.error('Please check the Email');
                  }
            })
        // setErrors(validationForm(values,2));
    }

    return (
        <div id="container1">
            <div className='login-wrapper'>
                <div>
                    <h2 className="headerTitle">Sign In</h2>
                </div>
                
                <form>
                    <div className='row'>
                        <label>Email</label>
                        <input type='email' placeholder='Enter your email' name='email' value={values.email} onChange={handleChange} />
                    </div>

                    <div className='row'>
                        <label>Password</label>
                        <input type='password' placeholder='Enter your password' name='password' autoComplete='on' value={values.password} onChange={handleChange} />
                    </div>

                    <div id="button" className='row'>
                        <button onClick={handleSubmit}>Sign In</button>

                    </div>

                    <div className='alternativeLogin'>
                        {/* <a href='#'>forgot your password?</a> */}
                        <a href='/signup'> You don't have an account? Join Now! </a>
                    </div>
                </form>
                <ToastContainer />
            </div>
        </div>

    );
}