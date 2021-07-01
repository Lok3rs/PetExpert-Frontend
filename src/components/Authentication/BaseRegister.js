import React, {useState} from 'react';

import {Button, Form} from "react-bootstrap";

import styles from "./BaseRegister.module.css";

const BaseRegister = () => {

    const passwordField = document.getElementById("passwordField");
    const confirmPasswordField = document.getElementById("confirmPasswordField");
    const emailField = document.getElementById('emailField');

    const [validEmail, setValidEmail] = useState(true);
    const [validPassword, setValidPassword] = useState(true);
    const [matchingPasswords, setMatchingPasswords] = useState(true);
    const [registerAllowed, setRegisterAllowed] = useState(false);

    const errors = {
        invalidEmail:
            <small className={styles.invalid}>Niepoprawny adres email</small>,
        emailAlreadyExists:
            <small className={styles.invalid}>Ten email istnieje już w bazie danych</small>,
        unsecurePassword:
            <small className={styles.invalid}>
                Hasło musi zawierać przynajmniej 8 znaków w tym jedną małą i wielką literę, cyfrę oraz znak specjalny
            </small>,
        differentPasswords:
            <small className={styles.invalid}>Podane hasła różnią się od siebie</small>
    }

    const validateEmail = (event) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        setValidEmail(re.test(String(event.target.value).toLowerCase()));
    };

    const validatePassword = (event) => {
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        setValidPassword(re.test(String(event.target.value)));
    };

    const validateConfirmPassword = () => {
        setMatchingPasswords(passwordField.value === confirmPasswordField.value);
    };

    const allowRegisterHandler = () => {
        // TODO: MAKE IT WORKING ASYNCHRONOUSLY !!!!
        setRegisterAllowed(
            passwordField != null && confirmPasswordField != null && emailField != null &&
            validEmail && validPassword && matchingPasswords
        );
    }


    return (
        <Form className={`${styles.registerForm}`} onChange={allowRegisterHandler}>
            <Form.Group>
                <Form.Label>Imię</Form.Label>
                <Form.Control required id={'firstNameField'} type="email" placeholder="Twoje imię"/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Nazwisko</Form.Label>
                <Form.Control required id={'lastNameField'} type="email" placeholder="Twoje nazwisko"/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control id={'emailField'} type="email" placeholder="Wprowadź email" onChange={validateEmail}/>
                {!validEmail && errors.invalidEmail}
            </Form.Group>
            <Form.Group>
                <Form.Label>Hasło</Form.Label>
                <Form.Control id={'passwordField'} type="password" placeholder="Hasło" onChange={validatePassword}/>
                {!validPassword && errors.unsecurePassword}
            </Form.Group>
            <Form.Group className={`mb-0`}>
                <Form.Label>Powtórz hasło</Form.Label>
                <Form.Control id={'confirmPasswordField'} type="password" placeholder="Powtórz hasło"
                              onChange={validateConfirmPassword}/>
                {!matchingPasswords && errors.differentPasswords}
            </Form.Group>
            <div className={`mb-1`}>
                <small>
                    Chcesz zaoferować swoje usługi? Skorzystaj z
                    <span className={styles.actLink}> rejestracji dla usługodawców.</span>
                </small>
            </div>

            <Button variant="primary" type="submit" disabled={!registerAllowed}>
                Zarejestruj
            </Button>
        </Form>
    )
};

export default BaseRegister;