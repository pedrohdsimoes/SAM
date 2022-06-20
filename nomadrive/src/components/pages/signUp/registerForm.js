import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import validationForm from './validationForm';
import { FaTwitter, FaFacebook, FaGoogle } from 'react-icons/fa'
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider, signInWithPopup } from 'firebase/auth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IconButton } from '@mui/material';

const RegisterForm = ({ submitForm }) => {

    const googleProvider = new GoogleAuthProvider();
    const facebookProvider = new FacebookAuthProvider();
    const twitterProvider = new TwitterAuthProvider();

    let navigate = useNavigate();

    // After Signed up , if you try to sign up again goes to Map
    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token')

        if (authToken) {
            navigate('/map')
        }
    }, [])

    const [values, setValues] = useState({
        firstname: '', lastname: '', email: '', password: '', confirmpassword: ''
    });

    const [errors, setErrors] = useState({});
    const [dataIsCorrect, setDataIsCorrect] = useState(false);
    // LOGOUT => TODO: Criar botao para dar logout (talvez num user profile) 
    // const handleLogout = () => {
    //     sessionStorage.removeItem('Auth Token');
    //     navigate('/signin')
    // }
    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    const handleSignUp = (event) => {
        event.preventDefault();
        setErrors(validationForm(values, 1));
        setDataIsCorrect(true);

        const authentication = getAuth();

        createUserWithEmailAndPassword(authentication, values.email, values.password)
            .then((response) => {
                // Confirm that account is created
                // submitForm(true)
                navigate('/map')
                sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)

            })
            .catch((error) => {
                console.log(error)
                if (error.code === 'auth/email-already-in-use') {
                    toast.error('Account already exists with this email');
                }
            })
    }

    const handleGoogleAuth = (event) => {
        event.preventDefault();
        const authentication = getAuth();

        signInWithPopup(authentication, googleProvider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                sessionStorage.setItem('Auth Token', result._tokenResponse.refreshToken)
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                navigate('/map')
                toast('Welcome back ' + user.displayName + ' !',
                    { position: toast.POSITION.TOP_CENTER })

                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }

    const handleTwitterAuth = (event) => {
        event.preventDefault();
        const authentication = getAuth();

        signInWithPopup(authentication, twitterProvider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = TwitterAuthProvider.credentialFromResult(result);
                sessionStorage.setItem('Auth Token', result._tokenResponse.refreshToken)
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                toast('Welcome back ' + user.displayName + ' !',
                    { position: toast.POSITION.TOP_CENTER })

                // ...
                navigate('/map')
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = TwitterAuthProvider.credentialFromError(error);
                // ...
            });

    }

    const handleFacebookAuth = (event) => {
        event.preventDefault();
        const authentication = getAuth();

        signInWithPopup(authentication, facebookProvider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = FacebookAuthProvider.credentialFromResult(result);
                sessionStorage.setItem('Auth Token', result._tokenResponse.refreshToken)
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                toast('Welcome back ' + user.displayName + ' !',
                    { position: toast.POSITION.TOP_CENTER })
                // ...
                navigate('/map')
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = FacebookAuthProvider.credentialFromError(error);
                // ...
            });

    }

    // TODO: acrescentar condição do response
    // useEffect(() => {
    //     if (Object.keys(errors).length === 0 && dataIsCorrect) {
    //         submitForm(true)
    //     }
    // }, [errors]);

    return (
        <div className="container">
            <div className="app-wrapper">
                <div>
                    <h2 className='title'> Create Account </h2>
                </div>
                <form className='form-wapper'>
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
                        <input className='input' type='password' name='password' autoComplete='on' value={values.password} onChange={handleChange} />
                    </div>
                    {errors.password && <p className='error'>{errors.password}</p>}


                    <div className='confirmPassword'>
                        <label className='label'>Confirm Password</label>
                        <input className='input' type='password' name='confirmpassword' autoComplete='on' value={values.confirmpassword} onChange={handleChange} />
                    </div>
                    {errors.confirmpassword && <p className='error'>{errors.confirmpassword}</p>}

                    <div>
                        <button className='submit' onClick={handleSignUp}>Sign Up</button>
                    </div>

                    <div id="alternativeReg">
                        <label>Or sign in with:</label>
                        <div id="iconGroup" >
                            <IconButton onClick={handleGoogleAuth} sx={{ color: '#eec023' }}>
                                <FaGoogle  fontSize="40px" />
                            </IconButton>
                            {/* <IconButton onClick={handleFacebookAuth} sx={{ color: '#eec023' }}>
                                <FaFacebook fontSize="40px" />
                            </IconButton>
                            <IconButton  sx={{ color: '#eec023' }}>
                                <FaTwitter  fontSize="40px" />
                            </IconButton> */}
                        </div>
                    </div>
                    <ToastContainer />
                </form>
            </div>
        </div>
    );
}

export default RegisterForm