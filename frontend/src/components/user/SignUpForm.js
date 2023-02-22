import React, { useState } from 'react';
import './signUpForm.css';

const SignUpForm = ({ navigate }) => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password === confirmPassword) {

            const response = await fetch('/users', {
                method: 'POST',
                body: JSON.stringify({firstName: firstName, lastName: lastName, email: email, password: password}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const json = await response.json()

            if (!response.ok) {
                setError(json.message)
            }

            if (response.ok) {
                navigate('/login')
                setError(null)
                console.log('Request Submitted')
            }
        } else {
            setError("Passwords do not match.")
        }
    }

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value)
    }

    const handleLastNameChange = (event) => {
        setLastName(event.target.value)
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value)
    }

    return (
        <main>
            <h2 id='sign-up-title'>Sign up now!</h2>

            <div className="container">
                <form className='signUpLoginForm' onSubmit={handleSubmit}>

                    <div className="input-box">
                        <input className='form_field' id="first-name" type='text' value={ firstName } onChange={handleFirstNameChange} />
                        <label id='form_label' for='first-name'>First name</label >
                        <i></i>     
                    </div>

                    <div className="input-box">
                        <input className='form_field' id="last-name" type='text' value={ lastName } onChange={handleLastNameChange} />
                        <label id='form_label' for='last-name'>Last name</label >
                        <i></i>
                    </div>

                    <div className="input-box">
                        <input className='form_field' id="email" type='text' value={ email } onChange={handleEmailChange} />
                        <label id='form_label' for='email'>Email</label>
                        <i></i>
                    </div> 

                    <div className="input-box">
                        <input className='form_field' id="password" type='password' value={ password } onChange={handlePasswordChange} />
                        <label id='form_label' for='password'>Password</label>
                        <i></i>
                    </div> 

                    <div className="input-box">
                        <input className='form_field' id="confirm-password" type='password' value={ confirmPassword } onChange={handleConfirmPasswordChange} />
                        <label id='form_label' for='confirm-password'>Confirm Password</label>
                        <i></i>
                    </div> 

                    <input id='submit' type="submit" value="Sign Up" />
                </form>
            
                {error && <div className="error">{error}</div>}
          
            </div>
        </main>
    );
}

export default SignUpForm;