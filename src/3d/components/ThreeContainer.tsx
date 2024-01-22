import React, { useEffect, useRef, useState } from 'react';
import Ammo from 'ammojs-typed';
import { setupScene } from './SceneSetup';
import { launchClickPosition, launchHover } from './Utilities';
import { createBeachBall } from './CreateObjects';

const ThreeContainer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  const startButtonEventListener = () => {
    setIsLoading(false);
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

  useEffect(() => {
    Ammo(Ammo).then(() => {
      if (containerRef.current) {
        setupScene(Ammo, containerRef.current, () => setIsLoading(false));
      }
    });

    const startButton = document.getElementById("start-button");
    if (startButton) {
      startButton.addEventListener("click", startButtonEventListener);
    }

    // Cleanup logic
    return () => {
      if (startButton) {
        startButton.removeEventListener("click", startButtonEventListener);
      }
    };
  }, []);

  if (isLoading) {
    return (
      <div className="preload-overlay">
        <div className="start-page-content-div">
          <h1 className="john-text postload">Hi, I'm <span className="yellow-text">John Rao!</span></h1>
          <h1 className="postload start-page-text interactive-site-text">This is an interactive 3D site built with Three.js!</h1>
          <h1 id="appDirections" className="start-page-text joystick-directions-text postload">Move the ball around with the arrow keys on the keyboard.</h1>
          <button id="start-button" onClick={startButtonEventListener} className="postload">EXPLORE</button>
        </div>
        <div className="trinity-rings-spinner">
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
        </div>
        <div className="loading-text-div">Loading<span className="loader__dot">.</span><span className="loader__dot">.</span><span className="loader__dot">.</span></div>
      </div>
    );
  }
  

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
    </div>
  );
};

export default ThreeContainer;
