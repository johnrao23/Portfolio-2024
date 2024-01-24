import React, { useEffect } from 'react';
import * as THREE from 'three';
import Stats from 'stats.js';
import { useStore } from './store';

import { 
  addDirectionalLight,
  addHemisphereLight,
  addParticles,
  generateGalaxy,
  glowingParticles,
  moveParticles,
  createLensFlare,
} from './World';

import {
  isTouchscreenDevice,
  createJoystick,
  setupEventHandlers,
} from './EventHandlers'

import { 
  createGridPlane,
  createWallX,
  createWallZ,
  createBall,
  createBox,
  createBillboard,
  createBillboardRotated,
  johnRaoWords,
  helloWorldWords,
  wallOfBricks,
  createTriangle,
  loadJohnText,
  loadEngineerText,
  loadHelloWorldText,
} from './CreateObjects';

import { rotateCamera } from "./Utilities";

import {
  billboardTextures,
  boxTexture,
  inputText,
  URL,
} from "./Textures";

import {
  simpleText,
  floatingLabel,
  allSkillsSection,
  createTextOnPlane,
} from "./Surfaces";

export const useSetupScene = (Ammo: any, container: HTMLDivElement | null, onLoaded: () => void) => {
  console.log("setupScene started");

  useEffect(() => {
    if (!Ammo || !container) return;
    const loadingManager = new THREE.LoadingManager();

    loadingManager.onLoad = function () {
      onLoaded(); 
      console.log("setupScene completed and onLoaded called");
    };
    
    setupEventHandlers();

    // Determine device user is using to access app
    if (isTouchscreenDevice()) {
      const joystickWrapper = document.getElementById("joystick-wrapper");
      if (joystickWrapper) {
        createJoystick(joystickWrapper);
        joystickWrapper.style.visibility = "visible";
      }
    }

    let touchText, instructionsText;

    if (isTouchscreenDevice()) {
      touchText = "Touch boxes with your \nfinger to open links";
      instructionsText =
        "   Use the joystick in the bottom \nleft of the screen to move the ball.";
    } else {
      touchText = "Click on boxes with \nthe mouse to open links";
      instructionsText =
        "Use the arrow keys on your \n keyboard to move the ball.";
    }

    // Initialize Three.js scene, camera, renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 5000 );
    camera.position.set(0, 30, 70);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Initialize stats, clocks
    const stats = new Stats();
    document.body.appendChild(stats.dom);
    const clock = new THREE.Clock();
    const galaxyClock = new THREE.Clock();

    // add lighting to scene
    addHemisphereLight(scene);
    addDirectionalLight(scene);

    createLensFlare(scene, 50, -50, -800, 200, 200, boxTexture.lensFlareMain);

    // add background effects to scene
    addParticles(scene);
    glowingParticles(scene);
    generateGalaxy(scene, renderer);

    //Setup the renderer
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true;

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
    };

    // Initialize the physics world
    createPhysicsWorld();


    // Adding objects to the scene
    createGridPlane(scene, Ammo);
    createWallX(scene, Ammo, 125, 1.75, 0);
    createWallX(scene, Ammo, -125, 1.75, 0);
    createWallZ(scene, Ammo, 0, 1.75, 125);
    createWallZ(scene, Ammo, 0, 1.75, -125);
    createBall(scene, Ammo, loadingManager);
    createBox(scene, Ammo, loadingManager, 28, 2, -100, 4, 4, 1, boxTexture.Github, URL.gitHub, 0x000000, true);
    createBox(scene, Ammo, loadingManager, 35.1, 2, -100, 4, 4, 1, boxTexture.LinkedIn, URL.LinkedIn, 0x0077b5, true);
    createBox(scene, Ammo, loadingManager, 42.9, 2, -100, 4, 4, 1, boxTexture.twitter, URL.twitter, 0x00a2f4, true);
    createBox(scene, Ammo, loadingManager, 50.5, 2, -100, 4, 4, 1, boxTexture.mail, "mailto:johnrao23@gmail.com", 0x000000, false);
    createBillboard( scene, Ammo, loadingManager, -115, 2.5, -105, billboardTextures.terpSolutionsTexture, URL.terpsolutions, Math.PI * 0.2, );
    createBillboard( scene, Ammo, loadingManager, -80, 2.5, -110, billboardTextures.bullVsBearTexture, URL.bullVsBearTrading, Math.PI * 0.15, );
    createBillboard( scene, Ammo, loadingManager, -45, 2.5, -110, billboardTextures.fairbnbTexture, URL.getFairbnb, Math.PI * 0.1, );
    createBillboardRotated( scene, Ammo, loadingManager, -15, 1.25, -105, billboardTextures.scanAndGoTexture, URL.samsClub, Math.PI * 0.1, );
    johnRaoWords(scene, Ammo, 11.2, 1, -20);
    helloWorldWords( scene, Ammo, 11.2, 1, -20);
    loadJohnText(scene);
    loadEngineerText(scene);
    loadHelloWorldText(scene);
    createTextOnPlane( scene, loadingManager, -110, 0.01, -75, inputText.terpSolutionsText, 20, 40);
    createTextOnPlane(scene, loadingManager, -77, 0.01, -80, inputText.bullVsBearText, 20, 40);
    createTextOnPlane( scene, loadingManager, -45, 0.01, -80, inputText.fairbnbText, 20, 40);
    createTextOnPlane( scene, loadingManager, -16, 0.01, -75, inputText.scanAndGoText, 20, 40);
    floatingLabel(scene, 27.875, 4.5, -100, "Github");
    floatingLabel(scene, 34.86, 4.5, -100, "LinkedIn");
    floatingLabel(scene, 42.875, 4.5, -100, "Twitter");
    floatingLabel(scene, 50.26, 4.5, -100, "Email");
    allSkillsSection(scene, loadingManager, -60, 0.025, 20, 40, 40, boxTexture.allSkills);
    allSkillsSection(scene, loadingManager, 75, 0.025, 25, 30, 60, inputText.activities);
    allSkillsSection(scene, loadingManager, 8.75, 0.025, 62, 17, 20, boxTexture.lucasNoah);
    allSkillsSection(scene, loadingManager, 9, 0.01, 40, 20, 20, boxTexture.familyText);
    allSkillsSection(scene, loadingManager, 9, 0.01, 20, 21, 10.5, inputText.staticPortfolio);
    simpleText(scene, 9, 0.01, 5, instructionsText, 1.25);
    simpleText(scene, 39, 0.01, -83, touchText, 1.5);
    simpleText(scene, -60, 0.01, -5, "SKILLS", 3);
    simpleText(scene, -60, 0.01, -55, "EXPERIENCE & PROJECTS", 3);
    simpleText(scene, 75, 0.01, -10, "TIMELINE", 3);
    wallOfBricks(scene, Ammo, loadingManager);
    createTriangle(scene, Ammo, 88, -75);
    createTriangle(scene, Ammo, 88, -71);
    createTriangle(scene, Ammo, 88, -67);
    createTriangle(scene, Ammo, 88, -63);
    createTriangle(scene, Ammo, 88, -59);
    createTriangle(scene, Ammo, 88, -55);

    // utility functions for animation loop
    let isAnimating = true;

    function moveBall() {
      const { ballObject, moveDirection } = useStore.getState();
      if (!ballObject || !ballObject.userData.physicsBody) return;
    
      let scalingFactor = 20;
      let moveX = moveDirection.right - moveDirection.left;
      let moveZ = moveDirection.back - moveDirection.forward;
      let moveY = 0;
    
      if (ballObject.position.y < 2.01) {
        moveY = 0;
      } else {
        moveY = -0.25;
      }
    
      // no movement
      if (moveX === 0 && moveY === 0 && moveZ === 0) return;
    
      let resultantImpulse = new Ammo.btVector3(moveX, moveY, moveZ);
      resultantImpulse.op_mul(scalingFactor);
      let physicsBody = ballObject.userData.physicsBody;
      physicsBody.setLinearVelocity(resultantImpulse);
    }    
    
    function updatePhysics(deltaTime: number) {
      try {
        const { physicsWorld, rigidBodies, ballObject } = useStore.getState();
        if (!physicsWorld || !ballObject || !ballObject.userData || !ballObject.userData.physicsBody) {
          console.error("Missing or incomplete elements in physics update", { physicsWorld, ballObject });
          return;
        }
    
      // Step world
      physicsWorld.stepSimulation(deltaTime, 10);
    
      // Update rigid bodies
      for (let i = 0; i < rigidBodies.length; i++) {
        let objThree = rigidBodies[i];
        let objAmmo = objThree.userData.physicsBody;
        if (objAmmo) {
          let ms = objAmmo.getMotionState();
          if (ms) {
            ms.getWorldTransform(tmpTrans);
            let p = tmpTrans.getOrigin();
            let q = tmpTrans.getRotation();
            objThree.position.set(p.x(), p.y(), p.z());
            objThree.quaternion.set(q.x(), q.y(), q.z(), q.w());
          }
        }
      }
    
    // Check to see if ball escaped the plane
    if (ballObject.position.y < -50) {
      const { physicsWorld } = useStore.getState();
      
      // Remove the ball from the physics world
      if (ballObject.userData.physicsBody) {
        physicsWorld.removeRigidBody(ballObject.userData.physicsBody);
      }

      // Remove the ball from the scene
      scene.remove(ballObject);

      // Reset the ballObject in the store to null
      useStore.setState({ ballObject: null });

      // Create a new ball
      createBall(scene, Ammo, loadingManager);
    }
      
        //check to see if ball is on text to rotate camera
        rotateCamera(ballObject);
      } catch (error) {
        const { ballObject } = useStore.getState();
        console.error("Error in updatePhysics:", error, { ballObject });
        isAnimating = false; // Stop animation loop on error
      }
    }

      // Animation loop
      const animate = () => {
        if (!isAnimating) return; // Stop the animation loop if flag is false
        requestAnimationFrame(animate);
    
        try {
          stats.begin();
          const deltaTime = clock.getDelta();
          moveBall();
          updatePhysics(deltaTime);
          moveParticles();
          renderer.render(scene, camera);
          stats.end();
        } catch (error) {
          console.error("Error in animate loop:", error);
          isAnimating = false; // Stop animation loop on error
        }
      };
      animate();
      
      return () => {
        isAnimating = false; // Ensure animation loop is stopped when component is unmounted
        container.removeChild(renderer.domElement);
        document.body.removeChild(stats.dom);
        const joystickWrapper = document.getElementById("joystick-wrapper");
        if (joystickWrapper) {
          joystickWrapper.style.visibility = "hidden";
          joystickWrapper.innerHTML = "";
        }
      }
  }, [Ammo, container, onLoaded]);
}
