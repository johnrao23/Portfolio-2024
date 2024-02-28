import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setupScene } from './components/SceneSetup';
import { launchClickPosition, launchHover } from './components/Utilities';
import { createBeachBall } from './components/CreateObjects';
import { simpleText } from './components/Surfaces';
import { useStore } from './components/store';
import WEBGL from './components/WebGL';
import { isTouchscreenDevice, createJoystick, setupEventHandlers, } from './components/EventHandlers'
import '../index-3d.css';

const ThreeContainer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showOverlay, setShowOverlay] = useState(false);
  const navigate = useNavigate();
  
  const { initializeAmmo, ammoLoaded, ammo, setPhysicsWorld, scene } = useStore();

  useEffect(() => {
    if (!WEBGL.isWebGLAvailable()) {
      console.log("WebGL not available, navigating to static site.");
      navigate("/static");
    } else {
      console.log("WebGL available, proceeding with 3D content.");
    }
  }, [navigate]);

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
    console.log("Overlay should be hidden now");
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

  const goToStaticSite = () => {
    console.log("trying to go to static site")
    return navigate("/static");
  };
  

  return (
    <>
      <div className="three-container">
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
            <h1 className="john-text">Hi, I'm <span className="yellow-text">John Rao!</span></h1>
            <h1 className="start-page-text interactive-site-text">This is an interactive 3D site built with Three.js!</h1>
            <h1 id="appDirections" className="start-page-text joystick-directions-text">Move the ball around with the arrow keys on the keyboard.</h1>
            <button id="start-button" onClick={startButtonEventListener}>EXPLORE</button>
            <h1 className="or-text">OR</h1>
            <button id="static-button" onClick={() => goToStaticSite()}>VISIT STATIC SITE</button>
          </div>
        )}
        <div ref={containerRef} style={{ width: '100%', height: '100%'}}>
        </div>
      </div>
    </>
  );
};

export default ThreeContainer;