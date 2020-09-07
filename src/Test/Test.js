import React, { useEffect, useState } from 'react';
import * as THREE from 'three';

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { TexturePass } from 'three/examples/jsm/postprocessing/TexturePass.js';
import { ClearPass } from 'three/examples/jsm/postprocessing/ClearPass.js';
import { MaskPass, ClearMaskPass } from 'three/examples/jsm/postprocessing/MaskPass.js';
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader.js';

import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';

import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader.js';
import { DotScreenShader } from 'three/examples/jsm/shaders/DotScreenShader.js';

import "./Test.scss";


function Test() {

    var camera, scene, renderer, composer;
    var object, light;

    useEffect(() => {
        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        //

        camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.z = 400;

        scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0x000000, 1, 1000);

        object = new THREE.Object3D();
        scene.add(object);

        var geometry = new THREE.SphereBufferGeometry(1, 4, 4);
        var material = new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true });

        for (var i = 0; i < 100; i++) {

            var mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
            mesh.position.multiplyScalar(Math.random() * 400);
            mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
            mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 50;
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

        var effect = new ShaderPass(RGBShiftShader);
        effect.uniforms['amount'].value = 0.0015;
        composer.addPass(effect);

        //

        window.addEventListener('resize', onWindowResize, false);
        animate();

    }, []);

    // based
    function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
        composer.setSize(window.innerWidth, window.innerHeight);

    }

    function animate() {

        requestAnimationFrame(animate);

        object.rotation.x += 0.0005;
        object.rotation.y += 0.001;

        composer.render();

    }
    // end based

    return (
        <div className="Test">
            <a target="_blank" href="https://www.linkedin.com/in/endy-jatawan-2a7620129">
                <code className="be-back">be right back...</code>
            </a>
            {/* <a target="_blank" href="https://vimeo.com/endystayscool">
                <code className="sub-be-back">Portfolio</code>
            </a> */}
        </div>
    );
}

export default Test;