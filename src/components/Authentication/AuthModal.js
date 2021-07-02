import React, {useState} from 'react';
import ReactDOM from 'react-dom';

import styles from './AuthModal.module.css';
import Card from "../UI/Card";
import Login from "./Login";
import BaseRegister from "./BaseRegister";
import ProviderRegister from "./ProviderRegister";


const Backdrop = props => {
    return (
        <div className={styles.backdrop} onClick={props.onClick}>

        </div>
    )
}

const ModalOverlay = (props) => {

    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');

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
        props.changeBackdropVisibility();
    }

    const [confirmationVisible, setConfirmationVisible] = useState(false);

    const confirmationVisibleHandler = () => {
      setConfirmationVisible(true);
      if (visibleForm === 'login') {
          loginBtn.disabled = true;
          registerBtn.disabled = true;
      }
    };

    return (
        <> {!showProviderRegistration ?
            <Card id={'Modal'} className={`${styles.modal} ${(visibleForm === 'register' && !confirmationVisible) ? styles.modalRegister : undefined}`}>
                <header className={styles.header}>
                    <button
                            className={visibleForm === 'login' ? styles.active : undefined}
                            onClick={showLoginHandler}
                            id={'loginBtn'}>
                        Logowanie
                    </button>
                    <button
                        className={visibleForm === 'register' ? styles.active : undefined}
                        onClick={showRegisterHandler}
                        id={'registerBtn'}>
                        Rejestracja
                    </button>
                </header>
                {
                    visibleForm === 'login' && <Login closeAll={props.changeAuthVisibility} />
                }
                {
                    visibleForm === 'register' && <BaseRegister
                        onConfirm={confirmationVisibleHandler}
                        providerRegisterHandler={changeProviderRegistrationFormVisibility}
                    />
                }
            </Card> :
                ReactDOM.createPortal(<ProviderRegister closeAll={props.changeAuthVisibility} closeForm={changeProviderRegistrationFormVisibility}/>,
                    document.getElementById('overlay-root'))

        }
        </>

    )
}

const AuthModal = (props) => {

    const [showBackdrop, setShowBackdrop] = useState(true);

    const changeBackdropVisibility = () => {
        setShowBackdrop(!showBackdrop);
    };

    return (
        <React.Fragment>
            { showBackdrop && ReactDOM.createPortal(
                <Backdrop
                    onClick={props.changeVisibility} />,
                document.getElementById('backdrop-root'))}

            {ReactDOM.createPortal(
                <ModalOverlay
                    changeAuthVisibility={props.changeVisibility}
                    changeBackdropVisibility={changeBackdropVisibility}>
                    {props.children}
                </ModalOverlay>,
                document.getElementById('overlay-root'))}

        </React.Fragment>
    );
};

export default AuthModal;