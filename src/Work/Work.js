import React, { useEffect, useState } from 'react';
import * as THREE from 'three';

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { TexturePass } from 'three/examples/jsm/postprocessing/TexturePass.js';
import { ClearPass } from 'three/examples/jsm/postprocessing/ClearPass.js';
import { MaskPass, ClearMaskPass } from 'three/examples/jsm/postprocessing/MaskPass.js';
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader.js';

import "./Work.scss";

import b from './IMG_5842.jpg';
import test from './test.jpg';
import test2 from './758px-Canestra_di_frutta_(Caravaggio).jpg';

function Work() {

    const renderer = new THREE.WebGLRenderer();
    var scene = null;
    var camera = null;

    var composer;
    var box, torus;


    useEffect(() => {
        // common used
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
        scene.background = new THREE.Color('#fbfbfb');
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.position.z = 10;

        document.body.appendChild(renderer.domElement);

        drawStuffs();
        animate();

    }, []);

    function drawStuffs() {
        // var scene1 = new THREE.Scene();
        var scene2 = new THREE.Scene();

        // box = new THREE.Mesh(new THREE.BoxBufferGeometry(4, 4, 4));
        // scene1.add(box);
        var loader = new THREE.FontLoader();

        torus = new THREE.Mesh(new THREE.CircleBufferGeometry(10, 40));
        scene2.add(torus);

        renderer.setClearColor(0x000000);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.autoClear = false;
        document.body.appendChild(renderer.domElement);

        //

        var clearPass = new ClearPass();

        var clearMaskPass = new ClearMaskPass();

        // var maskPass1 = new MaskPass(scene1, camera);
        var maskPass2 = new MaskPass(scene2, camera);

        // var texture1 = new THREE.TextureLoader().load(b);
        // texture1.minFilter = THREE.LinearFilter;
        var texture2 = new THREE.TextureLoader().load(b);

        // var texturePass1 = new TexturePass(texture1);
        var texturePass2 = new TexturePass(texture2);

        var outputPass = new ShaderPass(CopyShader);

        var parameters = {
            minFilter: THREE.LinearFilter,
            magFilter: THREE.LinearFilter,
            format: THREE.RGBFormat,
            stencilBuffer: true
        };

        var renderTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, parameters);

        composer = new EffectComposer(renderer, renderTarget);
        composer.addPass(clearPass);
        // composer.addPass(maskPass1);
        // composer.addPass(texturePass1);
        // composer.addPass(clearMaskPass);
        composer.addPass(maskPass2);
        composer.addPass(texturePass2);
        composer.addPass(clearMaskPass);
        composer.addPass(outputPass);

        window.addEventListener('resize', onWindowResize, false);
    }


    function onWindowResize() {

        var width = window.innerWidth;
        var height = window.innerHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
        composer.setSize(width, height);

    }

    function animate() {
        requestAnimationFrame(animate);

        var time = performance.now() * 0.001 + 6000;

        // box.position.x = Math.cos(time / 1.5) * 2;
        // box.position.y = Math.sin(time) * 2;
        // box.rotation.x = time;
        // box.rotation.y = time / 2;

        torus.position.x = Math.cos(time) * 2;
        torus.position.y = Math.sin(time / 1.5) * 2;
        torus.rotation.x = time / 5;
        torus.rotation.y = time / 5;

        renderer.clear();
        composer.render(time);
    };

    return (
        <div className="Work">
            <code className="be-back">I'll be back.</code>
        </div>
    );
}

export default Work;