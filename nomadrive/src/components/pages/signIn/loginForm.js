import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged ,signInWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider, signInWithPopup } from 'firebase/auth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaTwitter, FaFacebook, FaGoogle } from 'react-icons/fa'
import { IconButton } from '@mui/material';

export default function LoginForm() {

    const googleProvider = new GoogleAuthProvider();
    const facebookProvider = new FacebookAuthProvider();
    const twitterProvider = new TwitterAuthProvider();
    const [values, setValues] = useState({ email: '', password: '' });

    let navigate = useNavigate();

    // After Signed in , if you try to sign in again goes to Map
    useEffect(() => {

        let authentication = getAuth();
        onAuthStateChanged(authentication, (user) => {
            if (!user) {
                navigate('/signin')
            }
        });

        let authToken = sessionStorage.getItem('Auth Token')
        if (!authToken) {
            navigate('/signin')
        }
        else {
            navigate('/map')
        }

    }, [])



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


                sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
                let userID = response.user.uid;
                sessionStorage.setItem('userID', userID)
                navigate('/map')

            })
            .catch((error) => {
                if (error.code === 'auth/wrong-password') {
                    toast.error('Password in not correct');
                }
                if (error.code === 'auth/user-not-found') {
                    toast.error('No account with this Email');
                }
            })
        // setErrors(validationForm(values,2));
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

                let userID = user.uid;
                sessionStorage.setItem('userID', userID)

                navigate('/map')

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

    // const handleTwitterAuth = (event) => {
    //     event.preventDefault();
    //     const authentication = getAuth();

    //     signInWithPopup(authentication, twitterProvider)
    //         .then((result) => {
    //             // This gives you a Google Access Token. You can use it to access the Google API.
    //             const credential = TwitterAuthProvider.credentialFromResult(result);
    //             sessionStorage.setItem('Auth Token', result._tokenResponse.refreshToken)
    //             const token = credential.accessToken;
    //             // The signed-in user info.
    //             const user = result.user;
    //             toast('Welcome back ' + user.displayName + ' !',
    //                 { position: toast.POSITION.TOP_CENTER })

    //             // ...
    //             navigate('/map')
    //         }).catch((error) => {
    //             // Handle Errors here.
    //             const errorCode = error.code;
    //             const errorMessage = error.message;
    //             // The email of the user's account used.
    //             const email = error.customData.email;
    //             // The AuthCredential type that was used.
    //             const credential = TwitterAuthProvider.credentialFromError(error);
    //             // ...
    //         });

    // }

    // const handleFacebookAuth = (event) => {
    //     event.preventDefault();
    //     const authentication = getAuth();

    //     signInWithPopup(authentication, facebookProvider)
    //         .then((result) => {
    //             // This gives you a Google Access Token. You can use it to access the Google API.
    //             const credential = FacebookAuthProvider.credentialFromResult(result);
    //             sessionStorage.setItem('Auth Token', result._tokenResponse.refreshToken)
    //             const token = credential.accessToken;
    //             // The signed-in user info.
    //             const user = result.user;
    //             toast('Welcome back ' + user.displayName + ' !',
    //                 { position: toast.POSITION.TOP_CENTER })
    //             // ...
    //             navigate('/map')
    //         }).catch((error) => {
    //             // Handle Errors here.
    //             const errorCode = error.code;
    //             const errorMessage = error.message;
    //             // The email of the user's account used.
    //             const email = error.customData.email;
    //             // The AuthCredential type that was used.
    //             const credential = FacebookAuthProvider.credentialFromError(error);
    //             // ...
    //         });

    // }

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

                    <div id="alternativeReg">
                        <label>Or sign in with:</label>
                        <div id="iconGroup" >
                            <IconButton onClick={handleGoogleAuth} sx={{ color: '#eec023' }}>
                                <FaGoogle fontSize="40px" />
                            </IconButton>
                            {/* <IconButton onClick={handleFacebookAuth} sx={{ color: '#eec023' }}>
                                <FaFacebook fontSize="40px" />
                            </IconButton>
                            <IconButton sx={{ color: '#eec023' }}>
                                <FaTwitter fontSize="40px" />
                            </IconButton> */}
                        </div>
                    </div>

                    <div className='alternativeLogin'>
                        {/* <a href='#'>forgot your password?</a> */}
                        <NavLink to="/signup"> You don't have an account? Join Now! </NavLink>
                        {/* <a href='/signup'> You don't have an account? Join Now! </a> */}
                    </div>
                </form>
                <ToastContainer />
            </div>
        </div>

    );
}