import React, {useState} from 'react';

import styles from './ProviderRegister.module.css';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {Button, Form, Dropdown, DropdownButton} from "react-bootstrap";

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
            <small className={styles.invalid}>Nieprawidłowy numer NIP.</small>,
        noServicesSelected:
            <small className={styles.invalid}>Musisz wybrać przynajmniej jedno pole.</small>
    }

    const [pageVisible, setPageVisible] = useState("third");

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
            .some(el => el.trim().length === 0)) {
            setEmptyFirstName(enteredFirstName.trim().length === 0);
            setEmptyLastName(enteredLastName.trim().length === 0);
            setEmptyEmail(enteredEmail.trim().length === 0);
            setEmptyPassword(enteredPassword.trim().length === 0);
            setEmptyPasswordConf(enteredPasswordConf.trim().length === 0);
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
    const [emptyStreet, setEmptyAddress] = useState(false);
    const [emptyPhoneNumber, setEmptyPhoneNumber] = useState(false);
    const [emptyHouseNumber, setEmptyHouseNumber] = useState(false);

    const [enteredCompanyName, setEnteredCompanyName] = useState('');
    const [enteredNIPNumber, setEnteredNIPNumber] = useState('');
    const [enteredPostCode, setEnteredPostCode] = useState('');
    const [enteredCity, setEnteredCity] = useState('');
    const [enteredStreet, setEnteredAddress] = useState('');
    const [enteredPhoneNumber, setEnteredPhoneNumber] = useState('');
    const [enteredHouseNumber, setEnteredHouseNumber] = useState('');
    const [enteredApartNumber, setEnteredApartNumber] = useState('');

    const changeCompanyNameHandler = (event) => {
        setEnteredCompanyName(event.target.value);
        setEmptyCompanyName(false);
    };

    const changeNIPNumberHandler = (event) => {
        setEnteredNIPNumber(event.target.value);
        setEmptyNIPNumber(false);
    };

    const changeApartNumberHandler = (event) => {
        setEnteredApartNumber(event.target.value);
    };

    const changePostCodeHandler = (event) => {
        setEnteredPostCode(event.target.value);
        setEmptyPostCode(false);
    };

    const changeHouseNumberHandler = (event) => {
        setEnteredHouseNumber(event.target.value);
        setEmptyHouseNumber(false);
    };

    const changeCityHandler = (event) => {
        setEnteredCity(event.target.value);
        setEmptyCity(false);
    };

    const changeStreetHandler = (event) => {
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
        const fields = [enteredCompanyName, enteredHouseNumber, enteredNIPNumber, enteredPostCode, enteredCity, enteredStreet, enteredPhoneNumber]
        validatePostCode();
        validateNIPNumber();
        if (fields.some(field => field.trim().length === 0)) {
            setEmptyCompanyName(enteredCompanyName.trim() === '');
            setEmptyNIPNumber(enteredNIPNumber.trim() === '');
            setEmptyCity(enteredCity.trim() === '');
            setEmptyAddress(enteredStreet.trim() === '');
            setEmptyPostCode(enteredPostCode.trim() === '');
            setEmptyPhoneNumber(enteredPhoneNumber.trim() === '');
            setEmptyHouseNumber(enteredHouseNumber.trim() === '');
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
                    <Form.Label>Ulica</Form.Label>
                    <Form.Control
                        id={'addressField'}
                        placeholder="Nazwa ulicy"
                        value={enteredStreet}
                        onChange={changeStreetHandler}
                    />
                    {emptyStreet && errors.emptyField}
                </Form.Group>
                <Form.Group className={`px-3 row`}>
                    <div className="col-6 pl-0">
                        <Form.Label>Numer domu</Form.Label>
                        <Form.Control
                            id={'houseNumberField'}
                            placeholder="Numer domu"
                            value={enteredHouseNumber}
                            onChange={changeHouseNumberHandler}
                        />
                        {emptyHouseNumber && errors.emptyField}
                    </div>
                    <div className={"col-6 pr-0"}>
                        <div className="p-0">
                            <Form.Label>Numer lokalu</Form.Label>
                            <Form.Control
                                id={'apartNumberField'}
                                placeholder="Numer lokalu"
                                value={enteredApartNumber}
                                onChange={changeApartNumberHandler}
                            />
                        </div>
                    </div>
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

    const services = ["Behawiorystyka", "Hotel dla zwierząt / Petsitting", "Grooming", "Weterynaria"]

    const servicesCodes = {
        "Behawiorystyka": 1,
        "Hotel dla zwierząt / Petsitting": 2,
        "Grooming": 3,
        "Weterynaria": 4
    }

    const [validServicePostCode, setValidServicePostCode] = useState(true);

    const [selectedServices, setSelectedServices] = useState(true);
    const [emptyServicePostCode, setEmptyServicePostCode] = useState(false);
    const [emptyServiceCity, setEmptyServiceCity] = useState(false);
    const [emptyServiceStreetName, setEmptyServiceStreetName] = useState(false);
    const [emptyServiceHouseNumber, setEmptyServiceHouseNumber] = useState(false);

    const [chosenServices, setChosenServices] = useState([]);
    const [servicePostCode, setServicePostCode] = useState('');
    const [serviceCity, setServiceCity] = useState('');
    const [serviceStreetName, setServiceAddress] = useState('');
    const [additionalInfo, setAdditionalInfo] = useState('');
    const [sameCredentials, setSameCredentials] = useState(false);
    const [serviceHouseNumber, setServiceHouseNumber] = useState('');
    const [serviceApartNumber, setServiceApartNumber] = useState('');

    const changeServicePostCodeHandler = (event) => {
        setServicePostCode(event.target.value);
        setEmptyServicePostCode(false);
    };

    const changeServiceHouseNumberHandler = (event) => {
        setServiceHouseNumber(event.target.value);
        setEmptyServiceHouseNumber(false);
        setSameCredentials(false);
    };

    const changeServiceApartNumberHandler = (event) => {
        setServiceApartNumber(event.target.value);
        setSameCredentials(false);
    };

    const validateServicePostCode = () => {
        const re = /^([0-9]{2})(-[0-9]{3})?$/;
        setValidServicePostCode(re.test(String(servicePostCode)));
        setEmptyServicePostCode(false);
        setSameCredentials(false);
    };

    const changeServiceCityHandler = (event) => {
        setServiceCity(event.target.value);
        setEmptyServiceCity(false);
        setSameCredentials(false);
    };

    const changeServiceStreetNameHandler = (event) => {
        setServiceAddress(event.target.value);
        setEmptyServiceStreetName(false);
        setSameCredentials(false);
    };

    const changeAdditionalInfoHandler = (event) => {
        setAdditionalInfo(event.target.value);
    };

    const chooseServiceHandler = (event) => {
        if (event.target.checked) {
            setSelectedServices(true);
            setChosenServices([...chosenServices, event.target.value]);
        } else {
            setChosenServices(chosenServices.filter(service => {
                return service !== event.target.value;
            }));
        }
    };

    const fillAddressCredentials = (event) => {
        setSameCredentials(event.target.checked);
        setServiceAddress(enteredStreet);
        setServiceCity(enteredCity);
        setServicePostCode(enteredPostCode);
        setServiceHouseNumber(enteredHouseNumber);
        setServiceApartNumber(enteredApartNumber);
    };

    const validateSelectedServices = () => {
        setSelectedServices(chosenServices.length > 0);
    };

    const validateThirdPage = () => {
        validateSelectedServices();
        const fields = [servicePostCode, serviceCity, serviceStreetName, serviceHouseNumber]

        if (fields.some(field => field.trim().length === 0)) {
            setEmptyServicePostCode(servicePostCode.trim() === '');
            setEmptyServiceCity(serviceCity.trim() === '');
            setEmptyServiceStreetName(serviceStreetName.trim() === '');
            setEmptyServiceHouseNumber(serviceHouseNumber.trim() === '');
        } else {
            setPageVisible('confirm')
        }
    };

    const ThirdPage = () => {
        return (
            <>
                <Form.Group>
                    <Form.Label>
                        Oferowane usługi
                    </Form.Label>
                    <DropdownButton variant={`secondary`} title={"Wybierz"} onBlur={validateSelectedServices}>
                        {services.map((service) => {
                            return (
                                <Dropdown key={service} className={`dropdown`}>
                                    <label className={`px-2`}>
                                        <Form.Check
                                            type="checkbox"
                                            value={servicesCodes[service]}
                                            className={'mr-1 d-inline'}
                                            onChange={chooseServiceHandler}
                                            checked={chosenServices.some(serv => serv === String(servicesCodes[service]))}
                                        />
                                        {service}
                                    </label>
                                </Dropdown>
                            )
                        })}
                    </DropdownButton>
                    {!selectedServices && errors.noServicesSelected}
                </Form.Group>
                <Form.Group>
                    <Form.Label>Miejsce oferowanych usług</Form.Label>
                    <Form.Check
                        type="checkbox"
                        label={"Takie same jak firmy"}
                        className={"ml-4"}
                        onChange={fillAddressCredentials}
                        checked={sameCredentials}
                    />
                    {emptyNIPNumber && errors.emptyField}
                    {(!validNIPNumber && !emptyNIPNumber) && errors.invalidNIPNumber}
                </Form.Group>
                <Form.Group className={`px-3 row`}>
                    <div className="col-4 p-0">
                        <Form.Label>Kod pocztowy</Form.Label>
                        <Form.Control
                            id={'servicePostCodeField'}
                            placeholder="Kod"
                            value={servicePostCode}
                            onChange={changeServicePostCodeHandler}
                            onBlur={validateServicePostCode}
                        />
                        {emptyServicePostCode && errors.emptyField}
                        {(!validServicePostCode && !emptyServicePostCode) && errors.invalidPostCode}
                    </div>
                    <div className={"col-8 pr-0"}>
                        <div className="p-0">
                            <Form.Label>Miejscowość</Form.Label>
                            <Form.Control
                                id={'serviceCityField'}
                                placeholder="Miejscowość"
                                value={serviceCity}
                                onChange={changeServiceCityHandler}
                            />
                            {emptyServiceCity && errors.emptyField}
                        </div>
                    </div>

                </Form.Group>
                <Form.Group>
                    <Form.Label>Ulica</Form.Label>
                    <Form.Control
                        id={'serviceAddressField'}
                        placeholder="Ulica"
                        value={serviceStreetName}
                        onChange={changeServiceStreetNameHandler}
                    />
                    {emptyServiceStreetName && errors.emptyField}
                </Form.Group>
                <Form.Group className={`px-3 row`}>
                    <div className="col-6 pl-0">
                        <Form.Label>Numer domu</Form.Label>
                        <Form.Control
                            id={'houseServiceNumberField'}
                            placeholder="Numer domu"
                            value={serviceHouseNumber}
                            onChange={changeServiceHouseNumberHandler}
                        />
                        {emptyServiceHouseNumber && errors.emptyField}
                    </div>
                    <div className={"col-6 pr-0"}>
                        <div className="p-0">
                            <Form.Label>Numer lokalu</Form.Label>
                            <Form.Control
                                id={'apartServiceNumberField'}
                                placeholder="Numer lokalu"
                                value={serviceApartNumber}
                                onChange={changeServiceApartNumberHandler}
                            />
                        </div>
                    </div>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Dodatkowe informacje do administracji strony (opcjonalnie)</Form.Label>
                    <Form.Control
                        as={'textarea'}
                        id={'additionalInfoField'}
                        value={additionalInfo}
                        onChange={changeAdditionalInfoHandler}
                    />
                </Form.Group>
                <div className={`d-flex justify-content-between pb-2`}>
                    <Button variant="primary" className={styles.btnPages} onClick={() => setPageVisible('second')}>
                        Poprzedni
                    </Button>
                    <Button variant="primary" className={styles.btnPages} onClick={validateThirdPage}>
                        Następny
                    </Button>
                </div>
            </>
        )
    };

    // ====================================
    //             CONFIRM PAGE
    // ====================================

    const ConfirmPage = () => {
        return (
            <>
                <h2 className={'text-center border-bottom pt-0 pb-2'}>Twoje dane</h2>
                <p className={`my-1`}><strong>Imię:</strong> {enteredFirstName}</p>
                <p className={`my-1`}><strong>Nazwisko:</strong> {enteredLastName}</p>
                <p className={`my-1`}><strong>Email:</strong> {enteredEmail}</p>
                <p className={`my-1`}><strong>Numer telefonu:</strong> {enteredPhoneNumber}</p>

                <h2 className={'text-center border-bottom border-top py-2'}>Dane firmy</h2>
                <p className={`my-1`}><strong>Nazwa firmy:</strong> {enteredCompanyName}</p>
                <p className={`my-1`}><strong>NIP:</strong> {enteredNIPNumber}</p>
                <p className={`my-1`}><strong>Kod pocztowy:</strong> {enteredPostCode}</p>
                <p className={`my-1`}><strong>Miejscowość:</strong> {enteredCity}</p>
                <p className={`my-1`}>
                    <strong>Ulica i numer: </strong>
                    {enteredStreet} {enteredHouseNumber} {enteredApartNumber.trim().length > 0 ? `/ ${enteredApartNumber}` : ''}
                </p>

                <h2 className={'text-center border-bottom border-top py-2'}>Usługi</h2>
                <p className={`my-1`}><strong>Oferowane usługi:</strong> {chosenServices.map(service => {
                    return (`${services[parseInt(service) - 1]}${chosenServices.indexOf(service) !== chosenServices.length - 1 ? ', ' : ''}`)
                })}</p>
                <p className={`my-1`}><strong>Miejsce oferowanych usług:</strong></p>
                <p className={`my-1`}><strong>Kod pocztowy:</strong> {servicePostCode}</p>
                <p className={`my-1`}><strong>Miejscowość:</strong> {serviceCity}</p>
                <p className={`my-1`}>
                    <strong>Ulica i numer: </strong>
                    {serviceStreetName} {serviceHouseNumber} {serviceApartNumber.trim().length > 0 ? `/ ${serviceApartNumber}` : ''}
                </p>

                <h2 className={'text-center border-bottom border-top py-2'}>Twoja wiadomość</h2>
                <p>{additionalInfo.trim().length > 0 ? additionalInfo : "Brak wiadomości"}</p>

                <div className={`d-flex justify-content-between pb-2`}>
                    <Button variant="primary" className={styles.btnPages} onClick={() => setPageVisible('third')}>
                        Wróć
                    </Button>
                    <Button variant="primary" className={styles.btnPages} onClick={validateThirdPage}>
                        Zarejestruj
                    </Button>
                </div>
            </>
        )
    };

const page =
    {
        "first": FirstPage,
        "second": SecondPage,
        "third": ThirdPage,
        'confirm': ConfirmPage
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