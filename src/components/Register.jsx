import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from 'firebase/auth';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import app from '../firebase/firebase.init';
import { Link } from 'react-router-dom';

const auth = getAuth(app)

const Register = () => {
    const [passwordError, setPasswordError] = useState('');
    const [success, setSuccess] = useState(false);

    const registerFormHandler = event => {
        event.preventDefault();
        setSuccess(false)
        const form = event.target;
        const email = event.target.email.value;
        const password = event.target.password.value;

        if (password.length <= 4) {
            setPasswordError('Please set password at least 4 character')
            return;
        }
        if (!/(?=.*[A-Z].*[A-Z])/.test(password)){
            setPasswordError('Please must be used two Uppercase')
            return;
        }
        if(!/(?=.*[@#$%&*])/.test(password)){
            setPasswordError('Please must be used special character')
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user
                setSuccess(true)
                form.reset()
                verifyEmail()
            })
            .catch(error => {
                console.error(error)
                setPasswordError('')
                setPasswordError(error.message)
            })
    }

    const verifyEmail = () => {
        sendEmailVerification(auth.currentUser)
        .then( () => {
            alert('Please check your email and verify')
        })
    }

    return (
        <div className='w-50 mx-auto'>
            <h1 className='text-center my-5 text-primary'>Please Register</h1>
            <Form onSubmit={registerFormHandler}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name='email' placeholder="Enter email" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name='password' placeholder="Password" required />
                </Form.Group>
                {success && <p className='text-success'>Created succesfully</p>}
                <p className='text-danger'>{passwordError}</p>
                <Button variant="primary" type="submit">
                    Register
                </Button>
                <p>Already have a account ? Please <Link to='/login'>Login</Link></p>
            </Form>
        </div>
    );
};

export default Register;