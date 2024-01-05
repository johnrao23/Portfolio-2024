import React, { useEffect, useRef, useState } from 'react';
import Ammo from 'ammojs-typed';
import { setupScene } from './SceneSetup';

const ThreeContainer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true); // State to manage loading

  useEffect(() => {
    Ammo().then((AmmoLib: any) => {
      if (containerRef.current) {
        setupScene(AmmoLib, containerRef.current);
        setIsLoading(false); // Set loading to false once setup is complete
      }
    });

    // Cleanup logic
    return () => {
      // Implement any necessary cleanup for Ammo and Three.js
    };
  }, []);

  if (isLoading) {
    return (
      <div className="preload-overlay">
        <div className="start-page-content-div">
          <h1 className="john-text postload">Hi, I'm <span className="yellow-text">John Rao!</span></h1>
          <h1 className="postload start-page-text interactive-site-text">This is an interactive 3D site built with Three.js!</h1>
          <h1 id="appDirections" className="start-page-text joystick-directions-text postload">Move the ball around with the arrow keys on the keyboard.</h1>
          <button id="start-button" className="postload">EXPLORE</button>
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
      {/* Render your 3D scene here */}
    </div>
  );
};

export default ThreeContainer;
