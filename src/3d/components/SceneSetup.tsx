import * as THREE from 'three';
import Ammo from 'ammojs-typed';
import { useStore } from './store';

import { 
  createBall,
  createBeachBall,
  createBox,
  johnRaoWords,
} from './CreateObjects';

import {
  billboardTextures,
  boxTexture,
  inputText,
  URL,
  stoneTexture,
  woodTexture,
} from "./Textures";

export const setupScene = (Ammo: any, container: HTMLDivElement) => {
  // Initialize renderer, scene, camera
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  // Function to create physics world
  function createPhysicsWorld() {
    let collisionConfiguration = new Ammo.btDefaultCollisionConfiguration(),
        dispatcher = new Ammo.btCollisionDispatcher(collisionConfiguration),
        overlappingPairCache = new Ammo.btDbvtBroadphase(),
        constraintSolver = new Ammo.btSequentialImpulseConstraintSolver();

    let physicsWorld = new Ammo.btDiscreteDynamicsWorld(
      dispatcher,
      overlappingPairCache,
      constraintSolver,
      collisionConfiguration
    );
    physicsWorld.setGravity(new Ammo.btVector3(0, -50, 0));

    // Use the store to set the physicsWorld
    const { setPhysicsWorld } = useStore.getState();
    setPhysicsWorld(physicsWorld);
  }

  // Initialize the physics world
  createPhysicsWorld();

  // Create objects in the scene
  createBall(scene, Ammo);
  createBeachBall(scene, Ammo);
  createBox(scene, Ammo, 28, 2, -100, 4, 4, 1, boxTexture.Github, URL.gitHub, 0x000000, true);
  createBox(scene, Ammo, 35.1, 2, -100, 4, 4, 1, boxTexture.LinkedIn, URL.LinkedIn, 0x0077b5, true);
  johnRaoWords(scene, Ammo, 11.2, 1, -20);


  // Animation loop
  const animate = () => {
    requestAnimationFrame(animate);
    // Update logic here
    renderer.render(scene, camera);
  };
  animate();

  // Return a cleanup function if necessary
  return () => {
    // Cleanup logic here
  };
};

export default setupScene;
