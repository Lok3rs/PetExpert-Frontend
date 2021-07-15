import React, {useState} from 'react';

import styles from './NewService.module.css';

import {Form} from "react-bootstrap";
import {faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


const NewService = () => {

    //TODO: VALIDATE TOO LONG VALUES PROVIDED BY USERS

    const errors = {
        tooShortServiceName: "Nazwa usługi musi mieć przynajmniej 5 znaków."
    }

    const [serviceName, setServiceName] = useState("");
    const [serviceNameError, setServiceNameError] = useState(false);

    const changeServiceNameHandler = event => {
        setServiceName(event.target.value);
        if (serviceNameError) {
            setServiceNameError(serviceName.length <= 4);
        }
    };

    const validateServiceName = () => {
        setServiceNameError(serviceName.length < 5);

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
            <Form.Group>
                <Form.Label>Nazwa usługi</Form.Label>
                <Form.Control
                    id={'emailField'}
                    type="text"
                    placeholder="Nazwa widoczna dla użytkowników portalu"
                    onBlur={validateServiceName}
                    onChange={changeServiceNameHandler}
                    value={serviceName}
                />
                {
                    serviceNameError &&
                    <small className={`${styles.error}`}>
                        {errors.tooShortServiceName}
                    </small>
                }

            </Form.Group>
        </Form>
    );
};

export default NewService;