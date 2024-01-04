import React, { useEffect, useRef, useState } from 'react';
import * as Ammo from 'ammo.js';
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
    return <div>Loading 3D Scene...</div>; // Show loading indicator
  }

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      {/* Render your 3D scene here */}
    </div>
  );
};

export default ThreeContainer;
