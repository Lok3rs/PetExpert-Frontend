import React from 'react';
import MainNavbar from "./Navbar/MainNavbar";

import styles from "./MainScreen.module.css";


const MainScreen = () => {
    return (
        <>
            <div className={`${styles.h80} ${styles.mainContainer}`}>
                <MainNavbar/>
            </div>
            <div>
                lol
            </div>
        </>
    )
};

export default MainScreen;