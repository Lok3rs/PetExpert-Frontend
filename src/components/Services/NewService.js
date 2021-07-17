import React, {useState} from 'react';

import styles from './NewService.module.css';

import {Button, Form} from "react-bootstrap";
import {faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import NewServiceConfirmation from "./NewServiceConfirmation";


const NewService = (props) => {

    //TODO: VALIDATE TOO LONG VALUES PROVIDED BY USERS
    //TODO: CLOSING BUTTON ACTION

    const errors = {
        invalidServiceNameLength: "Nazwa usługi musi zawierać pomiędzy 5 a 40 znaków.",
        invalidServiceDescLength: "Opis usługi musi zawierać pomiędzy 30 a 200 znakow.",
        emptyFieldError: "To pole nie może być puste.",
        invalidPriceError: "Cena musi być dodatnią liczbą całkowitą."
    }

    // SERVICE NAME
    const [serviceName, setServiceName] = useState("");
    const [serviceNameError, setServiceNameError] = useState(false);

    const changeServiceNameHandler = event => {
        setServiceName(event.target.value);
        if (serviceNameError) {
            validateServiceName();
        }
    };

    const validateServiceName = () => {
        setServiceNameError(serviceName.length < 5 || serviceName.length > 40);
    }


    // SERVICE DESCRIPTION
    const [serviceDescription, setServiceDescription] = useState("");
    const [serviceDescError, setServiceDescError] = useState(false);

    const changeServiceDescHandler = event => {
        setServiceDescription(event.target.value);
        if (serviceDescError) {
            validateServiceDescription();
        }
    };

    const validateServiceDescription = () => {
        setServiceDescError(serviceDescription.length < 30 || serviceDescription.length > 200)
    };

    // // SERVICE PLACE
    // const [servicePlace, setServicePlace] = useState("");
    // const [servicePlaceError, setServicePlaceError] = useState(false);
    //
    // const changeServicePlaceHandler = event => {
    //     setServicePlace(event.target.value);
    //     if (servicePlaceError) {
    //         validateServicePlace();
    //     }
    // };
    //
    // const validateServicePlace = () => {
    //     // TODO: some API checking if place exists in Poland
    //     setServicePlaceError(servicePlace.length === 0);
    // }

    // SERVICE PRICE
    const [servicePrice, setServicePrice] = useState('')
    const [servicePriceError, setServicePriceError] = useState(false);

    const validateServicePrice = () => {
        if (isNaN(parseInt(servicePrice)) || parseInt(servicePrice) <= 0) {
            setServicePriceError(true);
            return;
        }
        setServicePrice(parseInt(servicePrice).toString());
        setServicePriceError(false);
    };

    const changeServicePriceHandler = event => {
        setServicePrice(event.target.value);
        if (servicePriceError) {
            validateServicePrice();
        }
    }
    // DRIVE TO CLIENT

    const [driveToClient, setDriveToClient] = useState(false);
    const [drivingRadius, setDrivingRadius] = useState(0);

    const changeDriveToClientHandler = () => {
        setDriveToClient(!driveToClient);
    };

    const changeDrivingRadiusHandler = (event) => {
        setDrivingRadius(event.target.value);
        if (event.target.value < 0) {
            setDrivingRadius(0);
        }
    };

    // SUBMIT SERVICE

    const [serviceSubmitted, setServiceSubmitted] = useState(false);
    const [showSpinner, setShowSpinner] = useState(true);

    const validateAll = () => {
        validateServicePrice();
        validateServiceDescription();
        validateServiceName();
    };

    const addServiceHandler = () => {
        validateAll();
        if (!serviceNameError || !serviceDescError || !servicePriceError) {
            // TODO: fetch request to backend when it'll be ready
            setServiceSubmitted(true);
            setTimeout(() => {
                setShowSpinner(false);
            }, 3000)
        }
    };

    return (
        <div className={styles.newServiceForm}>
            {!serviceSubmitted ?
                <Form className={`px-3`}>
                    <header>
                        <div className={"d-flex flex-row-reverse pt-2 mb-0 pb-0"}>
                            <FontAwesomeIcon
                                icon={faTimesCircle}
                                className={`${styles.closeIcon}`}
                                onClick={props.close}
                            />
                        </div>
                        <h2 className={`text-center`}>
                            Nowa usługa
                        </h2>
                    </header>

                    {/*SERVICE TYPE FIELD*/}
                    <Form.Group>
                        <Form.Label>Typ usługi</Form.Label>
                        <select className={styles.select}>
                            <option value="vet">Usługi weterynaryjne</option>
                            <option value="beh">Behawiorystyka</option>
                            <option value="gro">Grooming</option>
                            <option value="hot">Hotel dla zwierząt / Petsitting</option>
                        </select>
                    </Form.Group>

                    {/*SERVICE NAME FIELD*/}
                    <Form.Group>
                        <Form.Label>Nazwa usługi</Form.Label>
                        <Form.Control
                            id={'serviceName'}
                            type="text"
                            placeholder="Nazwa widoczna dla użytkowników portalu"
                            onBlur={validateServiceName}
                            onChange={changeServiceNameHandler}
                            value={serviceName}
                        />
                        {
                            serviceNameError &&
                            <small className={`${styles.error}`}>
                                {errors.invalidServiceNameLength}
                            </small>
                        }
                    </Form.Group>

                    {/*SERVICE DESCRIPTION FIELD*/}
                    <Form.Group>
                        <Form.Label>Opis usługi</Form.Label>
                        <Form.Control
                            id={'serviceDescription'}
                            as="textarea"
                            rows={4}
                            placeholder="Krótki opis oferowanej usługi"
                            onBlur={validateServiceDescription}
                            onChange={changeServiceDescHandler}
                            value={serviceDescription}
                        />
                        {
                            serviceDescError &&
                            <small className={`${styles.error}`}>
                                {errors.invalidServiceDescLength}
                            </small>
                        }
                    </Form.Group>

                    {/*/!*SERVICE PLACE FIELD*!/*/}
                    {/*<Form.Group>*/}
                    {/*    <Form.Label>Miejscowość</Form.Label>*/}
                    {/*    <Form.Control*/}
                    {/*        id={'servicePlace'}*/}
                    {/*        placeholder="Miejsce oferowanej usługi"*/}
                    {/*        onBlur={validateServicePlace}*/}
                    {/*        onChange={changeServicePlaceHandler}*/}
                    {/*        value={servicePlace}*/}
                    {/*    />*/}
                    {/*    {*/}
                    {/*        servicePlaceError &&*/}
                    {/*        <small className={`${styles.error}`}>*/}
                    {/*            {errors.emptyFieldError}*/}
                    {/*        </small>*/}
                    {/*    }*/}
                    {/*</Form.Group>*/}

                    <Form.Group>
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            label="Dojazdy do klienta"
                            value={driveToClient}
                            onChange={changeDriveToClientHandler}
                        />
                        {
                            driveToClient &&
                            <div className={`row px-3 d-flex`}>
                                <Form.Control
                                    type={"number"}
                                    value={drivingRadius}
                                    className={`mt-2 col-11`}
                                    min={0}
                                    onChange={changeDrivingRadiusHandler}
                                />
                                <div className={`${styles.km} pl-1`}>km</div>
                            </div>

                        }

                    </Form.Group>


                    {/*SERVICE PRICE FIELD*/}
                    <Form.Group>
                        <Form.Label>Cena</Form.Label>
                        <Form.Control
                            id={'servicePrice'}
                            placeholder="Cena oferowanej usługi"
                            onBlur={validateServicePrice}
                            onChange={changeServicePriceHandler}
                            value={servicePrice}
                        />
                        {
                            servicePriceError &&
                            <small className={`${styles.error}`}>
                                {errors.invalidPriceError}
                            </small>
                        }
                    </Form.Group>

                    <Button
                        variant={"secondary"}
                        className={`w-100 py-2`}
                        onClick={addServiceHandler}
                    >
                        Dodaj usługę
                    </Button>
                </Form> :
                <NewServiceConfirmation
                    showSpinner={showSpinner}
                    close={props.close}
                />

            }

        </div>

    );
};

export default NewService;