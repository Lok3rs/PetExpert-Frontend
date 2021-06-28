import React, {useState} from 'react';
import ReactDOM from 'react-dom';

import styles from './AuthModal.module.css';
import Card from "../UI/Card";
import Login from "./Login";
import BaseRegister from "./BaseRegister";

const Backdrop = props => {
    return (
        <div className={styles.backdrop}>

        </div>
    )
}

const ModalOverlay = props => {

    const [visibleForm, setVisibleForm] = useState('login');

    const showLoginHandler = () => {
        setVisibleForm('login');
    }

    const showRegisterHandler = () => {
        setVisibleForm('register');
    }

    return (
        <Card className={styles.modal}>
            <header className={styles.header}>
                <button onClick={showLoginHandler}>Logowanie</button>
                <button onClick={showRegisterHandler}>Rejestracja</button>
            </header>
            {
                visibleForm === 'login' && <Login />
            }
            {
                visibleForm === 'register' && <BaseRegister />
            }
        </Card>
    )
};

const AuthModal = (props) => {
    return (
        <React.Fragment>
            {ReactDOM.createPortal(
                <Backdrop
                    onConfirm={props.onConfirm}/>,
                document.getElementById('backdrop-root'))}

            {ReactDOM.createPortal(
                <ModalOverlay
                    title={props.title}>
                    {props.children}
                </ModalOverlay>,
                document.getElementById('overlay-root'))}

        </React.Fragment>
    );
};

export default AuthModal;