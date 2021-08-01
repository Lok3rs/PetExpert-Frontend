import React from 'react';

import styles from './ServicesBar.module.css';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaw, faHome, faCut, faStethoscope} from "@fortawesome/free-solid-svg-icons";

const ServicesBar = (props) => {

    return (
        <div className={`d-flex justify-content-around align-items-center ${styles.h20}`}>
            <div className={`text-center`}>
                <FontAwesomeIcon icon={faPaw} className={`${styles.iconSize}`} onClick={props.showServices}/>
                <div className={`${styles.iconsDescription}`}>Behawioryści</div>
            </div>
            <div className={`text-center`}>
                <FontAwesomeIcon icon={faHome} className={`${styles.iconSize}`} onClick={props.showServices}/>
                <div className={`${styles.iconsDescription}`}>Hotele dla zwierząt / Petsitterzy</div>
            </div>
            <div className={`text-center`}>
                <FontAwesomeIcon icon={faCut} className={`${styles.iconSize}`} onClick={props.showServices}/>
                <div className={`${styles.iconsDescription}`}>Groomerzy</div>
            </div>
            <div className={`text-center`}>
                <FontAwesomeIcon icon={faStethoscope} className={`${styles.iconSize}`} onClick={props.showServices}/>
                <div className={`${styles.iconsDescription}`}>Weterynarze</div>
            </div>
        </div>
    );
};

export default ServicesBar;