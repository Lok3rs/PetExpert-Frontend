import React, {useState} from 'react';

import {Form, FormControl, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser, faBars} from "@fortawesome/free-solid-svg-icons";


import logoNoText from './logo_notext.png';
import logo from './logo.png';
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
        setShowSideMenu(false);
    }

    return (
        <>
            {
                showAuth && (
                    <AuthModal changeVisibility={changeAuthVisibility} title={"Login"}/>
                )
            }
            <div className={`${styles.mobileNavbar}`}>
                <Navbar
                    className={`d-flex justify-content-between align-items-center py-1 ${!showSideMenu ? styles.bgTransparent : styles.bgNotTransparent}`}>
                    <FontAwesomeIcon icon={faBars} className={`p-0`} onClick={changeSideMenuVisibility}/>
                    <img src={logoNoText} alt="" className={`${styles.navbarLogo}`}/>
                    <FontAwesomeIcon icon={faUser} className={`p-0`} onClick={changeAuthVisibility}/>
                </Navbar>
                <Navbar className={`${styles.sideBar} ${!showSideMenu ? styles.sideBarHidden : undefined} d-block`}
                        id={`SideBar`}>
                    <Nav.Item className={`${styles.category} ${styles.navItem}`} onClick={props.showServices}>
                        {showSideMenu && `Usługi`}
                    </Nav.Item>
                    <Nav.Item className={`${styles.navItem}`} onClick={props.showServices}>
                        {showSideMenu && `Behawioryści`}
                    </Nav.Item>
                    <Nav.Item className={`${styles.navItem}`} onClick={props.showServices}>
                        {showSideMenu && `Hotele / Petsitterzy`}
                    </Nav.Item>
                    <Nav.Item className={`${styles.navItem}`} onClick={props.showServices}>
                        {showSideMenu && `Groomerzy`}
                    </Nav.Item>
                    <Nav.Item className={`${styles.navItem}`} onClick={props.showServices}>
                        {showSideMenu && `Weterynarze`}
                    </Nav.Item>
                    <Nav.Item className={`${styles.category} ${styles.navItem}`}>
                        {showSideMenu && `Twoje konto`}
                    </Nav.Item>
                    {localStorage.getItem("logged") !== "1" ?
                        <>
                            <Nav.Item className={`${styles.navItem}`}>
                                {showSideMenu && `Logowanie`}
                            </Nav.Item>
                            <Nav.Item className={`${styles.navItem}`}>
                                {showSideMenu && `Rejestracja`}
                            </Nav.Item>
                        </> :
                        <>
                            <Nav.Item className={`${styles.navItem}`}>
                                {showSideMenu && `Zarządzaj kontem`}
                            </Nav.Item>
                            <Nav.Item className={`${styles.navItem}`}>
                                {showSideMenu && `Wyloguj`}
                            </Nav.Item>
                        </>
                    }
                    <Nav.Item className={`${styles.category} ${styles.navItem}`}>
                        {showSideMenu && `Pozostałe`}
                    </Nav.Item>
                    <Nav.Item className={`${styles.navItem}`}>
                        {showSideMenu && `O nas`}
                    </Nav.Item>
                    <Nav.Item className={`${styles.navItem}`}>
                        {showSideMenu && `FAQ`}
                    </Nav.Item>
                    <Nav.Item className={`${styles.navItem}`}>
                        {showSideMenu && `Regulamin`}
                    </Nav.Item>
                    <Nav.Item className={`${styles.navItem}`}>
                        {showSideMenu && `Wyślij zgłoszenie`}
                    </Nav.Item>
                </Navbar>
            </div>
            <div className={`${styles.desktopNavbar}`}>
                <Navbar className={`${styles.bgTransparent} px-5`} expand="lg">
                    <Navbar.Brand href="#"><img src={logo} className={`${styles.navbarLogo}`} alt={""}/></Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="mr-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <NavDropdown title="Lista usług" id="navbarScrollingDropdown">
                                <NavDropdown.Item onClick={props.showServices}>Behawioryści</NavDropdown.Item>
                                <NavDropdown.Item onClick={props.showServices}>Hotele dla zwierząt / Petsitterzy</NavDropdown.Item>
                                <NavDropdown.Item onClick={props.showServices}>Groomerzy</NavDropdown.Item>
                                <NavDropdown.Item onClick={props.showServices}>Weterynarze</NavDropdown.Item>
                                <NavDropdown.Divider />
                                {localStorage.getItem("userRoles").includes("PROVIDER") &&
                                <NavDropdown.Item>Zaoferuj usługę</NavDropdown.Item>
                                }
                            </NavDropdown>
                            <Nav.Link className={styles.navItemDesktop}>Regulamin</Nav.Link>
                            <Nav.Link className={styles.navItemDesktop}>O nas</Nav.Link>
                            <Nav.Link className={styles.navItemDesktop}>Kontakt</Nav.Link>

                        </Nav>
                        <Form className="d-flex">
                            <Nav.Item>
                                <FontAwesomeIcon icon={faUser} className={`p-0`} onClick={changeAuthVisibility}/>
                            </Nav.Item>
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
            </div>

        </>
    )

}


export default MainNavbar;