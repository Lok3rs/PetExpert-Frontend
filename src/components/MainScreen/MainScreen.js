import React from 'react';
import MainNavbar from "./Navbar/MainNavbar";

import styles from "./MainScreen.module.css";
import ServicesBar from "./ServicesBar/ServicesBar";


const MainScreen = () => {
    return (
        <>
            <div className={`${styles.h80} ${styles.mainContainer}`}>
                <MainNavbar />
            </div>
            <div>
                <ServicesBar/>
            </div>
        </>
    )
};

export default MainScreen;