import React, { useState } from 'react';
import './signup.css';
import RegisterForm from './registerForm'

const Signup = () => {
    return (
        <div>
            <RegisterForm/> 
        </div>

    );
};

export default Signup;

// function Signup() {
    
//     // States for registration
//     const [firstName, setFirstName] = useState('');
//     const [lastName, setLastName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');

//     // States for checking the errors
//     const [submitted, setSubmitted] = useState(false);
//     const [error, setError] = useState(false);

//     const handleInputChange = (e) => {
//         const { id, value } = e.target;
//         if (id === "firstName") {
//             setFirstName(value);
//             setSubmitted(false);
//         }
//         if (id === "lastName") {
//             setLastName(value);
//             setSubmitted(false);
//         }
//         if (id === "email") {
//             setEmail(value);
//             setSubmitted(false);
//         }
//         if (id === "password") {
//             setPassword(value);
//             setSubmitted(false);
//         }
//         if (id === "confirmPassword") {
//             setConfirmPassword(value);
//             setSubmitted(false);
//         }

//     }

//     const handleSubmit = (e) => {
//         console.log(firstName, lastName, email, password, confirmPassword);

//         if (firstName === '' || lastName === '' || email === '' || password === '' || confirmPassword === '' || password !== confirmPassword) {
//             e.preventDefault();
//             setError(true);
//         }
//         else {
//             setSubmitted(true);
//             setError(false);
//         }
//       }

//     // Showing success message
//     const successMessage = () => {
//         return (
//             <div
//                 className="success"
//                 style={{
//                     display: submitted ? '' : 'none',
//                 }}>
//                 <h1>Mr./Ms. {firstName}, you have successfully registered!!</h1>
//             </div>
//         );
//     };

//     // Showing error message if error is true
//     const errorMessage = () => {
//         return (
//             <div
//                 className="error"
//                 style={{
//                     display: error ? '' : 'none',
//                 }}>
//                 <h1>Please enter all the fields</h1>
//             </div>
//         );
//     };

//     return (
//         <div className="form">

//             <div className="registration">
//                 <h1>User Registration</h1>
//             </div>

//             {/* Calling to the methods */}
//             <div className="messages">
//                 {errorMessage()}
//                 {successMessage()}
//             </div>

//             <form className="form-body">

//                 <div className="username">
//                     <label className="form__label" for="firstName">First Name </label>
//                     <input className="form__input" type="text" value={firstName} onChange={(e) => handleInputChange(e)} id="firstName" placeholder="First Name" />
//                 </div>

//                 <div className="lastname">
//                     <label className="form__label" for="lastName">Last Name </label>
//                     <input type="text" name="" id="lastName" value={lastName} className="form__input" onChange={(e) => handleInputChange(e)} placeholder="LastName" />
//                 </div>

//                 <div className="email">
//                     <label className="form__label" for="email">Email </label>
//                     <input type="email" id="email" className="form__input" value={email} onChange={(e) => handleInputChange(e)} placeholder="Email" />
//                 </div>

//                 <div className="password">
//                     <label className="form__label" for="password">Password </label>
//                     <input className="form__input" type="password" id="password" value={password} onChange={(e) => handleInputChange(e)} placeholder="Password" />
//                 </div>

//                 <div className="confirm-password">
//                     <label className="form__label" for="confirmPassword">Confirm Password </label>
//                     <input className="form__input" type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => handleInputChange(e)} placeholder="Confirm Password" />
//                 </div>

//             </form>

//             <div className="footer">
//                 <button onClick={() => handleSubmit()} type="submit" className="btn">Register</button>
//             </div>

//         </div>

//     )
// }

// export default Signup