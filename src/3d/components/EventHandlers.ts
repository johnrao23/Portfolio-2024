import { useStore } from './store';

export function setupEventHandlers(): void {
  window.addEventListener("keydown", handleKeyDown, false);
  window.addEventListener("keyup", handleKeyUp, false);
}

export function handleKeyDown(event: KeyboardEvent): void {
  const key = event.key;
  const { setMoveDirection } = useStore.getState();

  switch (key) {
    case 'W':
    case 'ArrowUp':
      setMoveDirection('forward', 1);
      break;

    case 'S':
    case 'ArrowDown':
      setMoveDirection('back', 1);
      break;

    case 'A':
    case 'ArrowLeft':
      setMoveDirection('left', 1);
      break;

    case 'D':
    case 'ArrowRight':
      setMoveDirection('right', 1);
      break;
  }
}

export function handleKeyUp(event: KeyboardEvent): void {
  const key = event.key;
  const { setMoveDirection } = useStore.getState();

  switch (key) {
    case 'W':
    case 'ArrowUp':
      setMoveDirection('forward', 0);
      break;

    case 'S':
    case 'ArrowDown':
      setMoveDirection('back', 0);
      break;

    case 'A':
    case 'ArrowLeft':
      setMoveDirection('left', 0);
      break;

    case 'D':
    case 'ArrowRight':
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

function touchEvent(coordinates: Coordinates): void {
  const { setMoveDirection } = useStore.getState();
  if (coordinates.x > 30) {
    setMoveDirection('right', 1);
    setMoveDirection('left', 0);
  } else if (coordinates.x < -30) {
    setMoveDirection('left', 1);
    setMoveDirection('right', 0);
  } else {
    setMoveDirection('right', 0);
    setMoveDirection('left', 0);
  }

  if (coordinates.y > 30) {
    setMoveDirection('back', 1);
    setMoveDirection('forward', 0);
  } else if (coordinates.y < -30) {
    setMoveDirection('forward', 1);
    setMoveDirection('back', 0);
  } else {
    setMoveDirection('forward', 0);
    setMoveDirection('back', 0);
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
    const { setMoveDirection } = useStore.getState();
    if (dragStart === null) return;
    stick.style.transition = ".2s";
    stick.style.transform = "translate3d(0px, 0px, 0px)";
    dragStart = null;
    currentPos = { x: 0, y: 0 };
    setMoveDirection('forward', 0);
    setMoveDirection('left', 0);
    setMoveDirection('right', 0);
    setMoveDirection('back', 0);
  }

  parent.appendChild(stick);
  return {
    getPosition: () => currentPos,
  };
}