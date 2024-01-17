import React, { useEffect } from 'react';
import * as THREE from 'three';
import Ammo from 'ammojs-typed';
import Stats from 'stats.js';
import { useStore } from './store';

import { 
  createGridPlane,
  createWallX,
  createWallZ,
  createBall,
  createBeachBall,
  createBox,
  createBillboard,
  createBillboardRotated,
  johnRaoWords,
  helloWorldWords,
} from './CreateObjects';

import {
  pickPosition,
  launchClickPosition,
  getCanvasRelativePosition,
  rotateCamera,
  launchHover,
} from "./Utilities";

import {
  billboardTextures,
  boxTexture,
  inputText,
  URL,
  stoneTexture,
  woodTexture,
} from "./Textures";

import {
  simpleText,
  floatingLabel,
  allSkillsSection,
  createTextOnPlane,
} from "./Surfaces";

export const setupScene = (Ammo: any, container: HTMLDivElement) => {
  useEffect(() => {
    // Initialize Three.js scene, camera, renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Initialize stats, clocks
    const stats = new Stats();
    document.body.appendChild(stats.dom);
    const clock = new THREE.Clock();
    const galaxyClock = new THREE.Clock();

    //default transform object
    let tmpTrans = new Ammo.btTransform();

    // Function to create physics world
     const createPhysicsWorld = () => {
      const collisionConfiguration = new Ammo.btDefaultCollisionConfiguration(),
            dispatcher = new Ammo.btCollisionDispatcher(collisionConfiguration),
            overlappingPairCache = new Ammo.btDbvtBroadphase(),
            constraintSolver = new Ammo.btSequentialImpulseConstraintSolver();

      const physicsWorld = new Ammo.btDiscreteDynamicsWorld(
        dispatcher,
        overlappingPairCache,
        constraintSolver,
        collisionConfiguration
      );
      physicsWorld.setGravity(new Ammo.btVector3(0, -50, 0));

      // Use the store to set the physicsWorld
      const { setPhysicsWorld } = useStore.getState();
      setPhysicsWorld(physicsWorld);

      return physicsWorld;
    };

    // Initialize the physics world
    const physicsWorld = createPhysicsWorld();


    // Create objects in the scene
    createGridPlane(scene, Ammo);
    createWallX(scene, Ammo, 125, 1.75, 0);
    createWallX(scene, Ammo, -125, 1.75, 0);
    createWallZ(scene, Ammo, 0, 1.75, 125);
    createWallZ(scene, Ammo, 0, 1.75, -125);
    createBall(scene, Ammo);
    createBeachBall(scene, Ammo);
    createBox(scene, Ammo, 28, 2, -100, 4, 4, 1, boxTexture.Github, URL.gitHub, 0x000000, true);
    createBox(scene, Ammo, 35.1, 2, -100, 4, 4, 1, boxTexture.LinkedIn, URL.LinkedIn, 0x0077b5, true);
    createBox(scene, Ammo, 42.9, 2, -100, 4, 4, 1, boxTexture.twitter, URL.twitter, 0x00a2f4, true);
    createBox(scene, Ammo, 50.5, 2, -100, 4, 4, 1, boxTexture.mail, "mailto:johnrao23@gmail.com", 0x000000, false);
    createBillboard( scene, Ammo, -115, 2.5, -105, billboardTextures.terpSolutionsTexture, URL.terpsolutions, Math.PI * 0.2, );
    createBillboard( scene, Ammo, -80, 2.5, -110, billboardTextures.bullVsBearTexture, URL.bullVsBearTrading, Math.PI * 0.15, );
    createBillboard( scene, Ammo, -45, 2.5, -110, billboardTextures.fairbnbTexture, URL.getFairbnb, Math.PI * 0.1, );
    createBillboardRotated( scene, Ammo, -15, 1.25, -105, billboardTextures.scanAndGoTexture, URL.samsClub, Math.PI * 0.1, );
    johnRaoWords(scene, Ammo, 11.2, 1, -20);
    helloWorldWords( scene, Ammo, 11.2, 1, -20);
    createTextOnPlane( scene, -110, 0.01, -75, inputText.terpSolutionsText, 20, 40);
    createTextOnPlane(scene, -77, 0.01, -80, inputText.bullVsBearText, 20, 40);
    createTextOnPlane( scene, -45, 0.01, -80, inputText.fairbnbText, 20, 40);
    createTextOnPlane( scene, -16, 0.01, -75, inputText.scanAndGoText, 20, 40);

    // utility functions for animation loop
    function moveBall() {
      const { ballObject } = useStore.getState();
      if (!ballObject || !ballObject.userData.physicsBody) return;
      let moveDirection = { left: 0, right: 0, forward: 0, back: 0 };
      let scalingFactor = 20;
      let moveX = moveDirection.right - moveDirection.left;
      let moveZ = moveDirection.back - moveDirection.forward;
      let moveY = 0;
    
      if (ballObject.position.y < 2.01) {
        moveX = moveDirection.right - moveDirection.left;
        moveZ = moveDirection.back - moveDirection.forward;
        moveY = 0;
      } else {
        moveX = moveDirection.right - moveDirection.left;
        moveZ = moveDirection.back - moveDirection.forward;
        moveY = -0.25;
      }
    
      // no movement
      if (moveX == 0 && moveY == 0 && moveZ == 0) return;
    
      let resultantImpulse = new Ammo.btVector3(moveX, moveY, moveZ);
      resultantImpulse.op_mul(scalingFactor);
      let physicsBody = ballObject.userData.physicsBody;
      physicsBody.setLinearVelocity(resultantImpulse);
    }
    
    function updatePhysics(deltaTime: number) {
      const { physicsWorld, rigidBodies, ballObject } = useStore.getState();
      if (!physicsWorld || !ballObject) return;

      // Step world
      physicsWorld.stepSimulation(deltaTime, 10);
    
      // Update rigid bodies
      for (let i = 0; i < rigidBodies.length; i++) {
        let objThree = rigidBodies[i];
        let objAmmo = objThree.userData.physicsBody;
        let ms = objAmmo.getMotionState();
        if (ms) {
          ms.getWorldTransform(tmpTrans);
          let p = tmpTrans.getOrigin();
          let q = tmpTrans.getRotation();
          objThree.position.set(p.x(), p.y(), p.z());
          objThree.quaternion.set(q.x(), q.y(), q.z(), q.w());
        }
      }
    
      //check to see if ball escaped the plane
      if (ballObject.position.y < -50) {
        scene.remove(ballObject);
        createBall(scene, Ammo);
      }
    
      //check to see if ball is on text to rotate camera
      rotateCamera(ballObject);
    }

    // Animation loop
    const animate = () => {
      const deltaTime = clock.getDelta(); // Make sure `clock` is defined
      moveBall(); // Update ball movement
      updatePhysics(deltaTime); // Update physics
      stats.update(); // Update stats
      renderer.render(scene, camera); // Render the scene
      requestAnimationFrame(animate);
    };
    animate();
    // Cleanup function
    return () => {
      container.removeChild(renderer.domElement);
      document.body.removeChild(stats.dom);
      // ... additional cleanup
    };
  }, [Ammo, container]); // Dependencies for useEffect

  return null;
};

export default setupScene;
