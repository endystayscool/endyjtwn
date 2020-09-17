import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import "./Header.scss";
import Menu from "./Menu/Menu";

import logoWeb from "./endy-logo.png";
import logoResponsive from "./endy-responsive.png";


function Header() {

    const history = useHistory();
    const [logo, setLogo] = useState(logoWeb);

    useEffect(() => {
        // handle resize window
        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    function handleResize() {
        // set responsive logo
        window.innerWidth <= 813 ? setLogo(logoResponsive) : setLogo(logoWeb);
    }

    return (
        <div className="the-header">
            <div className="header">
                <img alt="logo" className="logo" src={logo} onClick={() => { history.push('about') }} />
            </div>
            <div className="sub-header">
                <Menu />
            </div>
        </div>
    );
}

export default Header;