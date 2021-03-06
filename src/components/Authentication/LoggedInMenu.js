import React, {useState} from 'react';

import styles from './LoggedInMenu.module.css';
import AuthConfirmation from "./AuthConfirmation";
import NewService from "../Services/NewService";
import * as ReactDOM from "react-dom";

const LoggedInMenu = (props) => {

    const [loggedIn, setLoggedIn] = useState(localStorage.getItem("logged") != null);

    const logOutHandler = () => {
        // TODO: proper logout when logging in functionality will be done
        localStorage.removeItem("logged");
        setLoggedIn(false);
        setTimeout(() => {
            props.closeAll()
        }, 3000)
    }

    const [showNewServiceForm, setShowNewServiceForm] = useState(false);

    const changeNewServiceFormVisibility = () => {
        setShowNewServiceForm(!showNewServiceForm);
    };

    return (
        <>
            {showNewServiceForm ?
                ReactDOM.createPortal(<NewService close={changeNewServiceFormVisibility}/>, document.getElementById("new-service-root"))
                 :
                (loggedIn ?
                    <ul className={styles.menuOptions}>
                        <li>
                            <button>Mój profil</button>
                        </li>
                        <li>
                            <button>Zmień dane</button>
                        </li>
                        <li>
                            <button>Ustawienia bezpieczeństwa</button>
                        </li>
                        <li>
                            {
                                localStorage.getItem("userRoles").includes("PROVIDER") &&
                                <button onClick={changeNewServiceFormVisibility}>Zaoferuj usługę</button>
                            }

                        </li>
                        <li>
                            <button onClick={logOutHandler}>Wyloguj</button>
                        </li>
                    </ul>
                    :
                    <AuthConfirmation title={"Wylogowano pomyślnie. Okno zamknie się automatycznie za kilka sekund."}/>)
            }
        </>

    )
};

export default LoggedInMenu;