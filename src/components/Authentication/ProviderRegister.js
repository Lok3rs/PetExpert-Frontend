import React, {useState} from 'react';

import styles from './ProviderRegister.module.css';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {Button, Form} from "react-bootstrap";

const ProviderRegister = (props) => {

    const errors = {
        invalidEmail:
            <small className={`${styles.invalid}`}>Niepoprawny adres email</small>,
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

    const [pageVisible, setPageVisible] = useState("first");

    // ====================================
    //             FIRST PAGE
    // ====================================

    const [enteredFirstName, setEnteredFirstName] = useState('');
    const [enteredLastName, setEnteredLastName] = useState('');
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [enteredPasswordConf, setEnteredPasswordConf] = useState('');

    const [emptyFirstName, setEmptyFirstName] = useState(false);
    const [emptyLastName, setEmptyLastName] = useState(false);
    const [emptyEmail, setEmptyEmail] = useState(false);
    const [emptyPassword, setEmptyPassword] = useState(false);
    const [emptyPasswordConf, setEmptyPasswordConf] = useState(false);

    const [validEmail, setValidEmail] = useState(true);
    const [validPassword, setValidPassword] = useState(true);
    const [matchingPasswords, setMatchingPasswords] = useState(true);

    const changeFirstNameHandler = (event) => {
        setEnteredFirstName(event.target.value);
        setEmptyFirstName(false);
    };

    const changeLastNameHandler = (event) => {
        setEnteredLastName(event.target.value);
        setEmptyLastName(false);
    };

    const changeEmailHandler = (event) => {
        setEnteredEmail(event.target.value);
        setEmptyEmail(false);
    };

    const changePasswordHandler = (event) => {
        setEnteredPassword(event.target.value);
        setEmptyPassword(false);
    }

    const changePasswordConfHandler = (event) => {
        setEnteredPasswordConf(event.target.value);
        setEmptyPasswordConf(false);
    }

    const validateEmail = () => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        setValidEmail(re.test(String(enteredEmail).toLowerCase()));
    };

    const validatePassword = () => {
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        setValidPassword(re.test(String(enteredPassword)));
    };

    const validateConfirmPassword = () => {
        setMatchingPasswords(enteredPassword === enteredPasswordConf);
    };

    const validateFirstPage = () => {
        validateEmail();
        validatePassword();
        validateConfirmPassword();
        if ([enteredFirstName, enteredLastName, enteredEmail, enteredEmail, enteredPassword, enteredPasswordConf]
            .some(el => el.length === 0)) {
            setEmptyFirstName(enteredFirstName.length === 0);
            setEmptyLastName(enteredLastName.length === 0);
            setEmptyEmail(enteredEmail.length === 0);
            setEmptyPassword(enteredPassword.length === 0);
            setEmptyPasswordConf(enteredPasswordConf.length === 0);
        } else if (validPassword && validEmail && matchingPasswords) {
            setPageVisible('second');
        }
    }

    const FirstPage = () => {
        return (
            <>
                <Form.Group>
                    <Form.Label>Imię</Form.Label>
                    <Form.Control
                        id={'firstNameField'}
                        placeholder="Twoje imię"
                        value={enteredFirstName}
                        onChange={changeFirstNameHandler}
                    />
                    {emptyFirstName && errors.emptyField}
                </Form.Group>
                <Form.Group>
                    <Form.Label>Nazwisko</Form.Label>
                    <Form.Control
                        id={'lastNameField'}
                        placeholder="Twoje nazwisko"
                        value={enteredLastName}
                        onChange={changeLastNameHandler}
                    />
                    {emptyLastName && errors.emptyField}
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        id={'emailField'}
                        type="email"
                        placeholder="Wprowadź email"
                        value={enteredEmail}
                        onChange={changeEmailHandler}
                        onBlur={validateEmail}
                    />
                    {emptyEmail && errors.emptyField}
                    {(!validEmail && !emptyEmail) && errors.invalidEmail}
                </Form.Group>
                <Form.Group>
                    <Form.Label>Hasło</Form.Label>
                    <Form.Control
                        id={'passwordField'}
                        type="password"
                        placeholder="Hasło"
                        value={enteredPassword}
                        onChange={changePasswordHandler}
                        onBlur={validatePassword}
                    />
                    {emptyPassword && errors.emptyField}
                    {(!validPassword && !emptyPassword) && errors.unsecurePassword}
                </Form.Group>
                <Form.Group>
                    <Form.Label>Powtórz hasło</Form.Label>
                    <Form.Control
                        id={'confirmPasswordField'}
                        type="password"
                        placeholder="Powtórz hasło"
                        value={enteredPasswordConf}
                        onChange={changePasswordConfHandler}
                        onBlur={validateConfirmPassword}
                    />
                    {emptyPasswordConf && errors.emptyField}
                    {(!matchingPasswords && !emptyPasswordConf) && errors.differentPasswords}
                </Form.Group>
                <div className={`text-right`}>
                    <Button variant="primary" className={styles.btnPages} onClick={validateFirstPage}>
                        Następny
                    </Button>
                </div>
            </>
        );
    };

    // ====================================
    //             SECOND PAGE
    // ====================================

    const SecondPage = () => {
        return (
            <div>

            </div>
        )
    }

    const page = {
        "first": FirstPage,
        "second": SecondPage
    };

    return (
        <div className={`${styles.wrapper}`}>
            <div className={`text-right pr-3 mb-0 pb-0`}>
                <FontAwesomeIcon icon={faTimes} onClick={props.closeForm}/>
            </div>
            <header className={`text-center pb-2 mt-0 ${styles.header}`}>
                <h4>Rejestracja dla usługodawców</h4>
            </header>
            <Form className={`px-2 pt-3`}>
                {page[pageVisible]()}
            </Form>
        </div>
    )
};

export default ProviderRegister;