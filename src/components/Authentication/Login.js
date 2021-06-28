import React, {useState} from 'react';

import {Button, Form} from "react-bootstrap";

import styles from './Login.module.css';


const Login = () => {

    const errors = {
        invalidEmail: <small className={styles.invalid}>Nieprawidłowy adres email</small>,
        tooShortPassword: <small className={styles.invalid}>Podane hasło jest zbyt krótkie</small>
    }

    const [validEmail, setValidEmail] = useState(true);
    const [validPassword, setValidPassword] = useState(true);

    const validateEmail = event => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        setValidEmail(re.test(String(event.target.value).toLowerCase()));
    };

    const validatePassword = event => {
        setValidPassword(event.target.value.length >= 8);
    };

    return (
        <Form className={styles.loginForm}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Wprowadź email" onChange={validateEmail}/>
                    {!validEmail && errors.invalidEmail}
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Hasło</Form.Label>
                <Form.Control type="password" placeholder="Hasło" onChange={validatePassword} />
                {!validPassword && errors.tooShortPassword}
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Zapamiętaj mnie"/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Zaloguj
            </Button>
        </Form>
    )
};

export default Login;