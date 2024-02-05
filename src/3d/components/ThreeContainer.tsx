import React, { useEffect, useRef, useState } from 'react';
import { setupScene } from './SceneSetup';
import { launchClickPosition, launchHover } from './Utilities';
import { createBeachBall } from './CreateObjects';
import { useStore } from './store';

const ThreeContainer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showOverlay, setShowOverlay] = useState(false);
  
  const { initializeAmmo, ammoLoaded, ammo, setPhysicsWorld, scene } = useStore();

  useEffect(() => {
    if (!ammoLoaded) {
      initializeAmmo();
    }
  }, [initializeAmmo, ammoLoaded]);

  useEffect(() => {
    if (ammoLoaded) {
      setIsLoading(false);
    }
  }, [ammoLoaded]);

  useEffect(() => {
    if (ammoLoaded && !isLoading) {
      setupScene({
        container: containerRef.current,
        Ammo: ammo,
        setPhysicsWorld: setPhysicsWorld,
        onLoaded: () => {
          setIsLoading(false);
          setShowOverlay(true);
        }
      });
    }
  }, [ammoLoaded, isLoading, ammo, setPhysicsWorld]);
  

  const startButtonEventListener = () => {
    setShowOverlay(false);
    document.addEventListener("click", launchClickPosition);
    if (scene) {
      createBeachBall(scene, ammo);
    } else {
      console.error("Scene is not initialized.");
    }
    setTimeout(() => {
      document.addEventListener("mousemove", launchHover);
    }, 1000);
  };

  const overlayContent = isLoading ? (
    <>
      <div className="preload-overlay" id="preload-overlay">
        <div className="start-page-content-div">
          <h1 className="john-text">Hi, I'm <span className="yellow-text">John Rao!</span></h1>
          <h1 className="start-page-text interactive-site-text">This is an interactive 3D site built with Three.js!</h1>
          <h1 id="appDirections" className="start-page-text joystick-directions-text">Move the ball around with the arrow keys on the keyboard.</h1>
          <button id="start-button" onClick={startButtonEventListener}>EXPLORE</button>
        </div>
        <div className="trinity-rings-spinner">
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
        </div>
        <div className="loading-text-div">Loading<span className="loader__dot">.</span><span className="loader__dot">.</span><span className="loader__dot">.</span></div>
      </div>
    </>
  ) : null;

  return (
    <>
      {overlayContent}
      <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
        {/* ... your 3D scene and other content ... */}
      </div>
    </>
  );
};

export default ThreeContainer;