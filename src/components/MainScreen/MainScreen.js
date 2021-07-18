import React, {useState} from 'react';
import MainNavbar from "./MainNavbar/MainNavbar";

import styles from "./MainScreen.module.css";
import ServicesBar from "./ServicesBar/ServicesBar";
import ServicesList from "../Services/ServicesList";


const MainScreen = () => {

    const [showServicesList, setShowServicesList] = useState(true);

    const changeServicesVisibility = () => {
        setShowServicesList(!showServicesList);
    };


    return (
        showServicesList ?
            <ServicesList
                close={changeServicesVisibility}
            />
            :
            <div className={styles.wrapper}>
                <div className={`${styles.h80} ${styles.mainContainer}`}>
                    <MainNavbar
                        showServices={changeServicesVisibility}
                    />
                </div>
                <div>
                    <ServicesBar
                        showServices={changeServicesVisibility}
                    />
                </div>
            </div>
    )
};

export default MainScreen;