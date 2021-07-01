import React, {useState} from 'react';

import {Button, Form} from "react-bootstrap";

import styles from "./BaseRegister.module.css";
import RegisterConfirmation from "./RegisterConfirmation";

const BaseRegister = (props) => {


    const [validEmail, setValidEmail] = useState(true);
    const [validPassword, setValidPassword] = useState(true);
    const [matchingPasswords, setMatchingPasswords] = useState(true);
    const [showRegisterForm, setShowRegisterForm] = useState(true);

    const [enteredFirstName, setEnteredFirstName] = useState('');
    const [enteredLastName, setEnteredLastName] = useState('');
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [enteredPasswordConfirm, setEnteredPasswordConfirm] = useState('');

    const [firstNameEmpty, setFirstNameEmpty] = useState(false);
    const [lastNameEmpty, setLastNameEmpty] = useState(false);
    const [emailEmpty, setEmailEmpty] = useState(false);
    const [passwordFieldEmpty, setPasswordFieldEmpty] = useState(false);
    const [passwordConfEmpty, setPasswordConfEmpty] = useState(false);

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
            <small className={styles.invalid}>Podane hasła różnią się od siebie</small>,
        emptyField:
            <small className={styles.invalid}>To pole nie może być puste.</small>
    }

    const changeFirstNameFieldHandler = (event) => {
        setEnteredFirstName(event.target.value);
        setFirstNameEmpty(false);
    };

    const changeLastNameFieldHandler = (event) => {
        setEnteredLastName(event.target.value);
        setLastNameEmpty(false);
    };

    const changeEmailFieldHandler = (event) => {
        setEnteredEmail(event.target.value);
        setEmailEmpty(false);
    };

    const changePasswordFieldHandler = (event) => {
        setEnteredPassword(event.target.value);
        setPasswordFieldEmpty(false);
    };

    const changePasswordConfirmFieldHandler = (event) => {
        setEnteredPasswordConfirm(event.target.value);
        setPasswordConfEmpty(false);
    };

    const validateEmail = () => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        setValidEmail(re.test(String(enteredEmail).toLowerCase()));
    };

    const validatePassword = () => {
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        setValidPassword(re.test(String(enteredPassword)));
    };

    const validateConfirmPassword = () => {
        setMatchingPasswords(enteredPassword === enteredPasswordConfirm);
    };

    const registerHandler = (event) => {
        // TODO: Check if email already exists in database
        event.preventDefault();
        if ([enteredFirstName, enteredLastName, enteredEmail, enteredPassword, enteredPasswordConfirm]
            .some(it => it.length === 0)) {
            setFirstNameEmpty(enteredFirstName === '');
            setLastNameEmpty(enteredLastName === '');
            setEmailEmpty(enteredEmail === '');
            setPasswordFieldEmpty(enteredPassword === '');
            setPasswordConfEmpty(enteredPasswordConfirm === '');
        } else {
            setShowRegisterForm(false);
        }
    };


    return (
        <>
            {showRegisterForm ?
                <Form className={`${styles.registerForm}`}>
                    <Form.Group className={`my-0`}>
                        <Form.Label>Imię</Form.Label>
                        <Form.Control
                            id={'firstNameField'}
                            placeholder="Twoje imię"
                            onChange={changeFirstNameFieldHandler}
                            value={enteredFirstName}
                        />
                        {firstNameEmpty && errors.emptyField}
                    </Form.Group>
                    <Form.Group className={`my-0`}>
                        <Form.Label>Nazwisko</Form.Label>
                        <Form.Control
                            id={'lastNameField'}
                            placeholder="Twoje nazwisko"
                            onChange={changeLastNameFieldHandler}
                            value={enteredLastName}
                        />
                        {lastNameEmpty && errors.emptyField}
                    </Form.Group>
                    <Form.Group className={`my-0`}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            id={'emailField'}
                            type="email"
                            placeholder="Wprowadź email"
                            onChange={changeEmailFieldHandler}
                            onBlur={validateEmail}
                            value={enteredEmail}
                        />
                        {emailEmpty && errors.emptyField}
                        {(!validEmail && !emailEmpty) && errors.invalidEmail}
                    </Form.Group>
                    <Form.Group className={`my-0`}>
                        <Form.Label>Hasło</Form.Label>
                        <Form.Control
                            id={'passwordField'}
                            type="password"
                            placeholder="Hasło"
                            onBlur={validatePassword}
                            onChange={changePasswordFieldHandler}
                            value={enteredPassword}
                        />
                        {passwordFieldEmpty && errors.emptyField}
                        {(!validPassword && !passwordFieldEmpty) && errors.unsecurePassword}
                    </Form.Group>
                    <Form.Group className={`my-0`}>
                        <Form.Label>Powtórz hasło</Form.Label>
                        <Form.Control
                            id={'confirmPasswordField'}
                            type="password"
                            placeholder="Powtórz hasło"
                            onBlur={validateConfirmPassword}
                            onChange={changePasswordConfirmFieldHandler}
                            value={enteredPasswordConfirm}
                        />
                        {passwordConfEmpty && errors.emptyField}
                        {(!matchingPasswords && !passwordConfEmpty) && errors.differentPasswords}
                    </Form.Group>
                    <div className={`mb-1`}>
                        <small>
                            Chcesz zaoferować swoje usługi? Skorzystaj z
                            <span className={styles.actLink} onClick={props.providerRegisterHandler}> rejestracji dla usługodawców.</span>
                        </small>
                    </div>

                    <Button variant="primary" type="submit" onClick={registerHandler}>
                        Zarejestruj
                    </Button>
                </Form> :
                <RegisterConfirmation />
            }
        </>
    )
}

export default BaseRegister;