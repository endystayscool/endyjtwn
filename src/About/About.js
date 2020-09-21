import React, { useEffect, useState } from 'react';
import * as THREE from 'three';

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader.js';
import { DotScreenShader } from 'three/examples/jsm/shaders/DotScreenShader.js';

import "./About.scss";
import Header from "../Header/Header";


function About() {

    var camera, scene, renderer, composer;
    var object, light;

    const [aboutClass, setAboutClass] = useState('content');

    useEffect(() => {
        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);

        document.querySelector('#myCanvasId').appendChild(renderer.domElement);

        //

        camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.z = 400;
        camera.position.x = -200;

        scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0x000000, 1, 1000);
        scene.background = new THREE.Color('#fff');

        object = new THREE.Object3D();
        scene.add(object);

        var geometry = new THREE.SphereBufferGeometry(1, 4, 4);
        var material = new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true });

        for (var i = 0; i < 26; i++) {

            var mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
            mesh.position.multiplyScalar(Math.random() * 250);
            mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
            mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 40;
            object.add(mesh);

        }

        scene.add(new THREE.AmbientLight(0x222222));

        light = new THREE.DirectionalLight(0xffffff);
        light.position.set(1, 1, 1);
        scene.add(light);

        // postprocessing

        composer = new EffectComposer(renderer);
        composer.addPass(new RenderPass(scene, camera));

        var effect = new ShaderPass(DotScreenShader);
        effect.uniforms['scale'].value = 4;
        composer.addPass(effect);

        var effect2 = new ShaderPass(RGBShiftShader);
        effect2.uniforms['amount'].value = 0.0015;
        composer.addPass(effect2);

        //
        if (window.location.pathname !== '/about') {
            const ac = new AbortController();
            return () => ac.abort(); // Abort both fetches on unmount
        }

        //

        window.addEventListener('resize', onWindowResize, false);
        animate();
        shaking();

    }, []);

    // based
    function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
        composer.setSize(window.innerWidth, window.innerHeight);

    }

    function animate() {

        var id = requestAnimationFrame(animate);

        object.rotation.x += 0.0005;
        object.rotation.y += 0.001;

        composer.render();

        if (window.location.pathname !== '/about') {
            cancelAnimationFrame(id);
        }
    }
    // end based

    function shaking() {
        if (window.location.pathname === '/about') {
            var arrL = [];
            var arrR = [];
            var arrS = [];
            var i = 0;

            var direction = "",
                oldx = 0,
                mousemovemethod = function (e) {

                    if (e.pageX < oldx) {
                        direction = "left"
                    } else if (e.pageX > oldx) {
                        direction = "right"
                    }


                    if (direction === 'left') {
                        arrL.push(direction);
                    }
                    if (direction === 'right') {
                        arrR.push(direction);
                    }

                    if (arrL.length > 200 && arrL.length > 200) {
                        i++
                        arrS.push(i);
                        if (arrS.length > 5) {
                            arrL = [];
                            arrR = [];
                            setAboutClass('content-shaking');
                            setTimeout(() => {
                                setAboutClass('content');
                            }, 3000);
                        }
                    }
                    oldx = e.pageX;

                }

        }

        document.addEventListener('mousemove', mousemovemethod);
    }

    return (
        <>
            <div id="myCanvasId"></div>
            <Header />
            <div className="wrapper">
                <div className={aboutClass}>
                    <p>I'm Endy,
                    a Bremen based Software Developer hailing from Bangkok.
                    I'm a master's student in Digital Media at Bremen University and
                    I'm also working as a Web and iOS Developer in a software company in Bremen.
                    </p>
                    <p>
                        Before now, after I graduated in Computer Science major in Computer Graphics from Thammasat University,
                        I worked as a Front-End Web Developer in Bangkok for 2 years by using Javascript + HTML + CSS with React and Angular 👩🏻‍💻.
                        And expanded my career path to work as a Full-Stack Developer in Bangkok for 1 year using Node.js along with GCP
                        since the company is the premier partner with Google.
                        I also took internships as a Front-End Developer and Digital Marketer in Macedonia and Ukraine.
                        Those professional experiences enhance my communication, and problem-solving skills and prompted me to develop a basic understanding of the best practices in programming.
                        </p>
                    <p>
                        My obsession with technology and innovation began after I was a Student Volunteer at the SIGGRAPH conference in Macao (2016).
                        That experience enhances my interest in computer graphics, especially Creative Coding. Seeing many exceptional pieces of research
                        makes me want to create expressive and interactive technology that allows me to express my creativity together with programming skills.
                        </p>
                    <p>
                        In my spare time, I love playing billiards, skateboarding, surfing 🏄🏽‍♀️, and hanging out with my friends.
                        I am also experimenting with projection mapping on audio-visual art using Touchdesigner.
                        </p>
                </div>
            </div>
        </>
    );
}

export default About;