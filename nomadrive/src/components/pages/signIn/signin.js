import React from 'react';
import './signin.css';
import LoginForm from './loginForm';

const SigninPage = () => {
    return (
        <div>
            <LoginForm />
        </div>

    );
};

// const SigninPage = () => {
//     return (
//         <div className='form'>
//             <div className='form_title'>Login </div>
//             <form className='form_items'>
//                 <div className='form_inputs'>
//                     <input type='text' required placeholder="Enter your username" />
//                     <label>email</label>
//                 </div>
//                 <div className='form_inputs'>
//                     <input type='password' required/>
//                     <label>password</label>
//                 </div>
//                 <button className='form_button'>Log In</button>
//             </form>
//             <div className='form_other'>
//                 <a href='#'>forgot password?</a>
//                 <a href='/signup'>Join Now</a>
//             </div>
//         </div>
//     );
// }

export default SigninPage