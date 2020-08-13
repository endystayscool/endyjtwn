import React, { useEffect, useState } from 'react';
import * as THREE from 'three';

import "./App.scss";

function App() {

  const renderer = new THREE.WebGLRenderer();
  var scene = null;
  var camera = null;

  var mesh = null;
  var group = null;
  var letterE = null;
  var letterE2 = null;
  var letterE3 = null;
  var letterE4 = null;
  var ball = null;
  var light = null;

  var mouseX = 0;
  var mouseY = 0;

  var windowHalfX = window.innerWidth / 2;
  var windowHalfY = window.innerHeight / 2;

  const [aboutClass, setAboutClass] = useState("title-about");
  const [about, setAbout] = useState("hide");
  const [close, setClose] = useState("hide");

  useEffect(() => {
    // common used
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    scene.background = new THREE.Color('#232323');
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.z = 10;

    // if (window.screen.width <= 768) { camera.position.z = 20; }
    document.body.appendChild(renderer.domElement);
    console.log(window.screen.width);
    document.addEventListener('mousemove', onDocumentMouseMove, true)

    drawLogo();
    animate();

  }, []);

  function drawLogo() {
    // big mesh background
    const geometry = new THREE.BoxGeometry(200, 200, 200);
    const materialB = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
    mesh = new THREE.Mesh(geometry, materialB);

    // plain dark grey letterE
    const geometryE = new THREE.BoxGeometry(1, 5, 1);
    const geometryE2 = new THREE.BoxGeometry(3, 1, 1);
    // const geometry = new THREE.BoxGeometry(1, 3, 1);

    const material = new THREE.MeshNormalMaterial();
    letterE = new THREE.Mesh(geometryE, material);
    letterE2 = new THREE.Mesh(geometryE2, material);
    letterE3 = new THREE.Mesh(geometryE2, material);
    letterE4 = new THREE.Mesh(geometryE2, material);
    // scene.add(letterE, letterE2, letterE3, letterE4);

    const bballGeometry = new THREE.SphereGeometry(8, 20, 20);
    const bballMaterial = new THREE.MeshBasicMaterial({ color: '#B680F3' });
    var bball = new THREE.Mesh(bballGeometry, bballMaterial);
    bball.position.z = -11;

    const ballGeometry = new THREE.SphereGeometry(6.5, 20, 20);
    const ballMaterial = new THREE.MeshBasicMaterial({ color: '#ffffff' });
    ball = new THREE.Mesh(ballGeometry, ballMaterial);
    ball.position.z = -7;

    // add light to the scene
    light = new THREE.PointLight(0xFFFF00);
    light.position.set(10, 0, 25);

    // shift letterE on the x axis
    letterE.position.x = -1.5;
    letterE2.position.x = 0.5;
    letterE2.position.y = 2;
    letterE3.position.x = 0.5;
    letterE3.position.y = -2;
    letterE4.position.x = 0.5;

    group = new THREE.Group();
    group.add(letterE);
    group.add(letterE2);
    group.add(letterE3);
    group.add(letterE4);

    scene.add(bball, ball, group, mesh, light);
  }

  function animate() {
    window.requestAnimationFrame(() => animate());
    mesh.rotation.x += 0.001;
    mesh.rotation.y += 0.002;
    renderer.render(scene, camera);

    camera.position.x += (mouseX - camera.position.x) * .05;
    camera.position.y += (- mouseY - camera.position.y) * .05;

    // rotate letterE
    letterE.rotation.y += 0.01;
    letterE2.rotation.y += 0.01;
    letterE3.rotation.y += 0.01;
    letterE4.rotation.y += 0.01;

    renderer.render(scene, camera);
  };

  function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) / 100;
    mouseY = (event.clientY - windowHalfY) / 100;
  }

  function isClicked(event) {
    setAboutClass("hide");
    setAbout("about");
    setClose("close-about");
  }

  function isClosed(event) {
    setAboutClass("title-about");
    setAbout("hide");
    setClose("hide");
  }

  return (
    <div id="root" className="App">
      <div className={aboutClass} onClick={isClicked}>
        <p>&#x27B2; Endy Jatawan</p>
      </div>
      <div className={about}>
        <p>Moin! 👋  My name is Endy, a rookie developer from Thailand, currently based in Germany. I'm a master's student in Digital Media at Bremen University and I'm also working as a Web and iOS Developer in a software company in Bremen. </p>
        <p>Before now, I worked as a Front-End Web Developer in Bangkok, Thailand for 2 years, I also took internships as a Front-End Developer and Digital Marketer in Macedonia and Ukraine 👩🏻‍💻, after I graduated in Computer Science major in Computer Graphics from Thammasat University.</p>
        <p>My obsession with technology and innovation began after I was a Student Volunteer at the SIGGRAPH conference in Macao (2016). ✨That experience enhances my interest in computer graphics, especially Creative Coding. Seeing much amazing research makes me want to create expressive and interactive technology that allows me to express my creativity together with programming skills.</p>
        <p>In my spare time, I love filming, skateboarding, surfing 🏄🏽‍♀️, sunbathing, and hanging out with my friends. I also started making music during the quarantine as well.</p>
        {/* <p>If you are interested in my profile, feel free to reach out! </p> */}
        <div className={close} onClick={isClosed}>
          <code>&#215;</code>
        </div>
      </div>

    </div>
  );
}

export default App;
