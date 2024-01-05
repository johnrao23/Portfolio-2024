// import { create } from 'zustand';
// import * as THREE from 'three';

// type State = {
//   testMesh: InstanceType<typeof THREE.Mesh>;
// };

// export const useStore = create<State>(() => ({
//   testMesh: new THREE.Mesh(),
// }));






import { create } from 'zustand';
import * as THREE from "three";

type State = {
  physicsWorld: any;
  rigidBodies: THREE.Mesh[];
  setPhysicsWorld: (world: any) => void;
  addRigidBody: (body: THREE.Mesh, physicsBody?: any) => void; // 'any' for Ammo.js rigid bodies
  // ... other state and actions
};

export const useStore = create<State>((set) => ({
  physicsWorld: null,
  rigidBodies: [],

  setPhysicsWorld: (world) => set({ physicsWorld: world }),

  addRigidBody: (body, physicsBody) => {
    set((state) => ({
      rigidBodies: [...state.rigidBodies, body]
    }));
    
    // Optional: Add Ammo.js related code here, if needed
    if (physicsBody && state.physicsWorld) {
      // Assuming physicsWorld is the Ammo.js dynamics world
      state.physicsWorld.addRigidBody(physicsBody);
    }
  },

  // ... other actions
}));
