import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from "styled-components";
import {
    Link
} from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHamburger } from "@fortawesome/free-solid-svg-icons";


function Menu() {
    const history = useHistory();
    const types = ["about", "portfolio", "contact"];
    const [active, setActive] = useState(types[0]);
    const [isOpen, setIsOpen] = useState(true);
    const [moveDirection, setMoveDirection] = useState('');



    useEffect(() => {
        if (window.location.pathname === '/') {
            setActive(types[0]);
        } else {
            setActive(window.location.pathname.substring(1));
        }

        if (window.innerWidth > 813) {
            setIsOpen(false);
        }

    }, [types]);

    const Tab = styled.button
        `
        padding: 17px;
        cursor: pointer;
        background: white;
        border: 0;
        outline: 0;
        transition: ease border-bottom 250ms;
        font-weight: lighter;
        font-family: 'Helvetica', 'Arial', sans-serif;
        ${({ active }) => active && `animation: text-shadow-pop-top .6s both; opacity: 1;`}
        `;

    function redirectMenu(type) {
        if (type === 'about') {
            history.push('/about');
        } else if (type === 'portfolio') {
            history.push('/portfolio');
        } else if (type === 'contact') {
            history.push('contact');
        }
        setActive(window.location.pathname.substring(1));
    }

    function toggleMenu() {
        if (isOpen) {
            setIsOpen(false);
            setMoveDirection('move-left');
        } else {
            setIsOpen(true);
            setMoveDirection('move-right');
        }
    }

    return (
        <>
            {!isOpen &&

                <div className="menu">
                    {types.map(type => (
                        <Tab
                            key={type}
                            active={active === type}
                            className="sub-header-r"
                            onClick={() => { redirectMenu(type) }}
                        >
                            {type}
                        </Tab>
                    ))}
                    <Link className="sub-header-r" to="/jatawan_kruesilp_CV.pdf" target="_blank" download>resume</Link>
                </div>
            }

            <div className="hamburger" onClick={() => toggleMenu()}>
                <FontAwesomeIcon icon={faHamburger} className={moveDirection} />
            </div>
            <p />
            {/* <p> Your payment selection: {active} </p> */}
        </>
    );
}

export default Menu;