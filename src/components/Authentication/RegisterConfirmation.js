import React, {useState} from 'react';

import styles from './RegisterConfirmation.module.css';

import {Spinner} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";

const RegisterConfirmation = () => {

    const [showSpinner, setShowSpinner] = useState(true);

    setTimeout(() => {
        setShowSpinner(false);
    }, 2000);

    return (
        <div className={`py-4 px-1 text-center ${styles.wrapper}`}>
            { showSpinner ?
                <Spinner animation={"border"} variant={"primary"}/> :
                <>
                    <FontAwesomeIcon className={styles.confirmIcon} icon={faCheckCircle}/>
                    <h4 className={`align-self-end`}>Rejestracja zakończona pomyślnie.</h4>
                    <h6>Na Twój adres mailowy wysłaliśmy wiadomość z linkiem aktywującym Twoje konto.</h6>
                </>

            }
        </div>
    )
};

export default RegisterConfirmation;