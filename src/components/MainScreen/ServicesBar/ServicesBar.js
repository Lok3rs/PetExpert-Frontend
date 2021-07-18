import React from 'react';

import styles from './ServicesBar.module.css';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaw, faHome, faCut, faStethoscope} from "@fortawesome/free-solid-svg-icons";

const ServicesBar = (props) => {

    return (
        <div className={`d-flex justify-content-around align-items-center ${styles.h20}`}>
            <FontAwesomeIcon icon={faPaw} className={`${styles.iconSize}`} onClick={props.showServices}/>
            <FontAwesomeIcon icon={faHome} className={`${styles.iconSize}`} onClick={props.showServices}/>
            <FontAwesomeIcon icon={faCut} className={`${styles.iconSize}`} onClick={props.showServices}/>
            <FontAwesomeIcon icon={faStethoscope} className={`${styles.iconSize}`} onClick={props.showServices}/>
        </div>
    );
};

export default ServicesBar;