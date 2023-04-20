import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import app from '../firebase/firebase.init';

const auth = getAuth(app)

const Login = () => {
    const [success, setSuccess] = useState(false)
    const [userEmail, setUserEmail] = useState('')

    const loginUsers = (event) => {
        event.preventDefault();
        setSuccess(false)
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signInWithEmailAndPassword(auth, email, password)
        .then(result => {
            console.log(result.user)
            form.reset()
            setSuccess(true)
        })
        .catch(error => {
            console.error(error)
        })
    }


    const passwordReset = (event) => {
        const email = event.target.value;
        setUserEmail(email)
    }


    const forgotternPassword =  () => {
        if(!userEmail){
            alert('Please enter your valid email address')
            return;
        }
        sendPasswordResetEmail(auth, userEmail)
        .then( () => {
            alert('Please Check Your Email')
        })
        .catch(error => {
            console.error(error)
        })
    }

    return (
        <div className='w-50 mx-auto'>
            <h1 className='text-center my-5 text-primary'>Please Login</h1>
            <Form onSubmit={loginUsers}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onBlur={passwordReset} type="email" name='email' placeholder="Enter email" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name='password' placeholder="Password" required />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>
                {success && <p className='text-success'>Login Succesfully</p>}
                <p><Button onClick={forgotternPassword} variant="link" className='ps-0'>Forgotten Password?</Button></p>
                <p>You have not a account ? Please <Link to='/register'>Register</Link></p>
            </Form>
        </div>
    );
};

export default Login;