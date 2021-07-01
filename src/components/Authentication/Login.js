import React, {useState} from 'react';

import {Button, Form} from "react-bootstrap";

import styles from './Login.module.css';


const Login = () => {

    const errors = {
        invalidEmail: <small className={styles.invalid}>Nieprawidłowy adres email</small>,
        tooShortPassword: <small className={styles.invalid}>Podane hasło jest zbyt krótkie</small>,
        invalidCredentials: <div className={`${styles.invalidCred} ${styles.invalid}`}>Niepoprawny email i/lub
            hasło</div>
    }

    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');

    const [validEmail, setValidEmail] = useState(true);
    const [validPassword, setValidPassword] = useState(true);
    const [invalidCredentials, setInvalidCredentials] = useState(false);

    const emailChangeHandler = event => {
        setEnteredEmail(event.target.value);
    };

    const validateEmail = () => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        setValidEmail(re.test(String(enteredEmail).toLowerCase()));
    };

    const passwordChangeHandler = (event) => {
        setEnteredPassword(event.target.value);
    }

    const validatePassword = () => {
        setValidPassword(enteredPassword.length >= 8);
    };

    const validateForm = () => {
        validateEmail();
        validatePassword();
    };

    const loginHandler = (event) => {
        event.preventDefault();
        validateForm();
        if (validEmail && validPassword) {
            // TODO: fetch login API and check validity of credentials
            setInvalidCredentials(true);
        }

    }

    return (
        <Form className={`${styles.loginForm}`}>
            {invalidCredentials && errors.invalidCredentials}
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                    id={'emailField'}
                    type="email"
                    placeholder="Wprowadź email"
                    onBlur={validateEmail}
                    onChange={emailChangeHandler}
                    value={enteredEmail}
                />
                {!validEmail && errors.invalidEmail}
            </Form.Group>
            <Form.Group>
                <Form.Label>Hasło</Form.Label>
                <Form.Control
                    id={'passwordField'}
                    type="password"
                    placeholder="Hasło"
                    onBlur={validatePassword}
                    onChange={passwordChangeHandler}
                    value={enteredPassword}
                />
                {!validPassword && errors.tooShortPassword}
            </Form.Group>
            <Form.Group>
                <Form.Check type="checkbox" label="Zapamiętaj mnie"/>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={loginHandler}>
                Zaloguj
            </Button>

        </Form>
    )
};

export default Login;