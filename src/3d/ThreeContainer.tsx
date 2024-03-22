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
      touchText = "Click on boxes with the \n   mouse to open links";
      instructionsText = "Use the arrow keys on your \n keyboard to move the ball.";
    }

    if (scene) {
      simpleText(scene, 9, 0.01, 5, instructionsText, 1.25);
      simpleText(scene, 36, 0.01, -86, touchText, 1.5);
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
      <div className="fixed inset-0 m-0 p-0 font-sans text-white text-base overflow-hidden">
        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50">
            <div className="trinity-rings-spinner relative w-[500px] h-[500px] flex justify-center items-center">
              <div className="circle absolute w-[350px] h-[350px] border-[10px] border-spinner-yellow animate-spin-1 opacity-90"></div>
              <div className="circle absolute w-[calc(350px*0.65)] h-[calc(350px*0.65)] border-[8px] border-spinner-yellow animate-spin-2 opacity-70"></div>
              <div className="circle absolute w-[calc(350px*0.45)] h-[calc(350px*0.45)] border-[6px] border-spinner-yellow animate-spin-3 opacity-50"></div>
            </div>
            <div className="absolute text-2xl font-sans text-spinner-yellow">
              Loading<span className="animate-blink">.</span><span className="animate-blink" style={{ animationDelay: '250ms' }}>.</span><span className="animate-blink" style={{ animationDelay: '500ms' }}>.</span>
            </div>
          </div>
        )}
        {showOverlay && (
          <div className="fixed inset-0 flex flex-col justify-center items-center bg-black bg-opacity-90 z-50">
            <h1 className="text-4xl md:text-5xl font-bold mb-12">
              Hi, I'm <span className="text-yellow-300">John Rao!</span>
            </h1>
            <p className="px-4 sm:px-6 text-center text-xl md:text-2xl mb-8">
              This is an interactive 3D site built with Three.js!
            </p>
            <p className="px-4 sm:px-6 text-center text-lg md:text-xl mb-20">
              {isTouchscreen ? "Use the joystick in the bottom left to move the ball. Please use your device in portrait orientation!" : "Move the ball around with the arrow keys on the keyboard."}
            </p>
            <button className="bg-gray-500 text-yellow-300 text-xl font-bold uppercase rounded-lg p-4 mb-8 hover:bg-gray-700 transition duration-200 ease-in-out focus:outline-none" onClick={startButtonEventListener}>
              Explore
            </button>
            {/* <p className="text-base md:text-lg mb-8">OR</p>
            <button className="bg-gray-500 text-yellow-300 text-xl font-bold uppercase rounded-lg p-4 hover:bg-gray-700 transition duration-200 ease-in-out focus:outline-none" onClick={goToStaticSite}>
              Visit Static Site
            </button> */}
          </div>
        )}
        {isTouchscreen && (
          <div ref={joystickRef} id="joystick-wrapper" className="fixed bottom-4 left-4 border border-white border-opacity-50 rounded-full w-32 h-32 flex justify-center items-center">
          </div>        
        )}
        <div ref={containerRef} className="w-full h-full">
        </div>
      </div>
    </>
  );
};

export default ThreeContainer;