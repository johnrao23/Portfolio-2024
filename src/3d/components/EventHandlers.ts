import { useStore } from './store';

export function setupEventHandlers(): void {
  window.addEventListener("keydown", handleKeyDown, false);
  window.addEventListener("keyup", handleKeyUp, false);
}

function handleKeyDown(event: KeyboardEvent): void {
  const keyCode = event.keyCode;
  const { setMoveDirection } = useStore.getState();

  switch (keyCode) {
    case 87: // W: FORWARD
    case 38: // Up arrow
      setMoveDirection('forward', 1);
      break;

    case 83: // S: BACK
    case 40: // Down arrow
      setMoveDirection('back', 1);
      break;

    case 65: // A: LEFT
    case 37: // Left arrow
      setMoveDirection('left', 1);
      break;

    case 68: // D: RIGHT
    case 39: // Right arrow
      setMoveDirection('right', 1);
      break;
  }
}

function handleKeyUp(event: KeyboardEvent): void {
  const keyCode = event.keyCode;
  const { setMoveDirection } = useStore.getState();

  switch (keyCode) {
    case 87: // W: FORWARD
    case 38: // Up arrow
      setMoveDirection('forward', 0);
      break;

    case 83: // S: BACK
    case 40: // Down arrow
      setMoveDirection('back', 0);
      break;

    case 65: // A: LEFT
    case 37: // Left arrow
      setMoveDirection('left', 0);
      break;

    case 68: // D: RIGHT
    case 39: // Right arrow
      setMoveDirection('right', 0);
      break;
  }
}

export function isTouchscreenDevice(): boolean {
  return 'ontouchstart' in window || 'ontouchstart' in document.documentElement;
}


// Type definition for coordinates
type Coordinates = {
  x: number;
  y: number;
};

export function touchEvent(coordinates: Coordinates): void {
  if (coordinates.x > 30) {
    moveDirection.right = 1;
    moveDirection.left = 0;
  } else if (coordinates.x < -30) {
    moveDirection.left = 1;
    moveDirection.right = 0;
  } else {
    moveDirection.right = 0;
    moveDirection.left = 0;
  }

  if (coordinates.y > 30) {
    moveDirection.back = 1;
    moveDirection.forward = 0;
  } else if (coordinates.y < -30) {
    moveDirection.forward = 1;
    moveDirection.back = 0;
  } else {
    moveDirection.forward = 0;
    moveDirection.back = 0;
  }
}

export function createJoystick(parent: HTMLElement): { getPosition: () => Coordinates } {
  const maxDiff = 62; // How far drag can go
  const stick = document.createElement("div");
  // stick.classList.add("joystick");
  stick.setAttribute("id", "joystick");

  stick.addEventListener("mousedown", handleMouseDown);
  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);
  stick.addEventListener("touchstart", handleMouseDown);
  document.addEventListener("touchmove", handleMouseMove);
  document.addEventListener("touchend", handleMouseUp);

  let dragStart: Coordinates | null = null;
  let currentPos: Coordinates = { x: 0, y: 0 };

  function handleMouseDown(event: MouseEvent | TouchEvent): void {
    event.preventDefault();
    stick.style.transition = "0s";

    if ('changedTouches' in event) {
      dragStart = {
        x: event.changedTouches[0].clientX,
        y: event.changedTouches[0].clientY,
      };
      return;
    }
    dragStart = {
      x: event.clientX,
      y: event.clientY,
    };
  }

  function handleMouseMove(event: MouseEvent | TouchEvent): void {
    if (dragStart === null) return;

    let eventX: number;
    let eventY: number;

    if ('changedTouches' in event) {
      eventX = event.changedTouches[0].clientX;
      eventY = event.changedTouches[0].clientY;
    } else {
      eventX = event.clientX;
      eventY = event.clientY;
    }

    const xDiff = eventX - dragStart.x;
    const yDiff = eventY - dragStart.y;
    const angle = Math.atan2(yDiff, xDiff);
    const distance = Math.min(maxDiff, Math.hypot(xDiff, yDiff));
    const xNew = distance * Math.cos(angle);
    const yNew = distance * Math.sin(angle);
    stick.style.transform = `translate3d(${xNew}px, ${yNew}px, 0px)`;
    currentPos = { x: xNew, y: yNew };
    touchEvent(currentPos);
  }

  function handleMouseUp(): void {
    if (dragStart === null) return;
    stick.style.transition = ".2s";
    stick.style.transform = "translate3d(0px, 0px, 0px)";
    dragStart = null;
    currentPos = { x: 0, y: 0 };
    moveDirection.forward = 0;
    moveDirection.left = 0;
    moveDirection.right = 0;
    moveDirection.back = 0;
  }

  parent.appendChild(stick);
  return {
    getPosition: () => currentPos,
  };
}
