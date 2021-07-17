import React from 'react';

import styles from './NewServiceConfirmation.module.css';
import {Button, Spinner} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";

const NewServiceConfirmation = (props) => {
    return (
        <div className={styles.confirmationWrapper}>
            {
                props.showSpinner ?
                    <Spinner animation={"border"} variant={"primary"} /> :
                    <>
                        <FontAwesomeIcon className={styles.confirmIcon} icon={faCheckCircle}/>
                        <h4 className={`align-self-end`}>Usługa dodana pomyślnie!</h4>
                        <h6>Aby umożlwiić użytkownikom rezerwacje usług ustaw dni i godziny ich odbywania w
                            <strong> Mój Profil > Usługi.</strong></h6>
                        <Button>Wróć na stronę główną</Button>
                    </>
            }
        </div>
    )
}
;

export default NewServiceConfirmation;