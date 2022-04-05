import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { FooterContainer } from "../containers/footer";
import { HeaderContainer } from "../containers/header";
import { Form } from '../components'
import * as ROUTES from "../constants/routes.js";

export default function Signup(){
    const history = useNavigate();
    const [firstName, setfirstName] = useState()
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const isInvalid = firstName === "" || password === "" || emailAddress === "";
    const handleSignup = (event) => {
        event.preventDefault();
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, emailAddress, password)
            .then((userCredential) => 
                updateProfile(auth.currentUser,{
                    displayName: firstName,
                    photoURL: Math.floor(Math.random()*5)+1,
                })
                .then(()=>{
                    history(ROUTES.BROWSE);
                })
                
            )
            .catch((error) => {
                setfirstName('');
                setEmailAddress('');
                setPassword('');
                setError(error.message);
            });
    }

    return (
        <>
            <HeaderContainer>
                <Form>
                    <Form.Title>Sign Up</Form.Title>
                    {error &&<Form.Error>{error}</Form.Error>}
                    <Form.Base onSubmit={handleSignup} methdd="POST">
                        <Form.Input
                            placeholder="First Name"
                            value={firstName}
                            onChange={({target})=> setfirstName(target.value)}
                        />
                        <Form.Input
                            placeholder="Email address"
                            value={emailAddress}
                            onChange={({target})=> setEmailAddress(target.value)}
                        />
                        <Form.Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={({target})=> setPassword(target.value)}
                        />
                        <Form.Submit disabled={isInvalid} type="submit">
                            Sign In
                        </Form.Submit>
                    </Form.Base>
                    <Form.Text>
                        New to Netflix? <Form.Link to={ROUTES.SIGN_UP}>Sign up now.</Form.Link>
                    </Form.Text>
                    <Form.TextSmall>
                        This page is protected by Google reCAPTCHA to ensure you're not a bot. Learn more.
                    </Form.TextSmall>
                </Form>
            </HeaderContainer>
            <FooterContainer />
        </>
    );
}