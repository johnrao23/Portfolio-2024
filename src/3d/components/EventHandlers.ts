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
  const maxDiff = 62;

  const stick = parent.querySelector("#joystick") as HTMLElement;

  if (!stick) {
    console.error("Joystick element not found.");
    return {
      getPosition: () => ({ x: 0, y: 0 })
    };
  }

  const handleMouseDown = (event: MouseEvent | TouchEvent) => {
    event.preventDefault();
    stick.style.transition = "0s";
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;
    dragStart = { x: clientX, y: clientY };
  };

  const handleMouseMove = (event: MouseEvent | TouchEvent) => {
    if (!dragStart) return;
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;
    const xDiff = clientX - dragStart.x;
    const yDiff = clientY - dragStart.y;
    const angle = Math.atan2(yDiff, xDiff);
    const distance = Math.min(maxDiff, Math.hypot(xDiff, yDiff));
    const xNew = distance * Math.cos(angle);
    const yNew = distance * Math.sin(angle);
    stick.style.transform = `translate3d(${xNew}px, ${yNew}px, 0px)`;
    currentPos = { x: xNew, y: yNew };
  };

  const handleMouseUp = () => {
    if (!dragStart) return;
    stick.style.transition = ".2s";
    stick.style.transform = "translate3d(0px, 0px, 0px)";
    dragStart = null;
    currentPos = { x: 0, y: 0 };
  };

  stick.addEventListener("mousedown", handleMouseDown);
  stick.addEventListener("touchstart", handleMouseDown);
  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("touchmove", handleMouseMove, { passive: false });
  document.addEventListener("mouseup", handleMouseUp);
  document.addEventListener("touchend", handleMouseUp);

  let dragStart: Coordinates | null = null;
  let currentPos: Coordinates = { x: 0, y: 0 };

  return {
    getPosition: () => currentPos,
  };
}
