import React, { useEffect } from 'react';
import * as THREE from 'three';

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

  useEffect(() => {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    scene.background = new THREE.Color('#ECF0F1');
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.z = 10;

    // if (window.screen.width <= 768) { camera.position.z = 20; }
    document.body.appendChild(renderer.domElement);

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

    const ballGeometry = new THREE.SphereGeometry(6.5, 20, 20);
    const ballMaterial = new THREE.MeshBasicMaterial({ color: '#ffffff' });
    ball = new THREE.Mesh(ballGeometry, ballMaterial);
    ball.position.z = -10;

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

    scene.add(ball, group, mesh, light);

    var animate = function () {
      window.requestAnimationFrame(() => animate());
      mesh.rotation.x += 0.001;
      mesh.rotation.y += 0.002;
      renderer.render(scene, camera);

      // rotate letterE
      letterE.rotation.y += 0.01;
      letterE2.rotation.y += 0.01;
      letterE3.rotation.y += 0.01;
      letterE4.rotation.y += 0.01;

      renderer.render(scene, camera);
    };
    animate();

  }, []);


  return (
    <div id="root" className="App"></div>
  );
}

export default App;
