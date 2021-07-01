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

    const showLoginHandler = () => {
        setVisibleForm('login');
    }

    const showRegisterHandler = () => {
        setVisibleForm('register');
    }

    return (
        <Card className={`${styles.modal} ${visibleForm === 'register' && styles.modalRegister}`}>
            <header className={styles.header}>
                <button className={visibleForm === 'login' && styles.active}
                        onClick={showLoginHandler}>Logowanie
                </button>
                <button className={visibleForm === 'register' && styles.active}
                        onClick={showRegisterHandler}>Rejestracja
                </button>
            </header>
            {
                visibleForm === 'login' && <Login/>
            }
            {
                visibleForm === 'register' && <BaseRegister/>
            }
        </Card>
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