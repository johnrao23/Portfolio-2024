import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { useStore } from './store';
import { manager } from '../resources/world';
import { stoneTexture } from './Textures';

let ballObject = null;
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

    const { addRigidBody } = useStore.getState();
    addRigidBody(ball, body);

    ball.userData.physicsBody = body;
    ballObject.userData.physicsBody = body;
  };

export const createBeachBall = (scene: THREE.Scene, Ammo: any) => {
  let pos = { x: 20, y: 30, z: 0 };
  let radius = 2;
  let quat = { x: 0, y: 0, z: 0, w: 1 };
  let mass = 20;

  //import beach ball texture
  var texture_loader = new THREE.TextureLoader(manager);
  var beachTexture = texture_loader.load("../assets/BeachBallColor.jpg");
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
  const { addRigidBody } = useStore.getState();
  addRigidBody(ball, body);

  ball.userData.physicsBody = body;
}

//create link boxes
export const createBox = (scene: THREE.Scene, Ammo: any, x: number, y: number, z: number, scaleX: any, scaleY: any, scaleZ: any, boxTexture: string, URLLink: any, color = 0x000000, transparent = true) => {
    const { addRigidPhysics } = useStore.getState();
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
      new THREE.BoxGeometry(boxScale.x, boxScale.y, boxScale.z),
      materials,
    );
    linkBox.position.set(x, y, z);
    linkBox.renderOrder = 1;
    linkBox.castShadow = true;
    linkBox.receiveShadow = true;
    linkBox.userData = { URL: URLLink, email: URLLink };
    scene.add(linkBox);
    objectsWithLinks.push(linkBox.uuid);

    addRigidPhysics(linkBox, new THREE.Vector3(boxScale.x, boxScale.y, boxScale.z));

    cursorHoverObjects.push(linkBox);
}

//create Ammo.js body to add solid mass to "John Rao Software Engineer"
export const johnRaoWords = ( scene: THREE.Scene, Ammo: any, x: number, y: number, z: number ) => {
  const { addRigidPhysics } = useStore.getState();
  const boxScale = { x: 46, y: 3, z: 2 };
  let quat = { x: 0, y: 0, z: 0, w: 1 };
  let mass = 0; //mass of zero = infinite mass

  const linkBox = new THREE.Mesh(
    new THREE.BoxGeometry(boxScale.x, boxScale.y, boxScale.z),
    new THREE.MeshPhongMaterial({
      color: 0xff6600,
    }),
  );

  linkBox.position.set(x, y, z);
  linkBox.castShadow = true;
  linkBox.receiveShadow = true;
  objectsWithLinks.push(linkBox.uuid);

  addRigidPhysics(linkBox, new THREE.Vector3(boxScale.x, boxScale.y, boxScale.z));
}

export const loadJohnText = (scene: THREE.Scene) => {
  var text_loader = new FontLoader();

  text_loader.load("./assets/Roboto_Regular.json", function (font: any) {
    var xMid, text;

    var color = 0xfffc00;

    var textMaterials = [
      new THREE.MeshBasicMaterial({ color: color }), // front
      new THREE.MeshPhongMaterial({ color: color }), // side
    ];

    var geometry = new THREE.TextGeometry("JOHN RAO", {
      font: font,
      size: 3,
      height: 0.5,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.1,
      bevelSize: 0.11,
      bevelOffset: 0,
      bevelSegments: 1,
    });

    geometry.computeBoundingBox();
    geometry.computeVertexNormals();

    xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);

    geometry.translate(xMid, 0, 0);

    text = new THREE.Mesh(geometry, textMaterials);
    text.position.z = -20;
    text.position.y = 0.1;
    text.receiveShadow = true;
    text.castShadow = true;
    scene.add(text);
  });
}

//create "software engineer text"
export const loadEngineerText = () => {
  var text_loader = new THREE.FontLoader();

  text_loader.load("./src/jsm/Roboto_Regular.json", function (font) {
    var xMid, text;

    var color = 0x00ff08;

    var textMaterials = [
      new THREE.MeshBasicMaterial({ color: color }), // front
      new THREE.MeshPhongMaterial({ color: color }), // side
    ];

    var geometry = new THREE.TextGeometry("SOFTWARE ENGINEER", {
      font: font,
      size: 1.5,
      height: 0.5,
      curveSegments: 20,
      bevelEnabled: true,
      bevelThickness: 0.25,
      bevelSize: 0.1,
    });

    geometry.computeBoundingBox();
    geometry.computeVertexNormals();

    xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);

    geometry.translate(xMid, 0, 0);

    var textGeo = new THREE.BufferGeometry().fromGeometry(geometry);

    text = new THREE.Mesh(textGeo, textMaterials);
    text.position.z = -20;
    text.position.y = 0.1;
    text.position.x = 24;
    text.receiveShadow = true;
    text.castShadow = true;
    scene.add(text);
  });
}

//create Ammo.js body to add solid mass to "Hello World"
export const helloWorldWords = ( scene: THREE.Scene, Ammo: any, x: number, y: number, z: number ) => {
  const boxScale = { x: 46, y: 3, z: 2 };
  let quat = { x: 0, y: 0, z: 0, w: 1 };
  let mass = 0; //mass of zero = infinite mass

  const linkBox = new THREE.Mesh(
    new THREE.BoxBufferGeometry(boxScale.x, boxScale.y, boxScale.z),
    new THREE.MeshPhongMaterial({
      color: 0xff6600,
    }),
  );

  linkBox.position.set(x, y, z);
  linkBox.castShadow = true;
  linkBox.receiveShadow = true;
  objectsWithLinks.push(linkBox.uuid);

  addRigidPhysics(linkBox, boxScale);
}

//loads text for Hello World Mesh
export const loadHelloWorldText = () => {
  var text_loader = new THREE.FontLoader();

  text_loader.load("./src/jsm/Roboto_Regular.json", function (font) {
    var xMid, text;

    // var color = 0xfffc00;
    var color = 0xfd6a02;

    var textMaterials = [
      new THREE.MeshBasicMaterial({ color: color }), // front
      new THREE.MeshPhongMaterial({ color: color }), // side
    ];

    var geometry = new THREE.TextGeometry("HELLO WORLD", {
      font: font,
      size: 3,
      height: 0.5,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.1,
      bevelSize: 0.11,
      bevelOffset: 0,
      bevelSegments: 1,
    });

    geometry.computeBoundingBox();
    geometry.computeVertexNormals();

    xMid = -2.8 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);

    geometry.translate(xMid, 0, 0);

    var textGeo = new THREE.BufferGeometry().fromGeometry(geometry);

    text = new THREE.Mesh(geometry, textMaterials);
    text.position.z = 85;
    text.position.y = 0.1;
    text.receiveShadow = true;
    text.castShadow = true;
    scene.add(text);
  });
}

//function to create billboard
export const createBillboard = ( scene: THREE.Scene, Ammo: any, x: number, y: number, z: number, textureImage: string, urlLink: any, rotation = 0 ) => {
  const billboardPoleScale = { x: 1, y: 5, z: 1 };
  const billboardSignScale = { x: 30, y: 15, z: 1 };

  /* default texture loading */
  const loader = new THREE.TextureLoader(manager);

  const billboardPole = new THREE.Mesh(
    new THREE.BoxGeometry(
      billboardPoleScale.x,
      billboardPoleScale.y,
      billboardPoleScale.z,
    ),
    new THREE.MeshStandardMaterial({
      map: loader.load(woodTexture),
    }),
  );

  const texture = loader.load(textureImage);
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearFilter;
  texture.encoding = THREE.sRGBEncoding;
  var borderMaterial = new THREE.MeshBasicMaterial({
    color: 0x000000,
  });
  const loadedTexture = new THREE.MeshBasicMaterial({
    map: texture,
  });

  var materials = [
    borderMaterial, // Left side
    borderMaterial, // Right side
    borderMaterial, // Top side   ---> THIS IS THE FRONT
    borderMaterial, // Bottom side --> THIS IS THE BACK
    loadedTexture, // Front side
    borderMaterial, // Back side
  ];
  // order to add materials: x+,x-,y+,y-,z+,z-
  const billboardSign = new THREE.Mesh(
    new THREE.BoxGeometry(
      billboardSignScale.x,
      billboardSignScale.y,
      billboardSignScale.z,
    ),
    materials,
  );

  billboardPole.position.x = x;
  billboardPole.position.y = y;
  billboardPole.position.z = z;

  billboardSign.position.x = x;
  billboardSign.position.y = y + 10;
  billboardSign.position.z = z;

  /* Rotate Billboard */
  billboardPole.rotation.y = rotation;
  billboardSign.rotation.y = rotation;

  billboardPole.castShadow = true;
  billboardPole.receiveShadow = true;

  billboardSign.castShadow = true;
  billboardSign.receiveShadow = true;

  billboardSign.userData = { URL: urlLink };

  scene.add(billboardPole);
  scene.add(billboardSign);
  addRigidPhysics(billboardPole, billboardPoleScale);

  cursorHoverObjects.push(billboardSign);
}

//create vertical billboard
export const createBillboardRotated = ( scene: THREE.Scene, Ammo: any, x: number, y: number, z: number, textureImage: string, urlLink: any, rotation = 0 ) => {
  const billboardPoleScale = { x: 1, y: 2.5, z: 1 };
  const billboardSignScale = { x: 15, y: 20, z: 1 };

  /* default texture loading */
  const loader = new THREE.TextureLoader(manager);
  const billboardPole = new THREE.Mesh(
    new THREE.BoxGeometry(
      billboardPoleScale.x,
      billboardPoleScale.y,
      billboardPoleScale.z,
    ),
    new THREE.MeshStandardMaterial({
      map: loader.load(woodTexture),
    }),
  );
  const texture = loader.load(textureImage);
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearFilter;
  texture.encoding = THREE.sRGBEncoding;
  var borderMaterial = new THREE.MeshBasicMaterial({
    color: 0x000000,
  });
  const loadedTexture = new THREE.MeshBasicMaterial({
    map: texture,
  });

  var materials = [
    borderMaterial, // Left side
    borderMaterial, // Right side
    borderMaterial, // Top side   ---> THIS IS THE FRONT
    borderMaterial, // Bottom side --> THIS IS THE BACK
    loadedTexture, // Front side
    borderMaterial, // Back side
  ];
  // order to add materials: x+,x-,y+,y-,z+,z-
  const billboardSign = new THREE.Mesh(
    new THREE.BoxGeometry(
      billboardSignScale.x,
      billboardSignScale.y,
      billboardSignScale.z,
    ),
    materials,
  );

  billboardPole.position.x = x;
  billboardPole.position.y = y;
  billboardPole.position.z = z;

  billboardSign.position.x = x;
  billboardSign.position.y = y + 11.25;
  billboardSign.position.z = z;

  /* Rotate Billboard */
  billboardPole.rotation.y = rotation;
  billboardSign.rotation.y = rotation;

  billboardPole.castShadow = true;
  billboardPole.receiveShadow = true;

  billboardSign.castShadow = true;
  billboardSign.receiveShadow = true;

  billboardSign.userData = { URL: urlLink };

  scene.add(billboardPole);
  scene.add(billboardSign);
  addRigidPhysics(billboardPole, billboardPoleScale);
  addRigidPhysics(billboardSign, billboardSignScale);

  cursorHoverObjects.push(billboardSign);
}

//create X axis wall around entire plane
export const createWallX = ( scene: THREE.Scene, Ammo: any, x: number, y: number, z: number ) => {
  const wallScale = { x: 0.125, y: 4, z: 250 };

  const wall = new THREE.Mesh(
    new THREE.BoxGeometry(wallScale.x, wallScale.y, wallScale.z),
    new THREE.MeshStandardMaterial({
      color: 0xffffff,
      opacity: 0.75,
      transparent: true,
    }),
  );

  wall.position.x = x;
  wall.position.y = y;
  wall.position.z = z;

  wall.receiveShadow = true;

  scene.add(wall);

  addRigidPhysics(wall, wallScale);
}

//create Z axis wall around entire plane
export const createWallZ = ( scene: THREE.Scene, Ammo: any, x: number, y: number, z: number ) => {
  const wallScale = { x: 250, y: 4, z: 0.125 };

  const wall = new THREE.Mesh(
    new THREE.BoxGeometry(wallScale.x, wallScale.y, wallScale.z),
    new THREE.MeshStandardMaterial({
      color: 0xffffff,
      opacity: 0.75,
      transparent: true,
    }),
  );

  wall.position.x = x;
  wall.position.y = y;
  wall.position.z = z;

  wall.receiveShadow = true;

  scene.add(wall);

  addRigidPhysics(wall, wallScale);
}

//helper function to create individual brick mesh
const createBrick = ( scene: THREE.Scene, Ammo: any, sx: any, sy: number, sz: any, mass: any, pos: any, quat: any, material: any) => {
  var threeObject = new THREE.Mesh(
    new THREE.BoxGeometry(sx, sy, sz, 1, 1, 1),
    material,
  );
  var shape = new Ammo.btBoxShape(
    new Ammo.btVector3(sx * 0.5, sy * 0.5, sz * 0.5),
  );
  shape.setMargin(0.05);

  createBrickBody(scene, Ammo, threeObject, shape, mass, pos, quat);

  return threeObject;
}

//add physics to brick body
const createBrickBody = (scene: THREE.Scene, Ammo: any, threeObject: any, physicsShape: any, mass: any, pos: any, quat: any) => {
  threeObject.position.copy(pos);
  threeObject.quaternion.copy(quat);

  var transform = new Ammo.btTransform();
  transform.setIdentity();
  transform.setOrigin(new Ammo.btVector3(pos.x, pos.y, pos.z));
  transform.setRotation(
    new Ammo.btQuaternion(quat.x, quat.y, quat.z, quat.w),
  );
  var motionState = new Ammo.btDefaultMotionState(transform);

  var localInertia = new Ammo.btVector3(0, 0, 0);
  physicsShape.calculateLocalInertia(mass, localInertia);

  var rbInfo = new Ammo.btRigidBodyConstructionInfo(
    mass,
    motionState,
    physicsShape,
    localInertia,
  );
  var body = new Ammo.btRigidBody(rbInfo);

  threeObject.userData.physicsBody = body;

  scene.add(threeObject);

  if (mass > 0) {
    rigidBodies.push(threeObject);

    // Disable deactivation
    body.setActivationState(4);
  }

  const { addRigidBody } = useStore.getState();
    addRigidBody(body);
}

//create brick wall
export const wallOfBricks = (scene: THREE.Scene, Ammo: any) => {
  const loader = new THREE.TextureLoader(manager);
  var pos = new THREE.Vector3();
  var quat = new THREE.Quaternion();
  var brickMass = 0.1;
  var brickLength = 3;
  var brickDepth = 3;
  var brickHeight = 1.5;
  var numberOfBricksAcross = 6;
  var numberOfRowsHigh = 6;

  pos.set(70, brickHeight * 0.5, -90);
  quat.set(0, 0, 0, 1);

  for (var j = 0; j < numberOfRowsHigh; j++) {
    var oddRow = j % 2 == 1;

    pos.x = 85;

    if (oddRow) {
      pos.x += 0.25 * brickLength;
    }

    var currentRow = oddRow
      ? numberOfBricksAcross + 1
      : numberOfBricksAcross;
    for (let i = 0; i < currentRow; i++) {
      var brickLengthCurrent = brickLength;
      var brickMassCurrent = brickMass;
      if (oddRow && (i == 0 || i == currentRow - 1)) {
        //first or last brick
        brickLengthCurrent *= 0.5;
        brickMassCurrent *= 0.5;
      }
      var brick = createBrick(scene, Ammo, brickLengthCurrent, brickHeight, brickDepth, brickMassCurrent, pos, quat, new THREE.MeshStandardMaterial({ map: loader.load(stoneTexture)
      }));
      brick.castShadow = true;
      brick.receiveShadow = true;

      if (oddRow && (i == 0 || i == currentRow - 2)) {
        //first or last brick
        pos.x += brickLength * 0.25;
      } else {
        pos.x += brickLength;
      }
      pos.z += 0.0001;
    }
    pos.y += brickHeight;
  }
}

export const createTriangle = ( scene: THREE.Scene, Ammo: any, x: number, z: number ) => {
  var geom = new THREE.Geometry();
  var v1 = new THREE.Vector3(4, 0, 0);
  var v2 = new THREE.Vector3(5, 0, 0);
  var v3 = new THREE.Vector3(4.5, 1, 0);

  geom.vertices.push(v1);
  geom.vertices.push(v2);
  geom.vertices.push(v3);

  geom.faces.push(new THREE.Face3(0, 1, 2));
  geom.computeFaceNormals();

  var mesh = new THREE.Mesh(
    geom,
    new THREE.MeshBasicMaterial({ color: 0xffffff }),
  );
  mesh.rotation.x = -Math.PI * 0.5;
  //mesh.rotation.z = -90;
  mesh.position.y = 0.01;
  mesh.position.x = x;
  mesh.position.z = z;
  scene.add(mesh);
}