// import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
// import * as THREE from 'three';

// import "./Main.scss";

// function Main() {

//     const renderer = new THREE.WebGLRenderer();
//     var scene = null;
//     var camera = null;

//     var groupE = null;
//     var letterE = null;
//     var letterE2 = null;
//     var letterE3 = null;
//     var letterE4 = null;
//     var groupN = null;
//     var letterN = null;
//     var letterN2 = null;
//     var letterN3 = null;
//     var light = null;

//     var mouseX = 0;
//     var mouseY = 0;

//     var windowHalfX = window.innerWidth / 2;
//     var windowHalfY = window.innerHeight / 2;

//     const history = useHistory();
//     const [aboutClass, setAboutClass] = useState("title-about");
//     const [about, setAbout] = useState("hide");
//     const [close, setClose] = useState("hide");

//     useEffect(() => {
//         // common used
//         scene = new THREE.Scene();
//         camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
//         scene.background = new THREE.Color('#fbfbfb');
//         renderer.setSize(window.innerWidth, window.innerHeight);
//         camera.position.z = 10;

//         // if (window.screen.width <= 768) { camera.position.z = 20; }
//         document.body.appendChild(renderer.domElement);
//         console.log(window.screen.width);
//         document.addEventListener('mousemove', onDocumentMouseMove, true)

//         drawLogo();
//         animate();

//     }, []);

//     function drawLogo() {
//         // plain dark grey letterE
//         const geometryE = new THREE.BoxGeometry(1, 5, 1);
//         const geometryE2 = new THREE.BoxGeometry(3, 1, 1);
//         const material = new THREE.MeshNormalMaterial();
//         letterE = new THREE.Mesh(geometryE, material);
//         letterE2 = new THREE.Mesh(geometryE2, material);
//         letterE3 = new THREE.Mesh(geometryE2, material);
//         letterE4 = new THREE.Mesh(geometryE2, material);

//         // plain dark grey letterE
//         const geometryN = new THREE.BoxGeometry(1, 5, 1);
//         const geometryN2 = new THREE.BoxGeometry(5, 1, 1);
//         letterN = new THREE.Mesh(geometryN, material);
//         letterN2 = new THREE.Mesh(geometryN2, material);
//         letterN3 = new THREE.Mesh(geometryN, material);

//         // const bballGeometry = new THREE.SphereGeometry(8, 20, 20);
//         // const bballMaterial = new THREE.MeshBasicMaterial({ color: '#B680F3' });
//         // var bball = new THREE.Mesh(bballGeometry, bballMaterial);
//         // bball.position.z = -11;

//         // const ballGeometry = new THREE.SphereGeometry(6.5, 20, 20);
//         // const ballMaterial = new THREE.MeshBasicMaterial({ color: '#fbfbfb' });
//         // ball = new THREE.Mesh(ballGeometry, ballMaterial);
//         // ball.position.z = -7;

//         // add light to the scene
//         light = new THREE.PointLight(0xFFFF00);
//         light.position.set(10, 0, 25);

//         // shift letter E on the x axis
//         letterE.position.x = -1.5;
//         letterE2.position.x = 0.5;
//         letterE2.position.y = 2;
//         letterE3.position.x = 0.5;
//         letterE3.position.y = -2;
//         letterE4.position.x = 0.5;

//         // shift letter N on the x axis
//         letterN.position.x = -1.5;
//         letterN2.rotation.z = 5.3;
//         letterN3.position.x = 1.5;

//         groupE = new THREE.Group();
//         groupE.add(letterE);
//         groupE.add(letterE2);
//         groupE.add(letterE3);
//         groupE.add(letterE4);

//         groupN = new THREE.Group();
//         groupN.add(letterN);
//         groupN.add(letterN2);
//         groupN.add(letterN3);

//         groupE.position.x = -4;
//         groupE.position.y = -4;
//         groupE.rotation.y = 1;

//         groupN.position.x = -1.5;
//         groupN.position.y = -4;
//         groupN.position.z = -4;
//         groupN.rotation.y = 1;

//         scene.add(groupE, groupN, light);
//         window.addEventListener('resize', onWindowResize, false);
//     }

//     function onWindowResize() {

//         var width = window.innerWidth;
//         var height = window.innerHeight;

//         camera.aspect = width / height;
//         camera.updateProjectionMatrix();

//         renderer.setSize(width, height);
//     }

//     function animate() {
//         window.requestAnimationFrame(() => animate());
//         renderer.render(scene, camera);

//         camera.position.x += (mouseX - camera.position.x) * .05;
//         camera.position.y += (- mouseY - camera.position.y) * .05;

//         // rotate letterE
//         // letterE.rotation.y += 0.005;
//         // letterE2.rotation.y += 0.005;
//         // letterE3.rotation.y += 0.005;
//         // letterE4.rotation.y += 0.005;

//         renderer.render(scene, camera);
//     };

//     function onDocumentMouseMove(event) {
//         mouseX = (event.clientX - windowHalfX) / 100;
//         mouseY = (event.clientY - windowHalfY) / 100;
//     }

//     function isClicked(event) {
//         setAboutClass("hide");
//         setAbout("about");
//         setClose("close-about");
//     }

//     function isClosed(event) {
//         setAboutClass("title-about");
//         setAbout("hide");
//         setClose("hide");
//     }

//     return (
//         <div id="root" className="Main">
//             <div className={aboutClass} onClick={isClicked}>
//                 <p>&#x27B2; Endy Jatawan</p>
//             </div>
//             <div className={about}>
//                 <p>Moin! 👋  My name is <a href="https://drive.google.com/file/d/1tnBWIrfmrNYceC1ndgjodLy74m4ZYQcn/view?usp=sharing" target="_blank">Endy</a>, a rookie developer from Thailand, currently based in Germany. I'm a master's student in Digital Media at Bremen University and I'm also working as a Web and iOS Developer in a software company in Bremen. </p>
//                 <p>Before now, I worked as a Front-End Web Developer in Bangkok, Thailand for 2 years, I also took internships as a Front-End Developer and Digital Marketer in Macedonia and <a href="https://vimeo.com/447637884" target="_blank">Ukraine</a> 👩🏻‍💻, after I graduated in Computer Science major in Computer Graphics from Thammasat University.</p>
//                 <p>My obsession with technology and innovation began after I was a Student Volunteer at the SIGGRAPH conference in Macao (2016). ✨That experience enhances my interest in computer graphics, especially Creative Coding. Seeing much amazing research makes me want to create <a className="link-to-works" onClick={() => history.push('/works')} target="_blank">expressive</a> and <a href="https://vimeo.com/437614715" target="_blank">interactive technology</a> that allows me to express my creativity together with programming skills.</p>
//                 <p>In my spare time, I love filming, skateboarding, surfing 🏄🏽‍♀️, sunbathing, and hanging out with my friends. I also started making <a href="https://soundcloud.com/user-828959449" target="_blank">music</a> during the quarantine as well.</p>
//                 {/* <p>If you are interested in my profile, feel free to reach out! </p> */}
//                 <div className={close} onClick={isClosed}>
//                     <code>&#215;</code>
//                 </div>
//             </div>

//         </div>
//     );
// }

// export default Main;

// under construction mode
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as THREE from 'three';

import "./Main.scss";

function Main() {
    const [background, setBackground] = useState('#232323');

    function mouseMovement(e) {
        e.clientX <= window.innerWidth / 2 ? setBackground('#fff') : setBackground('#232323');
    }

    return (
        <div id="root" className="be-back" style={{ background: background }} onMouseMove={mouseMovement}>
            <code>I'll be back.</code>
        </div>
    );
}

export default Main;
// end of under construction mode