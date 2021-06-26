import React from 'react';

import {Navbar} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser, faBars} from "@fortawesome/free-solid-svg-icons";


import logo from './logo.png'
import styles from './MainNavbar.module.css';

const MainNavbar = () => {

    return (
        <Navbar className={`justify-content-between py-0 ${styles.bgTransparent}`}>
            <FontAwesomeIcon icon={faBars}/>
            <img src={logo} alt="" className={styles.navbarLogo}/>
            <FontAwesomeIcon icon={faUser}/>
        </Navbar>
    )

}


export default MainNavbar;