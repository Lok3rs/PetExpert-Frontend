import React, {useState} from 'react';

import styles from './NewService.module.css';

import {Form} from "react-bootstrap";
import {faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


const NewService = () => {

    //TODO: VALIDATE TOO LONG VALUES PROVIDED BY USERS
    //TODO: CLOSING BUTTON ACTION

    const errors = {
        invalidServiceNameLength: "Nazwa usługi musi zawierać pomiędzy 5 a 40 znaków.",
        invalidServiceDescLength: "Opis usługi musi zawierać pomiędzy 30 a 200 znakow.",
        emptyFieldError: "To pole nie może być puste."
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

    // SERVICE PLACE
    const [servicePlace, setServicePlace] = useState("");
    const [servicePlaceError, setServicePlaceError] = useState(false);

    const changeServicePlaceHandler = event => {
        setServicePlace(event.target.value);
        if (servicePlaceError) {
            validateServicePlace();
        }
    };

    const validateServicePlace = () => {
        // TODO: some API checking if place exists in Poland
        setServicePlaceError(servicePlace.length === 0);
    }


    return (
        <Form className={`px-3 ${styles.newServiceForm}`}>
            <header>
                <div className={"d-flex flex-row-reverse pt-2"}>
                    <FontAwesomeIcon icon={faTimesCircle} className={`${styles.closeIcon}`}/>
                </div>
                <h2 className={`text-center mt-2`}>
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

            {/*SERVICE PLACE FIELD*/}
            <Form.Group>
                <Form.Label>Miejscowość</Form.Label>
                <Form.Control
                    id={'servicePlace'}
                    placeholder="Miejsce oferowanej usługi"
                    onBlur={validateServicePlace}
                    onChange={changeServicePlaceHandler}
                    value={servicePlace}
                />
                {
                    servicePlaceError &&
                    <small className={`${styles.error}`}>
                        {errors.emptyFieldError}
                    </small>
                }
            </Form.Group>


        </Form>
    );
};

export default NewService;