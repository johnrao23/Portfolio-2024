import * as THREE from 'three';
import Ammo from 'ammojs-typed';
import { createBall } from './CreateObjects.ts';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setupScene = (Ammo: any, container: HTMLDivElement) => {
  // Initialize renderer, scene, camera
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  // Additional setup...
  
  // Create objects in the scene
  createBall(scene, Ammo); // Call createBall to add a ball to the scene

  // More object creation or setup can go here...

  // Animation loop
  const animate = () => {
    requestAnimationFrame(animate);
    // Update logic here
    renderer.render(scene, camera);
  };
  animate();

  // Return a cleanup function if necessary
};
