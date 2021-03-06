import React from 'react';

import styles from './AuthConfirmation.module.css';

import {Spinner} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";

const AuthConfirmation = (props) => {


    return (
        <div className={`py-4 px-1 text-center ${styles.wrapper} ${props.provider && styles.providerWrapper}`}>
            { props.spinner ?
                <Spinner animation={"border"} variant={"primary"}/> :
                <>
                    <FontAwesomeIcon className={styles.confirmIcon} icon={faCheckCircle}/>
                    <h4 className={`align-self-end`}>{props.title}</h4>
                    <h6>{props.children}</h6>
                </>
            }
        </div>
    )
};

export default AuthConfirmation;