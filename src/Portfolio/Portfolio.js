import React, { useEffect, useState } from 'react';
import * as THREE from 'three';

import "./Portfolio.scss";
import Header from "../Header/Header";

function Portfolio() {

    useEffect(() => {
    }, []);

    return (
        <>
            {/* <div id="myCanvasIdPort"></div> */}
            <Header />
            <div className="wrap">
                <div className="content">
                    <p>
                        My works, playgrounds, and experiments. 👩🏻‍🔬
                    </p>
                </div>
            </div>
            <div className="wrapper">
                <iframe src="https://player.vimeo.com/video/437614715" width="720" height="480" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
                <iframe src="https://player.vimeo.com/video/437607849" width="720" height="480" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
                <iframe src="https://player.vimeo.com/video/454189164" width="720" height="480" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
            </div>
        </>
    );
}

export default Portfolio;