import * as THREE from 'three';
import Stats from 'stats.js';
import { useStore, MoveDirection } from './store';

import { 
  addDirectionalLight,
  addHemisphereLight,
  addParticles,
  generateGalaxy,
  glowingParticles,
  moveParticles,
  createLensFlare,
  createSkyEffect,
} from './World';

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

import { rotateCamera, BallPosition } from "./Utilities";

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

type SetupSceneProps = {
  container: HTMLDivElement | null;
  Ammo: any;
  setPhysicsWorld: (world: any) => void;
  onLoaded: () => void;
};

export const setupScene = ({
  container,
  Ammo,
  setPhysicsWorld,
  onLoaded
}: SetupSceneProps) => {
  console.log("setupScene started. Ammo available:", !!Ammo, "Container available:", !!container);

  if (!container || !Ammo) {
    console.log("Exiting setupScene early due to missing container or Ammo");
    return;
  }

  const manager = new THREE.LoadingManager();
  manager.onError = (url) => console.error(`There was an error loading ${url}`);
  manager.onLoad = () => {
    console.log("All assets loaded");
    onLoaded();
  };
  

  // Initialize Three.js scene, camera, renderer
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000).convertLinearToSRGB();
  const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 5000 );
  camera.position.set(0, 30, 70);
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  container.appendChild(renderer.domElement);

  //Setup the renderer
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = true;

  // Initialize stats, clocks
  const stats = new Stats();
  container.appendChild(stats.dom);
  const clock = new THREE.Clock();
  const galaxyClock = new THREE.Clock();
  galaxyClock.start();

  useStore.setState({ scene, camera, renderer, manager });

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

    setPhysicsWorld(physicsWorld);
  };

  // Initialize the physics world
  if (Ammo) {
    createPhysicsWorld();
  } else {
    console.error("Ammo.js is not initialized");
    return;
  }
  
   // add lighting to scene
  addHemisphereLight(scene);
  addDirectionalLight(scene);

  createLensFlare(scene, 50, -50, -800, 200, 200, boxTexture.lensFlareMain);

  // add background effects to scene
  addParticles(scene);
  glowingParticles(scene, manager);
  generateGalaxy(scene, renderer);
  createSkyEffect(scene)

  // Adding objects to the scene
  createGridPlane(scene, Ammo);
  createWallX(scene, Ammo, 125, 1.75, 0);
  createWallX(scene, Ammo, -125, 1.75, 0);
  createWallZ(scene, Ammo, 0, 1.75, 125);
  createWallZ(scene, Ammo, 0, 1.75, -125);
  createBall(scene, Ammo, manager);
  createBox(scene, Ammo, manager, 20, 2, -100, 4, 4, 1, boxTexture.StaticSite, URL.johnrao, 0xFFFFFF, true);
  createBox(scene, Ammo, manager, 28, 2, -100, 4, 4, 1, boxTexture.Github, URL.gitHub, 0x000000, true);
  createBox(scene, Ammo, manager, 35.1, 2, -100, 4, 4, 1, boxTexture.LinkedIn, URL.LinkedIn, 0x0077b5, true);
  createBox(scene, Ammo, manager, 42.9, 2, -100, 4, 4, 1, boxTexture.twitter, URL.twitter, 0x00a2f4, true);
  createBox(scene, Ammo, manager, 50.5, 2, -100, 4, 4, 1, boxTexture.mail, "mailto:johnrao23@gmail.com", 0x000000, false);
  createBillboard(scene, Ammo, manager, -115, 2.5, -105, billboardTextures.terpSolutionsTexture, URL.terpsolutions, Math.PI * 0.2, );
  createBillboard(scene, Ammo, manager, -80, 2.5, -110, billboardTextures.bullVsBearTexture, URL.bullVsBearTrading, Math.PI * 0.15, );
  createBillboard(scene, Ammo, manager, -45, 2.5, -110, billboardTextures.fairbnbTexture, URL.getFairbnb, Math.PI * 0.1, );
  createBillboardRotated( scene, Ammo, manager, -15, 1.25, -105, billboardTextures.scanAndGoTexture, URL.samsClub, Math.PI * 0.1, );
  johnRaoWords(scene, Ammo, 11.2, 1, -20);
  helloWorldWords(scene, Ammo, 11.2, 1, -20);
  loadJohnText(scene);
  loadEngineerText(scene);
  loadHelloWorldText(scene);
  createTextOnPlane( scene, manager, -110, 0.01, -75, inputText.terpSolutionsText, 20, 40);
  createTextOnPlane(scene, manager, -77, 0.01, -80, inputText.bullVsBearText, 20, 40);
  createTextOnPlane( scene, manager, -45, 0.01, -80, inputText.fairbnbText, 20, 40);
  createTextOnPlane( scene, manager, -16, 0.01, -75, inputText.scanAndGoText, 20, 40);
  floatingLabel(scene, 27.875, 4.5, -100, "Github");
  floatingLabel(scene, 34.86, 4.5, -100, "LinkedIn");
  floatingLabel(scene, 42.875, 4.5, -100, "Twitter");
  floatingLabel(scene, 50.26, 4.5, -100, "Email");
  allSkillsSection(scene, manager, -60, 0.025, 20, 40, 40, boxTexture.allSkills);
  allSkillsSection(scene, manager, 75, 0.025, 25, 30, 60, inputText.activities);
  allSkillsSection(scene, manager, 8.75, 0.025, 62, 17, 20, boxTexture.lucasNoah);
  allSkillsSection(scene, manager, 9, 0.01, 40, 20, 20, boxTexture.familyText);
  allSkillsSection(scene, manager, 9, 0.01, 20, 21, 10.5, inputText.staticPortfolio);
  simpleText(scene, -60, 0.01, -5, "SKILLS", 3);
  simpleText(scene, -60, 0.01, -55, "EXPERIENCE & PROJECTS", 3);
  simpleText(scene, 75, 0.01, -10, "TIMELINE", 3);
  wallOfBricks(scene, Ammo, manager);
  createTriangle(scene, Ammo, 88, -75);
  createTriangle(scene, Ammo, 88, -71);
  createTriangle(scene, Ammo, 88, -67);
  createTriangle(scene, Ammo, 88, -63);
  createTriangle(scene, Ammo, 88, -59);
  createTriangle(scene, Ammo, 88, -55);

  // utility functions for animation loop
  let isAnimating = true;

  function moveBall(ballObject: THREE.Mesh, moveDirection: MoveDirection) {
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
  
    if (moveX === 0 && moveY === 0 && moveZ === 0) return;
  
    let resultantImpulse = new Ammo.btVector3(moveX, moveY, moveZ);
    resultantImpulse.op_mul(scalingFactor);
    let physicsBody = ballObject.userData.physicsBody;
    physicsBody.setLinearVelocity(resultantImpulse);
}
  
  function updatePhysics(deltaTime: number, ballObject: THREE.Mesh) {
    const physicsWorld = useStore.getState().physicsWorld;
    const rigidBodies = useStore.getState().rigidBodies;

    try {
      // Check for missing or incomplete elements
      if (!physicsWorld || !ballObject || !ballObject.userData || !ballObject.userData.physicsBody) {
        console.error("Missing or incomplete elements in physics update", { physicsWorld, ballObject });
        return;
      }

      // Step the physics world
      physicsWorld.stepSimulation(deltaTime, 10);

      // Update each rigid body
      for (let i = 0; i < rigidBodies.length; i++) {
        let objThree = rigidBodies[i];
        if (!objThree.userData.physicsBody) {
          console.error('Missing physicsBody for object:', objThree);
          continue;
        }
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
  
    // Check if the ball escaped the plane
    if (ballObject.position.y < -50) {
      const { recreateBall } = useStore.getState();

      if (ballObject.userData.physicsBody) {
        physicsWorld.removeRigidBody(ballObject.userData.physicsBody);
      }
      scene.remove(ballObject);

      if (!recreateBall) {
        useStore.setState({ ballObject: null, recreateBall: true });

        // Delay before recreating the ball
        setTimeout(() => {
          createBall(scene, Ammo, manager);
          useStore.setState({ recreateBall: false });
        }, 1000); // Delay of 1 second
      }
    }

    const ballPosition: BallPosition = {
      position: {
        x: ballObject.position.x,
        y: ballObject.position.y,
        z: ballObject.position.z
      }
    };

    //check to see if ball is on text to rotate camera
    rotateCamera(ballPosition, camera);
    
    } catch (error) {
      const { ballObject } = useStore.getState();
      console.error("Error in updatePhysics:", error, { ballObject });
      isAnimating = false; // Stop animation loop on error
    }
  }

  // Animation loop
  const animate = () => {
    if (!isAnimating) return;
    requestAnimationFrame(animate);

    try {
      stats.begin();
      const deltaTime = clock.getDelta();
      const elapsedTime = galaxyClock.getElapsedTime() + 150;
      const galaxyMaterial = useStore.getState().galaxyMaterial;
      const { ballObject, moveDirection, physicsWorld, rigidBodies } = useStore.getState();

      if (ballObject) {
        moveBall(ballObject, moveDirection);
        updatePhysics(deltaTime, ballObject);
      }

      if (galaxyMaterial) {
        galaxyMaterial.uniforms.uTime.value = elapsedTime * 5;
      }

      moveParticles(clock);
      renderer.render(scene, camera);
      stats.end();
    } catch (error) {
      console.error("Error in animate loop:", error);
      isAnimating = false;
    }
  };
  animate();
  
  return () => {
    isAnimating = false; // Ensure animation loop is stopped when component is unmounted
    if (container && container.contains(renderer.domElement)) {
      container.removeChild(renderer.domElement);
    }
    if (container.contains(stats.dom)) {
      container.removeChild(stats.dom);
    }
  };
}