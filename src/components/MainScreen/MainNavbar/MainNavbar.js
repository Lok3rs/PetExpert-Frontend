import React, {useState} from 'react';

import {Nav, Navbar} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser, faBars} from "@fortawesome/free-solid-svg-icons";


import logo from './logo_notext.png'
import styles from './MainNavbar.module.css';
import AuthModal from "../../Authentication/AuthModal";

const MainNavbar = (props) => {

    const [showSideMenu, setShowSideMenu] = useState(false);

    const changeSideMenuVisibility = () => {
        setShowSideMenu(!showSideMenu);
    };

    const [showAuth, setShowAuth] = useState(false);

    const changeAuthVisibility = () => {
        setShowAuth(!showAuth);
    }

    return (
        <>
            {
                showAuth && (
                    <AuthModal changeVisibility={changeAuthVisibility} title={"Login"}/>
                )
            }
            <Navbar className={`d-flex justify-content-between align-items-center py-1 ${styles.bgTransparent}`}>
                <FontAwesomeIcon icon={faBars} className={`p-0`} onClick={changeSideMenuVisibility}/>
                <img src={logo} alt="" className={`${styles.navbarLogo}`}/>
                <FontAwesomeIcon icon={faUser} className={`p-0`} onClick={changeAuthVisibility}/>
            </Navbar>
            <Navbar className={`${styles.sideBar} ${!showSideMenu ? styles.sideBarHidden : undefined} d-block`} id={`SideBar`}>
                <Nav.Item className={`${styles.category} ${styles.navItem}`}>Usługi</Nav.Item>
                <Nav.Item className={`${styles.navItem}`}>Behawioryści</Nav.Item>
                <Nav.Item className={`${styles.navItem}`}>Hotele / Petsitterzy</Nav.Item>
                <Nav.Item className={`${styles.navItem}`}>Groomerzy</Nav.Item>
                <Nav.Item className={`${styles.navItem}`}>Weterynarze</Nav.Item>
                <Nav.Item className={`${styles.category} ${styles.navItem}`}>Twoje konto</Nav.Item>
                <Nav.Item className={`${styles.navItem}`}>Logowanie</Nav.Item>
                <Nav.Item className={`${styles.navItem}`}>Rejestracja</Nav.Item>
                <Nav.Item className={`${styles.category} ${styles.navItem}`}>Pozostałe</Nav.Item>
                <Nav.Item className={`${styles.navItem}`}>O nas</Nav.Item>
                <Nav.Item className={`${styles.navItem}`}>FAQ</Nav.Item>
                <Nav.Item className={`${styles.navItem}`}>Regulamin</Nav.Item>
                <Nav.Item className={`${styles.navItem}`}>Wyślij zgłoszenie</Nav.Item>
            </Navbar>
        </>
    )

}


export default MainNavbar;