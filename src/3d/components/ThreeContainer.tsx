import React, { useEffect, useRef, useState } from 'react';
import { setupScene } from './SceneSetup';
import { launchClickPosition, launchHover } from './Utilities';
import { createBeachBall } from './CreateObjects';
import { useStore } from './store';

const ThreeContainer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showOverlay, setShowOverlay] = useState(true);
  
  const { initializeAmmo, ammoLoaded } = useStore();

  useEffect(() => {
    console.log("Initializing Ammo: ammoLoaded =", ammoLoaded);
    if (!ammoLoaded) {
      initializeAmmo();
    }
  }, [initializeAmmo, ammoLoaded]);

  // New useEffect: Updates isLoading when ammoLoaded changes
  useEffect(() => {
    if (ammoLoaded) {
      console.log("Ammo is loaded, setting isLoading to false");
      setIsLoading(false);
    }
  }, [ammoLoaded]);

  // Second useEffect: Sets up the scene
  useEffect(() => {
    console.log("Preparing to setup scene: ammoLoaded =", ammoLoaded, "isLoading =", isLoading, "containerRef =", containerRef.current);
    if (ammoLoaded && !isLoading) {
      setupScene({
        container: containerRef.current, 
        onLoaded: () => {
          console.log("Scene setup completed, setting isLoading to false");
          setIsLoading(false);
        }
      });
    }
  }, [ammoLoaded, isLoading]);
  

  const startButtonEventListener = () => {
    setShowOverlay(false);
    const preloadOverlay = document.getElementById("preload-overlay");
    if (preloadOverlay) {
      preloadOverlay.style.display = "none";
    }
    document.removeEventListener("click", startButtonEventListener);
    document.addEventListener("click", launchClickPosition);
    createBeachBall();
    setTimeout(() => {
      document.addEventListener("mousemove", launchHover);
    }, 1000);
  };

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      {isLoading && (
        <div className="preload-overlay">
          <div className="trinity-rings-spinner">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
          </div>
          <div className="loading-text-div">Loading<span className="loader__dot">.</span><span className="loader__dot">.</span><span className="loader__dot">.</span></div>
        </div>
      )}
      {showOverlay && (
        <div className="start-page-content-div">
          <h1 className="john-text postload">Hi, I'm <span className="yellow-text">John Rao!</span></h1>
          <h1 className="postload start-page-text interactive-site-text">This is an interactive 3D site built with Three.js!</h1>
          <h1 id="appDirections" className="start-page-text joystick-directions-text postload">Move the ball around with the arrow keys on the keyboard.</h1>
          <button id="start-button" onClick={startButtonEventListener} className="postload">EXPLORE</button>
        </div>
      )}
    </div>
  );
};

export default ThreeContainer;