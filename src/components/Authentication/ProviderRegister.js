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
            <small className={styles.invalid}>To pole nie może być puste.</small>,
        invalidPostCode:
            <small className={styles.invalid}>Nieprawidłowy kod.</small>,
        invalidNIPNumber:
            <small className={styles.invalid}>Nieprawidłowy numer NIP.</small>
    }

    const [pageVisible, setPageVisible] = useState("second");

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

    const [validPostCode, setValidPostCode] = useState(true);
    const [validNIPNumber, setValidNIPNumber] = useState(true);

    const [emptyCompanyName, setEmptyCompanyName] = useState(false);
    const [emptyNIPNumber, setEmptyNIPNumber] = useState(false);
    const [emptyPostCode, setEmptyPostCode] = useState(false);
    const [emptyCity, setEmptyCity] = useState(false);
    const [emptyAddress, setEmptyAddress] = useState(false);
    const [emptyPhoneNumber, setEmptyPhoneNumber] = useState(false);

    const [enteredCompanyName, setEnteredCompanyName] = useState('');
    const [enteredNIPNumber, setEnteredNIPNumber] = useState('');
    const [enteredPostCode, setEnteredPostCode] = useState('');
    const [enteredCity, setEnteredCity] = useState('');
    const [enteredAddress, setEnteredAddress] = useState('');
    const [enteredPhoneNumber, setEnteredPhoneNumber] = useState('');

    const changeCompanyNameHandler = (event) => {
        setEnteredCompanyName(event.target.value);
        setEmptyCompanyName(false);
    };

    const changeNIPNumberHandler = (event) => {
        setEnteredNIPNumber(event.target.value);
        setEmptyNIPNumber(false);
    };

    const changePostCodeHandler = (event) => {
        setEnteredPostCode(event.target.value);
        setEmptyPostCode(false);
    };

    const changeCityHandler = (event) => {
        setEnteredCity(event.target.value);
        setEmptyCity(false);
    };

    const changeAddressHandler = (event) => {
        setEnteredAddress(event.target.value);
        setEmptyAddress(false);
    };

    const changePhoneNumberHandler = (event) => {
        setEnteredPhoneNumber(event.target.value);
        setEmptyPhoneNumber(false);
    };

    const validatePostCode = () => {
        const re = /^([0-9]{2})(-[0-9]{3})?$/;
        setValidPostCode(re.test(String(enteredPostCode)));
    };

    const validateNIPNumber = () => {
        const re = /^(\d{10})$/;
        setValidNIPNumber(re.test(String(enteredNIPNumber)));
    };

    const validateSecondPage = () => {
        const fields = [enteredCompanyName, enteredNIPNumber, enteredPostCode, enteredCity, enteredAddress, enteredPhoneNumber]
        validatePostCode();
        validateNIPNumber();
        if (fields.some(field => field.trim().length === 0)) {
            setEmptyCompanyName(enteredCompanyName.trim() === '');
            setEmptyNIPNumber(enteredNIPNumber.trim() === '');
            setEmptyCity(enteredCity.trim() === '');
            setEmptyAddress(enteredAddress.trim() === '');
            setEmptyPostCode(enteredPostCode.trim() === '');
            setEmptyPhoneNumber(enteredPhoneNumber.trim() === '');
        } else if (validPostCode && validNIPNumber) {
            setPageVisible("third");
        }
    };

    const SecondPage = () => {
        return (
            <>
                <Form.Group>
                    <Form.Label>Nazwa firmy</Form.Label>
                    <Form.Control
                        id={'companyNameField'}
                        placeholder="Nazwa firmy"
                        value={enteredCompanyName}
                        onChange={changeCompanyNameHandler}
                    />
                    {emptyCompanyName && errors.emptyField}
                </Form.Group>
                <Form.Group>
                    <Form.Label>NIP</Form.Label>
                    <Form.Control
                        id={'NIPNumberField'}
                        placeholder="NIP firmy"
                        value={enteredNIPNumber}
                        onChange={changeNIPNumberHandler}
                        onBlur={validateNIPNumber}
                    />
                    {emptyNIPNumber && errors.emptyField}
                    {(!validNIPNumber && !emptyNIPNumber) && errors.invalidNIPNumber}
                </Form.Group>
                <Form.Group className={`px-3 row`}>
                    <div className="col-4 p-0">
                        <Form.Label>Kod pocztowy</Form.Label>
                        <Form.Control
                            id={'postCodeField'}
                            placeholder="Kod"
                            value={enteredPostCode}
                            onChange={changePostCodeHandler}
                            onBlur={validatePostCode}
                        />
                        {emptyPostCode && errors.emptyField}
                        {(!validPostCode && !emptyPostCode) && errors.invalidPostCode}
                    </div>
                    <div className={"col-8 pr-0"}>
                        <div className="p-0">
                            <Form.Label>Miejscowość</Form.Label>
                            <Form.Control
                                id={'cityField'}
                                placeholder="Miejscowość"
                                value={enteredCity}
                                onChange={changeCityHandler}
                            />
                            {emptyCity && errors.emptyField}
                        </div>
                    </div>

                </Form.Group>
                <Form.Group>
                    <Form.Label>Ulica i numer domu</Form.Label>
                    <Form.Control
                        id={'addressField'}
                        placeholder="Ulica i numer domu"
                        value={enteredAddress}
                        onChange={changeAddressHandler}
                    />
                    {emptyAddress && errors.emptyField}
                </Form.Group>
                <Form.Group>
                    <Form.Label>Numer telefonu</Form.Label>
                    <Form.Control
                        id={'phoneNumberField'}
                        placeholder="Numer telefonu"
                        value={enteredPhoneNumber}
                        onChange={changePhoneNumberHandler}
                    />
                    {emptyPhoneNumber && errors.emptyField}
                </Form.Group>
                <div className={`d-flex justify-content-between`}>
                    <Button variant="primary" className={styles.btnPages} onClick={() => setPageVisible('first')}>
                        Poprzedni
                    </Button>
                    <Button variant="primary" className={styles.btnPages} onClick={validateSecondPage}>
                        Następny
                    </Button>
                </div>
            </>
        )
    }

    // ====================================
    //             THIRD PAGE
    // ====================================

    const ThirdPage = () => {
      return (
          <div>
              WORKS
          </div>
      )
    };

    const page = {
        "first": FirstPage,
        "second": SecondPage,
        "third": ThirdPage
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