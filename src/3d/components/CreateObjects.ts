import * as THREE from 'three';
import { useStore } from './store';
import { manager } from '../resources/world';

const ballObject = null;
const cursorHoverObjects = [];
const objectsWithLinks = [];
const STATE = { DISABLE_DEACTIVATION: 4 };

export const createBall = (scene: THREE.Scene, Ammo: any) => {
    let pos = { x: 8.75, y: 0, z: 0 };
    let radius = 2;
    let quat = { x: 0, y: 0, z: 0, w: 1 };
    let mass = 3;

    var marble_loader = new THREE.TextureLoader(manager);
    var marbleTexture = marble_loader.load("../assets/earth.jpg");
    marbleTexture.wrapS = marbleTexture.wrapT = THREE.RepeatWrapping;
    marbleTexture.repeat.set(1, 1);
    marbleTexture.anisotropy = 1;
    marbleTexture.encoding = THREE.sRGBEncoding;

    //threeJS Section
    let ball = (ballObject = new THREE.Mesh(
      new THREE.SphereGeometry(radius, 32, 32),
      new THREE.MeshLambertMaterial({ map: marbleTexture }),
    ));

    ball.geometry.computeBoundingSphere();
    ball.geometry.computeBoundingBox();

    ball.position.set(pos.x, pos.y, pos.z);

    ball.castShadow = true;
    ball.receiveShadow = true;

    scene.add(ball);

    //Ammojs Section
    let transform = new Ammo.btTransform();
    transform.setIdentity();
    transform.setOrigin(new Ammo.btVector3(pos.x, pos.y, pos.z));
    transform.setRotation(
      new Ammo.btQuaternion(quat.x, quat.y, quat.z, quat.w),
    );
    let motionState = new Ammo.btDefaultMotionState(transform);

    let colShape = new Ammo.btSphereShape(radius);
    colShape.setMargin(0.05);

    let localInertia = new Ammo.btVector3(0, 0, 0);
    colShape.calculateLocalInertia(mass, localInertia);

    let rbInfo = new Ammo.btRigidBodyConstructionInfo(
      mass,
      motionState,
      colShape,
      localInertia,
    );
    let body = new Ammo.btRigidBody(rbInfo);
    //body.setFriction(4);
    body.setRollingFriction(10);

    //set ball friction

    //once state is set to disable, dynamic interaction no longer calculated
    body.setActivationState(STATE.DISABLE_DEACTIVATION);

    physicsWorld.addRigidBody(
      body, //collisionGroupRedBall, collisionGroupGreenBall | collisionGroupPlane
    );

    ball.userData.physicsBody = body;
    ballObject.userData.physicsBody = body;

    rigidBodies.push(ball);
    rigidBodies.push(ballObject);
  };

export const createBeachBall = (scene: THREE.Scene, Ammo: any) => {
  let pos = { x: 20, y: 30, z: 0 };
  let radius = 2;
  let quat = { x: 0, y: 0, z: 0, w: 1 };
  let mass = 20;

  //import beach ball texture
  var texture_loader = new THREE.TextureLoader(manager);
  var beachTexture = texture_loader.load("./src/jsm/BeachBallColor.jpg");
  beachTexture.wrapS = beachTexture.wrapT = THREE.RepeatWrapping;
  beachTexture.repeat.set(1, 1);
  beachTexture.anisotropy = 1;
  beachTexture.encoding = THREE.sRGBEncoding;

  //threeJS Section
  let ball = new THREE.Mesh(
    new THREE.SphereGeometry(radius, 32, 32),
    new THREE.MeshLambertMaterial({ map: beachTexture }),
  );

  ball.position.set(pos.x, pos.y, pos.z);
  ball.castShadow = true;
  ball.receiveShadow = true;
  scene.add(ball);

  //Ammojs Section
  let transform = new Ammo.btTransform();
  transform.setIdentity();
  transform.setOrigin(new Ammo.btVector3(pos.x, pos.y, pos.z));
  transform.setRotation(
    new Ammo.btQuaternion(quat.x, quat.y, quat.z, quat.w),
  );
  let motionState = new Ammo.btDefaultMotionState(transform);

  let colShape = new Ammo.btSphereShape(radius);
  colShape.setMargin(0.05);

  let localInertia = new Ammo.btVector3(0, 0, 0);
  colShape.calculateLocalInertia(mass, localInertia);

  let rbInfo = new Ammo.btRigidBodyConstructionInfo(
    mass,
    motionState,
    colShape,
    localInertia,
  );
  let body = new Ammo.btRigidBody(rbInfo);

  body.setRollingFriction(1);
  physicsWorld.addRigidBody(body);

  ball.userData.physicsBody = body;
  rigidBodies.push(ball);
}

//create link boxes
export const createBox = (scene: THREE.Scene, Ammo: any, 
  x: number,
  y: number,
  z: number,
  scaleX: any,
  scaleY: any,
  scaleZ: any,
  boxTexture: string,
  URLLink: any,
  color = 0x000000,
  transparent = true) => {
  const boxScale = { x: scaleX, y: scaleY, z: scaleZ };
  let quat = { x: 0, y: 0, z: 0, w: 1 };
  let mass = 0; //mass of zero = infinite mass

  //load link logo
  const loader = new THREE.TextureLoader(manager);
  const texture = loader.load(boxTexture);
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearFilter;
  texture.encoding = THREE.sRGBEncoding;
  const loadedTexture = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: transparent,
    color: 0xffffff,
  });

  var borderMaterial = new THREE.MeshBasicMaterial({
    color: color,
  });
  borderMaterial.color.convertSRGBToLinear();

  var materials = [
    borderMaterial, // Left side
    borderMaterial, // Right side
    borderMaterial, // Top side   ---> THIS IS THE FRONT
    borderMaterial, // Bottom side --> THIS IS THE BACK
    loadedTexture, // Front side
    borderMaterial, // Back side
  ];

  const linkBox = new THREE.Mesh(
    new THREE.BoxBufferGeometry(boxScale.x, boxScale.y, boxScale.z),
    materials,
  );
  linkBox.position.set(x, y, z);
  linkBox.renderOrder = 1;
  linkBox.castShadow = true;
  linkBox.receiveShadow = true;
  linkBox.userData = { URL: URLLink, email: URLLink };
  scene.add(linkBox);
  objectsWithLinks.push(linkBox.uuid);

  addRigidPhysics(linkBox, boxScale);

  cursorHoverObjects.push(linkBox);
}