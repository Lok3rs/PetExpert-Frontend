import React, {useState} from 'react';

import {Navbar} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser, faBars} from "@fortawesome/free-solid-svg-icons";


import logo from './logo_notext.png'
import styles from './MainNavbar.module.css';

const MainNavbar = () => {

    return (
        <>
            <Navbar className={`d-flex justify-content-between align-items-center py-1 ${styles.bgTransparent}`}>
                <FontAwesomeIcon icon={faBars} className={`p-0`}/>
                <img src={logo} alt="" className={`${styles.navbarLogo}`}/>
                <FontAwesomeIcon icon={faUser} className={`p-0`}/>
            </Navbar>
        </>
    )

}


export default MainNavbar;