import React, {useState} from 'react';
import axios from 'axios';
import {API_BASE_URL} from '../../constants/ApiConstants.js';
import {Button, Form} from "react-bootstrap";

import styles from './Login.module.css';
import AuthConfirmation from "./AuthConfirmation";

const Login = (props) => {

    const errors = {
        invalidEmail: <small className={styles.invalid}>Nieprawidłowy adres email</small>,
        tooShortPassword: <small className={styles.invalid}>Podane hasło jest zbyt krótkie</small>,
        invalidCredentials: <div className={`${styles.invalidCred} ${styles.invalid}`}>Niepoprawny email i/lub
            hasło</div>,
        emptyField: <small className={styles.invalid}>To pole nie może być puste.</small>
    }

    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');

    const [validEmail, setValidEmail] = useState(true);
    const [validPassword, setValidPassword] = useState(true);
    const [invalidCredentials, setInvalidCredentials] = useState(false);
    const [logging, setLogging] = useState(false);
    const [emptyEmailField, setEmptyEmailField] = useState(false);
    const [emptyPasswordField, setEmptyPasswordField] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    const emailChangeHandler = event => {
        setEnteredEmail(event.target.value);
        setEmptyEmailField(false);
    };

    const validateEmail = () => {
        setEmptyEmailField(false);
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        setValidEmail(re.test(String(enteredEmail).toLowerCase()));
    };

    const passwordChangeHandler = (event) => {
        setEnteredPassword(event.target.value);
        setEmptyPasswordField(false);
    }

    const validatePassword = () => {
        setEmptyPasswordField(false);
        setValidPassword(enteredPassword.length >= 8);
    };


    const loginHandler = (event) => {
        event.preventDefault();
        validatePassword();
        validateEmail();
        setLogging(true);
        if (enteredPassword.length === 0 || enteredEmail.length === 0) {
            setEmptyPasswordField(enteredPassword.length === 0);
            setEmptyEmailField(enteredEmail.length === 0);
        } else if (validEmail && validPassword) {
            axios.post(API_BASE_URL + "api/v1/auth/signin", {
                email: enteredEmail,
                password: enteredPassword
            }, {
                headers: {
                    // "Content-Type": "application/x-www-form-urlencoded"
                    "Content-Type": "application/json"
                }
            })
                .then(user => {
                    setInvalidCredentials(false);
                    localStorage.setItem("logged", "1");
                    localStorage.setItem("userId", user.data.id)
                    localStorage.setItem("userRoles", user.data.roles)
                    localStorage.setItem("userToken", user.data.token)
                    setLoggedIn(true);
                })
                .catch(error => {
                    if (error.response.status === 401) {
                        setInvalidCredentials(true);
                        setLogging(false);
                    }
                })
        }
    };


    return (
        !logging ?
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
                    {emptyEmailField && errors.emptyField}
                    {(!validEmail && !emptyEmailField) && errors.invalidEmail}
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
                    {emptyPasswordField && errors.emptyField}
                    {(!validPassword && !emptyPasswordField) && errors.tooShortPassword}
                </Form.Group>
                <Form.Group>
                    <Form.Check type="checkbox" label="Zapamiętaj mnie" className={styles.checkbox}/>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={loginHandler}>
                    Zaloguj
                </Button>

            </Form>
            :
            <AuthConfirmation title={"Zalogowano pomyślnie"} spinner={!loggedIn}>
                Okno zamknie się samo za kilka sekund.
            </AuthConfirmation>
    )
};

export default Login;