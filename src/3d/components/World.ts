// use Three.js to set up graphics
import * as THREE from "three";
import Stats from "stats.js";
import galaxyVertexShader from "../assets/vertex.glsl";
import galaxyFragmentShader from "../assets/fragment.glsl";

//threejs variable declaration
export let clock: THREE.Clock,
galaxyClock: THREE.Clock,
scene: THREE.Scene,
renderer: THREE.WebGLRenderer,
stats: Stats,
particleGroup: THREE.Object3D,
particleAttributes: any,
particleSystemObject: THREE.Points,
lensFlareObject: THREE.Mesh;

//generic temporary transform to begin

export let manager = new THREE.LoadingManager();

export function glowingParticles() : void {
  var particleTextureLoader = new THREE.TextureLoader(manager);
  var particleTexture = particleTextureLoader.load("../assets/spark.png");

  particleGroup = new THREE.Object3D();
  particleGroup.position.x = -1;
  particleGroup.position.y = 7;
  particleGroup.position.z = 45;
  particleAttributes = { startSize: [], startPosition: [], randomness: [] };

  var totalParticles = 50;
  var radiusRange = 4;
  for (var i = 0; i < totalParticles; i++) {
    var spriteMaterial = new THREE.SpriteMaterial({
      map: particleTexture,
      color: 0xffffff,
    });

    var sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(0.5, 0.5, 1.0); // imageWidth, imageHeight
    sprite.position.set(
      Math.random() - 0.5,
      Math.random() - 0.5,
      Math.random() - 0.5,
    );

    sprite.position.setLength(radiusRange * (Math.random() * 0.1 + 0.9));

    sprite.material.color.setHSL(Math.random(), 0.9, 0.7);

    sprite.material.blending = THREE.AdditiveBlending; // "glowing" particles
    sprite.renderOrder = 1;
    particleGroup.add(sprite);
    // add variable qualities to arrays, if they need to be accessed later
    particleAttributes.startPosition.push(sprite.position.clone());
    particleAttributes.randomness.push(Math.random());
  }

  scene.add(particleGroup);
}

export function createLensFlare(x: number, y: number, z: number, xScale: number, zScale: number, boxTexture: string) : void {
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

export function addParticles() : void {
  var geometry = new THREE.Geometry();

  for (let i = 0; i < 3000; i++) {
    var vertex = new THREE.Vector3();
    vertex.x = getRandomArbitrary(-1100, 1100);
    vertex.y = getRandomArbitrary(-1100, 1100);
    vertex.z = getRandomArbitrary(-1100, -500);
    geometry.vertices.push(vertex);
  }

  var material = new THREE.PointsMaterial({ size: 3 });
  particleSystemObject = new THREE.Points(geometry, material);

  scene.add(particleSystemObject);
}

function getRandomArbitrary(min: number, max: number) : number {
  return Math.random() * (max - min) + min;
}

export let galaxyMaterial: THREE.ShaderMaterial | null = null;
export let galaxyPoints: THREE.Points | null = null;

export const generateGalaxy = () : void => {
  const parameters = {};
  parameters.count = 50000;
  parameters.size = 0.005;
  parameters.radius = 100;
  parameters.branches = 3;
  parameters.spin = 1;

  parameters.randomnessPower = 3;
  parameters.insideColor = "#ff6030";
  parameters.outsideColor = "#1b3984";
  parameters.randomness = 0.2;

  let geometry = null;
  galaxyMaterial = null;
  galaxyPoints = null;
  if (galaxyPoints !== null) {
    geometry.dispose();
    galaxyMaterial.dispose();
    scene.remove(galaxyPoints);
  }

  /**
   * Geometry
   */
  geometry = new THREE.BufferGeometry();

  const positions = new Float32Array(parameters.count * 3);
  const randomness = new Float32Array(parameters.count * 3);

  const colors = new Float32Array(parameters.count * 3);
  const scales = new Float32Array(parameters.count * 1);

  const insideColor = new THREE.Color(parameters.insideColor);
  const outsideColor = new THREE.Color(parameters.outsideColor);

  for (let i = 0; i < parameters.count; i++) {
    const i3 = i * 3;

    // Position
    const radius = Math.random() * parameters.radius;

    const branchAngle =
      ((i % parameters.branches) / parameters.branches) * Math.PI * 2;

    const randomX =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      parameters.randomness *
      radius;
    const randomY =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      parameters.randomness *
      radius;
    const randomZ =
      Math.pow(Math.random(), parameters.randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        parameters.randomness *
        radius -
      50;

    positions[i3] = Math.cos(branchAngle) * radius;
    positions[i3 + 1] = 0;
    positions[i3 + 2] = Math.sin(branchAngle) * radius;

    randomness[i3] = randomX;
    randomness[i3 + 1] = randomY;
    randomness[i3 + 2] = randomZ;

    // Color
    const mixedColor = insideColor.clone();
    mixedColor.lerp(outsideColor, radius / parameters.radius);

    colors[i3] = mixedColor.r;
    colors[i3 + 1] = mixedColor.g;
    colors[i3 + 2] = mixedColor.b;

    // Scale
    scales[i] = Math.random();
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
  geometry.setAttribute(
    "aRandomness",
    new THREE.BufferAttribute(randomness, 3),
  );

  /**
   * Material
   */
  galaxyMaterial = new THREE.ShaderMaterial({
    size: parameters.size,
    sizeAttenuation: true,
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

  /**
   * Points
   */
  galaxyPoints = new THREE.Points(geometry, galaxyMaterial);
  galaxyPoints.position.y = -50;
  scene.add(galaxyPoints);
};

export function moveParticles() : void {
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