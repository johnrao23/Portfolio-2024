// use Three.js to set up graphics
import * as THREE from "three";
import galaxyVertexShader from "../assets/vertex.glsl";
import galaxyFragmentShader from "../assets/fragment.glsl";

//threejs variable declaration
export let clock: THREE.Clock,
galaxyClock: THREE.Clock,
scene: THREE.Scene,
renderer: THREE.WebGLRenderer,
particleAttributes: any,
particleSystemObject: THREE.Points,
lensFlareObject: THREE.Mesh;

type GalaxyParameters = {
  count: number;
  size: number;
  radius: number;
  branches: number;
  spin: number;
  randomnessPower: number;
  insideColor: string;
  outsideColor: string;
  randomness: number;
};

export function glowingParticles(scene: THREE.Scene, manager: THREE.LoadingManager, particleGroup: THREE.Object3D): void {
  var particleTextureLoader = new THREE.TextureLoader(manager);
  var particleTexture = particleTextureLoader.load("../assets/spark.png");

  particleGroup.position.set(-1, 7, 45);

  var particleAttributes: {
    startSize: number[],
    startPosition: THREE.Vector3[],
    randomness: number[]
  } = {
    startSize: [],
    startPosition: [],
    randomness: []
  };

  var totalParticles = 50;
  var radiusRange = 4;
  for (var i = 0; i < totalParticles; i++) {
    var spriteMaterial = new THREE.SpriteMaterial({
      map: particleTexture,
      color: 0xffffff,
      blending: THREE.AdditiveBlending, // "glowing" particles
    });

    var sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(0.5, 0.5, 1.0); // imageWidth, imageHeight
    sprite.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5);
    sprite.position.setLength(radiusRange * (Math.random() * 0.1 + 0.9));
    sprite.material.color.setHSL(Math.random(), 0.9, 0.7);
    sprite.renderOrder = 1;
    particleGroup.add(sprite);

    // Add variable qualities to arrays, if they need to be accessed later
    particleAttributes.startPosition.push(sprite.position.clone());
    particleAttributes.randomness.push(Math.random());
  }

  scene.add(particleGroup);
}

export function createLensFlare(scene: THREE.Scene, x: number, y: number, z: number, xScale: number, zScale: number, boxTexture: string) : void {
  const boxScale = { x: xScale, y: 0.1, z: zScale };
  let quat = { x: 0, y: 0, z: 0, w: 1 };
  let mass = 0; //mass of zero = infinite mass

  var geometry = new THREE.PlaneGeometry(xScale, zScale);

  const loader = new THREE.TextureLoader();
  const texture = loader.load(boxTexture);
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearFilter;
  texture.encoding = THREE.sRGBEncoding;
  const loadedTexture = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    opacity: 0.9,
  });
  loadedTexture.depthWrite = true;
  loadedTexture.depthTest = true;

  lensFlareObject = new THREE.Mesh(geometry, loadedTexture);
  lensFlareObject.position.set(x, y, z);
  lensFlareObject.renderOrder = 1;

  lensFlareObject.receiveShadow = true;
  scene.add(lensFlareObject);
}

export function addParticles(scene: THREE.Scene): void {
  var geometry = new THREE.BufferGeometry();

  const vertices = [];
  for (let i = 0; i < 3000; i++) {
    vertices.push(getRandomArbitrary(-1100, 1100)); // x
    vertices.push(getRandomArbitrary(-1100, 1100)); // y
    vertices.push(getRandomArbitrary(-1100, -500)); // z
  }

  // Creating a Float32Array from the vertices and adding it to the geometry
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

  var material = new THREE.PointsMaterial({ size: 3 });
  var particleSystemObject = new THREE.Points(geometry, material);

  scene.add(particleSystemObject);
}

function getRandomArbitrary(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export let galaxyMaterial: THREE.ShaderMaterial | null = null;
export let galaxyPoints: THREE.Points | null = null;

export const generateGalaxy = (
  scene: THREE.Scene,
  galaxyVertexShader: string,
  galaxyFragmentShader: string,
  renderer: THREE.WebGLRenderer
): void => {
  const parameters: GalaxyParameters = {
    count: 50000,
    size: 0.005,
    radius: 100,
    branches: 3,
    spin: 1,
    randomnessPower: 3,
    insideColor: "#ff6030",
    outsideColor: "#1b3984",
    randomness: 0.2,
  };

  // If galaxyPoints already exist, dispose of them before creating new ones
  if (galaxyPoints !== null) {
    galaxyPoints.geometry.dispose();
    if (Array.isArray(galaxyPoints.material)) {
      galaxyPoints.material.forEach(mat => mat.dispose());
    } else {
      galaxyPoints.material.dispose();
    }
    scene.remove(galaxyPoints);
  }

  const geometry = new THREE.BufferGeometry();

  const positions = new Float32Array(parameters.count * 3);
  const randomness = new Float32Array(parameters.count * 3);
  const colors = new Float32Array(parameters.count * 3);
  const scales = new Float32Array(parameters.count);

  const insideColor = new THREE.Color(parameters.insideColor);
  const outsideColor = new THREE.Color(parameters.outsideColor);

  for (let i = 0; i < parameters.count; i++) {
    const i3 = i * 3;

    const radius = Math.random() * parameters.radius;
    const branchAngle = ((i % parameters.branches) / parameters.branches) * Math.PI * 2;

    const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
    const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
    const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius - 50;

    positions[i3] = Math.cos(branchAngle) * radius;
    positions[i3 + 1] = 0;
    positions[i3 + 2] = Math.sin(branchAngle) * radius;

    randomness[i3] = randomX;
    randomness[i3 + 1] = randomY;
    randomness[i3 + 2] = randomZ;

    const mixedColor = insideColor.clone();
    mixedColor.lerp(outsideColor, radius / parameters.radius);

    colors[i3] = mixedColor.r;
    colors[i3 + 1] = mixedColor.g;
    colors[i3 + 2] = mixedColor.b;

    scales[i] = Math.random();
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
  geometry.setAttribute('aRandomness', new THREE.BufferAttribute(randomness, 3));

  galaxyMaterial = new THREE.ShaderMaterial({
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
    vertexShader: galaxyVertexShader,
    fragmentShader: galaxyFragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uSize: { value: 30 * renderer.getPixelRatio() },
    },
  });

  galaxyPoints = new THREE.Points(geometry, galaxyMaterial);
  galaxyPoints.position.y = -50;
  scene.add(galaxyPoints);
};


export function moveParticles(particleGroup: THREE.Object3D, particleAttributes: any) : void {
  particleSystemObject.rotation.z += 0.0003;
  lensFlareObject.rotation.z += 0.0002;
  if (lensFlareObject.position.x < 750) {
    lensFlareObject.position.x += 0.025;
    lensFlareObject.position.y -= 0.001;
  } else {
    lensFlareObject.position.x = -750;
    lensFlareObject.position.y = -50;
  }

  //move stemkoski particles
  var time = 7 * clock.getElapsedTime();

  for (var c = 0; c < particleGroup.children.length; c++) {
    var sprite = particleGroup.children[c];

    // pulse away/towards center
    // individual rates of movement
    var a = particleAttributes.randomness[c] + 0.75;
    var pulseFactor = Math.sin(a * time) * 0.1 + 0.9;
    sprite.position.x = particleAttributes.startPosition[c].x * pulseFactor;
    sprite.position.y =
      particleAttributes.startPosition[c].y * pulseFactor * 1.5;
    sprite.position.z = particleAttributes.startPosition[c].z * pulseFactor;
  }

  // rotate the entire group
  //particleGroup.rotation.x = time * 0.5;
  particleGroup.rotation.y = time * 0.75;
  // particleGroup.rotation.z = time * 1.0;
}
