import React, {useState} from "react";

import {API_BASE_URL} from '../../constants/ApiConstants.js';
import styles from './ServicesList.module.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faAngleDoubleDown,
    faAngleDoubleUp,
    faCut,
    faHome, faMapMarkerAlt,
    faPaw, faStethoscope,
    faTimesCircle, faUser
} from "@fortawesome/free-solid-svg-icons";
import {Button, Form} from "react-bootstrap";
import axios from 'axios';

import fakeData from './fakedata.json';

const ServicesList = (props) => {

    const [citySearch, setCitySearch] = useState('');

    const changeCitySearchedHandler = (event) => {
        setCitySearch(event.target.value);
    };

    const [showMoreFilters, setShowMoreFilters] = useState(false);

    const changeMoreFiltersVisibility = () => {
        setShowMoreFilters(!showMoreFilters)
    };

    const searchAndFilterHandler = () => {
        // TODO: requests to backend when it'll be ready
        console.log("searching");

    };

    const [realPriceFrom, setRealPriceFrom] = useState(0);
    const [realPriceTo, setRealPriceTo] = useState(1000);
    const [realDistanceFromChosenCity, setRealDistanceFromChosenCity] = useState(0);
    const [driveToClient, setDriveToClient] = useState(false);


    const ServicesFilter = () => {
        const [priceFrom, setPriceFrom] = useState(0);
        const [priceTo, setPriceTo] = useState(1000);
        const [distanceFromCity, setDistanceFromCity] = useState(0);


        const changeDriveToClientHandler = (event) => {
            setDriveToClient(event.target.checked);
        };


        const changePriceFromHandler = (event) => {
            if (isNaN(event.target.value)) {
                return;
            }
            setPriceFrom(parseInt(event.target.value));
            if (priceFrom < 0) {
                setPriceFrom(0);
            }
            setRealPriceFrom(priceFrom);
        };

        const changePriceToHandler = (event) => {
            if (isNaN(event.target.value)) {
                return;
            }
            setPriceTo(parseInt(event.target.value));
            if (priceTo < 0) {
                setPriceTo(0);
            }
            setRealPriceTo(priceTo);
        };

        const changeDistanceHandler = (event) => {
            if (isNaN(event.target.value)) {
                return;
            }
            setDistanceFromCity(parseInt(event.target.value));
            if (distanceFromCity < 0) {
                setDistanceFromCity(0);
            }
            setRealDistanceFromChosenCity(distanceFromCity);
        };

        return (
            <div className={""}>
                <Form.Control
                    id={"servicesCity"}
                    type={"text"}
                    placeholder={"Miejscowość"}
                    value={citySearch}
                    onChange={changeCitySearchedHandler}
                    className={`mb-1`}
                />
                <select className={`py-2 ${styles.select}`}>
                    <option value={"all"}>Wszystkie usługi</option>
                    <option value="vet">Usługi weterynaryjne</option>
                    <option value="beh">Behawiorystyka</option>
                    <option value="gro">Grooming</option>
                    <option value="hot">Hotel dla zwierząt / Petsitting</option>
                </select>
                <div className={`${showMoreFilters ? styles.filtersShow : styles.filtersHidden} mt-0`}>
                    {showMoreFilters &&
                    <Form.Group className={'pt-1'}>
                        <Form.Label className={`mb-0`}>
                            Cena
                        </Form.Label><br/>
                        <Form.Control
                            type={'number'}
                            className={`mt-1 ${styles.price}`}
                            placeholder={"Cena od"}
                            min={0}
                            value={priceFrom}
                            key={"priceFrom"}
                            onChange={changePriceFromHandler}
                        />-
                        <Form.Control
                            type={'number'}
                            className={`mt-1 ${styles.price}`}
                            placeholder={"Cena do"}
                            min={0}
                            value={priceTo}
                            key={"priceTo"}
                            onChange={changePriceToHandler}
                        />
                    </Form.Group>}
                    {showMoreFilters &&
                    <Form.Group>
                        <Form.Label>
                            Odległość od wybranej miejscowości
                        </Form.Label>
                        <br/>
                        <Form.Control
                            type={"number"}
                            value={distanceFromCity}
                            onChange={changeDistanceHandler}
                            className={styles.distance}
                        /> km
                        <input
                            type={"checkbox"}
                            className={styles.checkbox}
                            onChange={changeDriveToClientHandler}
                        /> dojazd do klienta
                    </Form.Group>}
                </div>
                <div className={`text-right mt-1`}>
                    <span
                        className={`${styles.moreFilters}`}
                        onClick={changeMoreFiltersVisibility}
                    >
                        Więcej filtrów
                        {showMoreFilters ?
                            <FontAwesomeIcon className={`ml-1`} icon={faAngleDoubleUp}/> :
                            <FontAwesomeIcon className={`ml-1`} icon={faAngleDoubleDown}/>}
                    </span>
                </div>
                <Button
                    variant={'secondary'}
                    className={styles.search}
                    onClick={searchAndFilterHandler}
                >
                    Szukaj
                </Button>
            </div>
        )
    };

    const servicesIcons = {
        "vet": <FontAwesomeIcon icon={faStethoscope} className={`${styles.iconSize}`}/>,
        "beh": <FontAwesomeIcon icon={faPaw} className={`${styles.iconSize}`}/>,
        "hot": <FontAwesomeIcon icon={faHome} className={`${styles.iconSize}`}/>,
        "gro": <FontAwesomeIcon icon={faCut} className={`${styles.iconSize}`}/>
    }

    const Service = (props) => {
        return (
            <div className={`py-2 row ${styles.serviceCard} ${props.index % 2 === 0 && styles.serviceSecond}`}>
                <div className={`col-2 d-flex text-center align-items-center justify-content-center`}>
                    {servicesIcons[props.type]}
                </div>
                <div className="col-7">
                    <div className={`row`}>
                        <div className={`col-7 p-0 text-left ${styles.serviceCity}`}>
                            <FontAwesomeIcon icon={faUser} /> {props.provider}
                        </div>
                        <div className={`col-5 p-0 ${styles.serviceCity} text-right`}>
                            <FontAwesomeIcon icon={faMapMarkerAlt} /> {props.city}
                        </div>
                    </div>
                    <div className={`row`}>
                        <div className={'col-12 text-center pt-2'}>
                            {props.name}
                        </div>
                    </div>
                </div>
                <div className={`col-3 d-flex text-center align-items-center justify-content-center ${styles.servicePrice}`}>
                    {props.price}
                </div>

            </div>
        );
    };

    const ServiceListHeader = () => {
        return (
            <div className={`row  ${styles.serviceListHeaderWrapper} `}>
                <div className={'col-2 text-center'}>
                    Typ
                </div>
                <div className={`col-7 text-center`}>
                    Nazwa
                </div>
                <div className={'col-3 text-center'}>
                    Cena
                </div>
            </div>
        );
    };

    const getOffers = () => {
        axios.get(API_BASE_URL + 'api/v1/offers').then((res) => {
            return res.data;
        });
    };


    return (
        <div className={`px-2 ${styles.servicesWrapper}`}>
            <header>
                <div className={"d-flex flex-row-reverse pt-2 mb-0 pb-0"}>
                    <FontAwesomeIcon
                        icon={faTimesCircle}
                        className={`${styles.closeIcon}`}
                        onClick={props.close}
                    />
                </div>
                <h2 className={`text-center mt-0 pt-0`}>Lista usług</h2>
            </header>
            <ServicesFilter/>
            <ServiceListHeader />
            {fakeData.services.map((service, index) => {
                return <Service
                    key={Math.random() + index}
                    provider={service["provider"]}
                    name={service["serviceName"]}
                    type={service["serviceType"]}
                    desc={service["serviceDesc"]}
                    price={service["servicePrice"]}
                    driving={service["drivingToClient"]}
                    drivingRadius={service["drivingRadius"]}
                    city={service["city"]}
                    index={index}
                />
            })}
        </div>
    );
};

export default ServicesList;