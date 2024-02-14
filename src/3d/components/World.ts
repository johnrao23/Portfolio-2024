// use Three.js to set up graphics
import * as THREE from "three";
import { useStore } from "./store";
import galaxyVertexShader from "../shaders/vertex.glsl";
import galaxyFragmentShader from "../shaders/fragment.glsl";
import skyVertexShader from "../shaders/skyVertex.glsl";
import skyFragmentShader from "../shaders/skyFragment.glsl";

export let galaxyMaterial: THREE.ShaderMaterial | null = null;
export let galaxyPoints: THREE.Points | null = null;

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

type ParticleAttributes = {
  startSize: number[];
  startPosition: THREE.Vector3[];
  randomness: number[];
};

export function createSkyEffect(scene: THREE.Scene): void {
  const uniforms = {
      topColor: { value: new THREE.Color(0x0077FF).convertSRGBToLinear() },
      bottomColor: { value: new THREE.Color(0xffffff).convertSRGBToLinear() },
      offset: { value: 33 },
      exponent: { value: 0.6 }
  };

  const skyGeo = new THREE.SphereGeometry(20000, 32, 32);
  const skyMat = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: skyVertexShader,
      fragmentShader: skyFragmentShader,
      side: THREE.BackSide
  });

  const skyMesh = new THREE.Mesh(skyGeo, skyMat);
  scene.add(skyMesh);
}

export function glowingParticles(scene: THREE.Scene, manager: THREE.LoadingManager): void {
  const particleTextureLoader = new THREE.TextureLoader(manager);
  const particleTexture = particleTextureLoader.load("/assets/spark.png");

  const particleGroup = new THREE.Group();
  particleGroup.position.set(-1, 7, 45);

  const particleAttributes: ParticleAttributes = {
    startSize: [],
    startPosition: [],
    randomness: []
  };

  const totalParticles = 50;
  const radiusRange = 4;
  for (let i = 0; i < totalParticles; i++) {
    const spriteMaterial = new THREE.SpriteMaterial({
      map: particleTexture,
      color: 0xffffff,
      blending: THREE.AdditiveBlending,
    });

    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(0.5, 0.5, 1.0);
    sprite.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5);
    sprite.position.setLength(radiusRange * (Math.random() * 0.1 + 0.9));
    sprite.material.color.setHSL(Math.random(), 0.9, 0.7);
    sprite.renderOrder = 1;
    particleGroup.add(sprite);

    // Add attributes for movement
    particleAttributes.startPosition.push(sprite.position.clone());
    particleAttributes.randomness.push(Math.random());
  }

  scene.add(particleGroup);

  useStore.getState().setParticleGroup(particleGroup);
  useStore.getState().setParticleAttributes(particleAttributes);
}

export function createLensFlare(scene: THREE.Scene, x: number, y: number, z: number, xScale: number, zScale: number, boxTexture: string) : void {
  const loader = new THREE.TextureLoader();
  const texture = loader.load(boxTexture);
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearFilter;
  texture.colorSpace = THREE.SRGBColorSpace;

  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    opacity: 0.9,
    depthWrite: true,
    depthTest: true,
  });

  const geometry = new THREE.PlaneGeometry(xScale, zScale);

  const lensFlareMesh = new THREE.Mesh(geometry, material);
  lensFlareMesh.position.set(x, y, z);
  lensFlareMesh.renderOrder = 1;
  lensFlareMesh.receiveShadow = true;

  // Add the lens flare mesh to the scene
  scene.add(lensFlareMesh);

  // Update the lensFlareObject in the store
  useStore.getState().setLensFlareObject(lensFlareMesh);
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
  const particleSystemPoints = new THREE.Points(geometry, material);

  scene.add(particleSystemPoints);

  useStore.getState().setParticleSystemObject(particleSystemPoints);
}

function getRandomArbitrary(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export const generateGalaxy = ( scene: THREE.Scene, renderer: THREE.WebGLRenderer): void => {
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

  const insideColor = new THREE.Color(parameters.insideColor).convertSRGBToLinear();
  const outsideColor = new THREE.Color(parameters.outsideColor).convertSRGBToLinear();

  console.log(insideColor);
  console.log(outsideColor);

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

  useStore.getState().setGalaxyMaterial(galaxyMaterial);

  galaxyPoints = new THREE.Points(geometry, galaxyMaterial);
  galaxyPoints.position.y = -50;
  scene.add(galaxyPoints);
};

export function moveParticles(clock: THREE.Clock): void {
  const { particleGroup, particleAttributes, lensFlareObject, particleSystemObject } = useStore.getState();

  if (!particleGroup || !particleAttributes || !lensFlareObject || !particleSystemObject) return;

  // Move particleSystemObject
  particleSystemObject.rotation.z += 0.0003;

  // Move lensFlareObject
  lensFlareObject.rotation.z += 0.0002;
  if (lensFlareObject.position.x < 750) {
    lensFlareObject.position.x += 0.025;
    lensFlareObject.position.y -= 0.001;
  } else {
    lensFlareObject.position.x = -750;
    lensFlareObject.position.y = -50;
  }

  const time = 7 * clock.getElapsedTime();

  // Move particles within the group
  particleGroup.children.forEach((sprite, index) => {
    const randomness = particleAttributes.randomness[index];
    const startPosition = particleAttributes.startPosition[index];

    const a = randomness + 0.75;
    const pulseFactor = Math.sin(a * time) * 0.1 + 0.9;

    sprite.position.x = startPosition.x * pulseFactor;
    sprite.position.y = startPosition.y * pulseFactor * 1.5;
    sprite.position.z = startPosition.z * pulseFactor;
  });

    // Rotate the entire particle group
    particleGroup.rotation.y = time * 0.75;
}

export const addHemisphereLight = (scene: THREE.Scene) : void => {
  let hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1.5);
  hemiLight.color.setHSL(0.6, 0.6, 0.6);
  hemiLight.groundColor.setHSL(0.1, 1, 0.4);
  hemiLight.position.set(0, 50, 0);
  scene.add(hemiLight);
};

export const addDirectionalLight = (scene: THREE.Scene) => {
  let dirLight = new THREE.DirectionalLight(0xffffff, 0.7);
  dirLight.color.setHSL(0.1, 1, 0.95);
  dirLight.position.set(-10, 100, 50);
  dirLight.position.multiplyScalar(100);
  scene.add(dirLight);

  // Configure shadow properties
  dirLight.castShadow = true;
  dirLight.shadow.mapSize.width = 4096;
  dirLight.shadow.mapSize.height = 4096;
  let d = 200;
  dirLight.shadow.camera.left = -d;
  dirLight.shadow.camera.right = d;
  dirLight.shadow.camera.top = d;
  dirLight.shadow.camera.bottom = -d;
  dirLight.shadow.camera.far = 15000;

  return dirLight;
};