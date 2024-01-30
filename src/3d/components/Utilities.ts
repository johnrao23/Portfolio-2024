//start link events
import * as THREE from "three";
import { useStore } from "./store";

export interface BallPosition {
  position: {
    x: number;
    y: number;
    z: number;
  };
}

let scene: THREE.Scene,
renderer: THREE.WebGLRenderer,
camera: THREE.PerspectiveCamera;

const pickPosition = new THREE.Vector2(0, 0);

export function rotateCamera(ballPosition: BallPosition, camera: THREE.PerspectiveCamera): void {
  if (!camera) {
    console.error("Camera not initialized");
    return;
  }
  
  var camPos = new THREE.Vector3(
    camera.position.x,
    camera.position.y,
    camera.position.z,
  );

  var targetPos: THREE.Vector3;

  //1
  if (
    (ballPosition.position.x < 77 &&
      ballPosition.position.x > 42 &&
      ballPosition.position.z > -20 &&
      ballPosition.position.z < 40) ||
    (ballPosition.position.x < -2 && ballPosition.position.z < -28) ||
    (ballPosition.position.x < -25 &&
      ballPosition.position.x > -70 &&
      ballPosition.position.z > -10 &&
      ballPosition.position.z < 40)
  ) {
    targetPos = new THREE.Vector3(
      ballPosition.position.x,
      ballPosition.position.y + 50,
      ballPosition.position.z + 40,
    );
  }

  //2
  else if (
    ballPosition.position.x > -3 &&
    ballPosition.position.x < 22 &&
    ballPosition.position.z > 31 &&
    ballPosition.position.z < 58
  ) {
    targetPos = new THREE.Vector3(
      ballPosition.position.x,
      ballPosition.position.y + 50,
      ballPosition.position.z + 40,
    );
  }

  //3
  else if (ballPosition.position.z > 50) {
    targetPos = new THREE.Vector3(
      ballPosition.position.x,
      ballPosition.position.y + 10,
      ballPosition.position.z + 40,
    );
  }

  // revert back to original angle
  else {
    targetPos = new THREE.Vector3(
      ballPosition.position.x,
      ballPosition.position.y + 30,
      ballPosition.position.z + 60,
    );
  }

  const ballPosVector = new THREE.Vector3(
    ballPosition.position.x,
    ballPosition.position.y,
    ballPosition.position.z,
  );

  camPos.lerp(targetPos, 0.033);
  camera.position.copy(camPos);
  camera.lookAt(ballPosVector);
}

function getCanvasRelativePosition(event: MouseEvent): { x: number; y: number } {
  const rect = renderer.domElement.getBoundingClientRect();
  return {
    x: ((event.clientX - rect.left) * renderer.domElement.width) / rect.width,
    y: ((event.clientY - rect.top) * renderer.domElement.height) / rect.height,
  };
}

export function launchClickPosition(event: MouseEvent): void {
  const pos = getCanvasRelativePosition(event);
  pickPosition.x = (pos.x / renderer.domElement.width) * 2 - 1;
  pickPosition.y = (pos.y / renderer.domElement.height) * -2 + 1; // note we flip Y

  const myRaycaster = new THREE.Raycaster();
  myRaycaster.setFromCamera(pickPosition, camera);

  const intersectedObjects = myRaycaster.intersectObjects(scene.children);
  if (intersectedObjects.length) {
    const pickedObject = intersectedObjects[0].object;
    if (pickedObject.userData.URL) {
      window.open(pickedObject.userData.URL);
    }
  }
}

export function launchHover(event: MouseEvent): void {
  event.preventDefault();
  var mouse = new THREE.Vector2();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  var raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);
  const cursorHoverObjects = useStore.getState().cursorHoverObjects;
  var intersects = raycaster.intersectObjects(cursorHoverObjects);

  if (intersects.length > 0) {
    document.getElementById("document-body")!.style.cursor = "pointer";
  } else {
    document.getElementById("document-body")!.style.cursor = "default";
  }
}
