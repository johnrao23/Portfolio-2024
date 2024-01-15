import * as THREE from 'three';
import { scene, manager } from '../resources/world';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';

export function simpleText(
  x: number,
  y: number,
  z: number,
  inputText: string,
  fontSize: number
): void {
  var text_loader = new FontLoader();;

  text_loader.load('./assets/Roboto_Regular.json', function (font: any) {
    var xMid: number, text: THREE.Mesh;

    var color = 0xffffff;

    var matLite = new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 1,
      side: THREE.DoubleSide,
    });

    var message = inputText;

    var shapes = font.generateShapes(message, fontSize);

    var geometry = new THREE.ShapeGeometry(shapes);

    geometry.computeBoundingBox();

    if (geometry.boundingBox) {
        xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
        geometry.translate(xMid, 0, 0);
    } else {
        console.error("BoundingBox not computed");
    }

    text = new THREE.Mesh(geometry, matLite);
    text.position.set(x, y, z);
    text.rotation.x = -Math.PI * 0.5;

    scene.add(text);
  });
}

export function floatingLabel(
  x: number,
  y: number,
  z: number,
  inputMessage: string
): void {
  var text_loader = new FontLoader();

  text_loader.load('./assets/Roboto_Regular.json', function (font: any) {
    var xMid: number, text: THREE.Mesh;

    var color = 0xffffff;

    var matLite = new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 1,
      side: THREE.DoubleSide,
    });

    var message = inputMessage;

    var shapes = font.generateShapes(message, 1);

    var geometry = new THREE.ShapeGeometry(shapes);

    geometry.computeBoundingBox();

    if (geometry.boundingBox) {
        xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
        geometry.translate(xMid, 0, 0);
    } else {
        console.error("BoundingBox not computed");
    }

    text = new THREE.Mesh(geometry, matLite);
    text.position.set(x, y, z);
    scene.add(text);
  });
}

export function allSkillsSection(
  x: number,
  y: number,
  z: number,
  xScale: number,
  zScale: number,
  boxTexture: string,
  URLLink: string | null = null
): void {
  const boxScale = { x: xScale, y: 0.1, z: zScale };
  let quat = { x: 0, y: 0, z: 0, w: 1 };
  let mass = 0; //mass of zero = infinite mass

  var geometry = new THREE.PlaneBufferGeometry(xScale, zScale);

  const loader = new THREE.TextureLoader(manager);
  const texture = loader.load(boxTexture);
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearFilter;
  texture.encoding = THREE.sRGBEncoding;
  const loadedTexture = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
  });
  loadedTexture.depthWrite = true;
  loadedTexture.depthTest = true;

  const linkBox = new THREE.Mesh(geometry, loadedTexture);
  linkBox.position.set(x, y, z);
  linkBox.renderOrder = 1;
  linkBox.rotation.x = -Math.PI * 0.5;
  linkBox.receiveShadow = true;
  linkBox.userData = { URL: URLLink };
  scene.add(linkBox);
}

export function createTextOnPlane(
  x: number,
  y: number,
  z: number,
  inputText: string,
  size1: number,
  size2: number
): void {
  var activitiesGeometry = new THREE.PlaneBufferGeometry(size1, size2);
  const loader = new THREE.TextureLoader(manager);
  var activitiesTexture = loader.load(inputText);
  activitiesTexture.magFilter = THREE.NearestFilter;
  activitiesTexture.minFilter = THREE.LinearFilter;
  var activitiesMaterial = new THREE.MeshBasicMaterial({
    alphaMap: activitiesTexture,
    transparent: true,
  });

  activitiesMaterial.depthWrite = true;
  activitiesMaterial.depthTest = true;
  let activitiesText = new THREE.Mesh(activitiesGeometry, activitiesMaterial);
  activitiesText.position.set(x, y, z);
  activitiesText.rotation.x = -Math.PI * 0.5;

  activitiesText.renderOrder = 1;

  scene.add(activitiesText);
}
