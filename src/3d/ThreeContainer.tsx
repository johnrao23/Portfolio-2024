import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setupScene } from './components/SceneSetup';
import { launchClickPosition, launchHover } from './components/Utilities';
import { isTouchscreenDevice, createJoystick, setupEventHandlers, handleKeyUp, handleKeyDown } from './components/EventHandlers';
import { createBeachBall } from './components/CreateObjects';
import { simpleText } from './components/Surfaces';
import { useStore } from './components/store';
import WEBGL from './components/WebGL';

const ThreeContainer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const joystickRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showOverlay, setShowOverlay] = useState(false);
  const [isTouchscreen, setIsTouchscreen] = useState(false);
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
    setupEventHandlers();

    return () => {
      window.removeEventListener("keydown", handleKeyDown, false);
      window.removeEventListener("keyup", handleKeyUp, false);
    };
  }, []);

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

  useEffect(() => {
    setIsTouchscreen(isTouchscreenDevice());
    let touchText, instructionsText;

    if (isTouchscreenDevice()) {
      touchText = "Touch boxes with your \nfinger to open links";
      instructionsText = "Use the joystick in the bottom \nleft of the screen to move the ball.";
    } else {
      touchText = "Click on boxes with \nthe mouse to open links";
      instructionsText = "Use the arrow keys on your \n keyboard to move the ball.";
    }

    if (scene) {
      simpleText(scene, 9, 0.01, 5, instructionsText, 1.25);
      simpleText(scene, 39, 0.01, -83, touchText, 1.5);
    }
  }, [scene]);

  useEffect(() => {
    if (isTouchscreen && joystickRef.current) {
      createJoystick(joystickRef.current);
    }
  }, [isTouchscreen]);

  const goToStaticSite = () => {
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
            <h1 id="appDirections" className="start-page-text">
              {isTouchscreen ? "Use the joystick in the bottom left to move the ball. Please use your device in portrait orientation!" : "Move the ball around with the arrow keys on the keyboard."}
            </h1>
            <button id="start-button" onClick={startButtonEventListener}>EXPLORE</button>
            <h1 className="or-text">OR</h1>
            <button id="static-button" onClick={() => goToStaticSite()}>VISIT STATIC SITE</button>
          </div>
        )}
        {isTouchscreen && (
          <div ref={joystickRef} id="joystick-wrapper" className="joystick-wrapper">
          </div>
        )}
        <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
        </div>
      </div>
    </>
  );
};

export default ThreeContainer;