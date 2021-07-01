import React from 'react';

import styles from './ProviderRegister.module.css';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {faTimes} from "@fortawesome/free-solid-svg-icons";

const ProviderRegister = (props) => {


    return (
        <div className={styles.wrapper}>
            <div className={`text-right pr-3`}>
                <FontAwesomeIcon icon={faTimes} onClick={props.closeForm}/>
            </div>
            <header className={`text-center`}>
                <h4>Rejestracja dla usługodawców</h4>
            </header>
        </div>
    )
};

export default ProviderRegister;