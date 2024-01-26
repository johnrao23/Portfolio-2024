import React, { useEffect, useRef, useState } from 'react';
import setupScene from './SceneSetup';
import { launchClickPosition, launchHover } from './Utilities';
import { createBeachBall } from './CreateObjects';
import { useStore } from './store';

const ThreeContainer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showOverlay, setShowOverlay] = useState(true);
  
  const { ammo, ammoLoaded, initializeAmmo } = useStore();

  useEffect(() => {
    initializeAmmo().then(() => {
      console.log('Ammo is initialized, now do something else.');
      setTimeout(() => {
        setupScene(ammo, containerRef.current, () => setIsLoading(false), ammoLoaded);

      }, 5000);
      // Place your additional code here that should run after ammo is initialized.
    });
  }, [initializeAmmo]);

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
    <div>
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
      {showOverlay && !isLoading && (
        <div className="start-page-content-div">
          <h1 className="john-text postload">Hi, I'm <span className="yellow-text">John Rao!</span></h1>
          <h1 className="postload start-page-text interactive-site-text">This is an interactive 3D site built with Three.js!</h1>
          <h1 id="appDirections" className="start-page-text joystick-directions-text postload">Move the ball around with the arrow keys on the keyboard.</h1>
          <button id="start-button" onClick={startButtonEventListener} className="postload">EXPLORE</button>
        </div>
      )}
      <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      </div>
    </div>
  );
};

export default ThreeContainer;
