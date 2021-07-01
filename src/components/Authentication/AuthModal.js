import React, {useState} from 'react';
import ReactDOM from 'react-dom';

import styles from './AuthModal.module.css';
import Card from "../UI/Card";
import Login from "./Login";
import BaseRegister from "./BaseRegister";

const Backdrop = props => {
    return (
        <div className={styles.backdrop} onClick={props.onClick}>

        </div>
    )
}

const ModalOverlay = () => {

    const [visibleForm, setVisibleForm] = useState('login');
    const [showProviderRegistration, setShowProviderRegistration] = useState(false);

    const showLoginHandler = () => {
        setVisibleForm('login');
    }

    const showRegisterHandler = () => {
        setVisibleForm('register');
    }

    const changeProviderRegistrationFormVisibility = () => {
        setShowProviderRegistration(!showProviderRegistration);
    }

    return (
        <> {!showProviderRegistration ?
            <Card className={`${styles.modal} ${visibleForm === 'register' ? styles.modalRegister : undefined}`}>
                <header className={styles.header}>
                    <button className={visibleForm === 'login' ? styles.active : undefined}
                            onClick={showLoginHandler}>Logowanie
                    </button>
                    <button className={visibleForm === 'register' ? styles.active : undefined}
                            onClick={showRegisterHandler}>Rejestracja
                    </button>
                </header>
                {
                    visibleForm === 'login' && <Login/>
                }
                {
                    visibleForm === 'register' && <BaseRegister providerRegisterHandler={changeProviderRegistrationFormVisibility}/>
                }
            </Card> :
            <h2>PROVIDER REGISTER</h2>
        }
        </>

    )
};

const AuthModal = (props) => {
    return (
        <React.Fragment>
            {ReactDOM.createPortal(
                <Backdrop
                    onClick={props.changeVisibility}/>,
                document.getElementById('backdrop-root'))}

            {ReactDOM.createPortal(
                <ModalOverlay>
                    {props.children}
                </ModalOverlay>,
                document.getElementById('overlay-root'))}

        </React.Fragment>
    );
};

export default AuthModal;