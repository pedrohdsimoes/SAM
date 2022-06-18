
const validationForm = (values) => {

    let errors = {};

    if (!values.firstname) {
        errors.firstname = 'First Name required.'
    }

    if (!values.lastname) {
        errors.lastname = 'Last Name required.'
    }

    if (!values.email) {
        errors.email = 'Email required.'
    }
    else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Invalid Email'
    }
    if (!values.password) {
        errors.password = 'Password required.'
    }
    else if (values.password.length < 6) {
        errors.password = 'Password must have more than 5 characters.'
    }
    if (!values.confirmpassword) {
        errors.confirmpassword = 'Confirm your password please.'
    }
    else if (values.confirmpassword.length < 6) {
        errors.confirmpassword = 'Password must have more than 5 characters.'
    }
    else if (values.password !== values.confirmpassword) {
        errors.confirmpassword = 'Passwords not matching'
    }


    return errors;
};

export default validationForm;