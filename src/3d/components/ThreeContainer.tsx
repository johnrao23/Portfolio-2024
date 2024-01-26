import React, { useEffect, useRef, useState } from 'react';
import setupScene from './SceneSetup';
import { useStore } from './store';

const ThreeContainer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  
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
      <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      </div>
    </div>
  );
};

export default ThreeContainer;

import React, { useEffect, useRef, useState } from 'react';
import setupScene from './SceneSetup'; // make sure this path is correct
import { useStore } from './store';

const ThreeContainer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const { ammo, ammoLoaded, initializeAmmo } = useStore();

  useEffect(() => {
    initializeAmmo().then(() => {
      console.log('Ammo is initialized.');
      setIsLoading(false);
      // No need for setTimeout here unless you specifically need the delay
    });
  }, [initializeAmmo]);

  return (
    <div>
      {isLoading ? (
        <div className="preload-overlay">
          <div className="trinity-rings-spinner">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
          </div>
          <div className="loading-text-div">Loading<span className="loader__dot">.</span><span className="loader__dot">.</span><span className="loader__dot">.</span></div>
        </div>
      ) : (
        <setupScene 
          Ammo={ammo} 
          container={containerRef.current} 
          onLoaded={() => {}} // Define what should happen when loaded
          ammoLoaded={ammoLoaded}
        />
      )}
    </div>
  );
};

export default ThreeContainer;