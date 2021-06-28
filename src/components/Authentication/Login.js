import React from 'react';

import {Button, Form} from "react-bootstrap";

import styles from './Login.module.css';

const Login = () => {
    return (
        <Form className={styles.loginForm}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Wprowadź email"/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Hasło</Form.Label>
                <Form.Control type="password" placeholder="Hasło"/>
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Zapamiętaj"/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Zaloguj
            </Button>
        </Form>
    )

};

export default Login;