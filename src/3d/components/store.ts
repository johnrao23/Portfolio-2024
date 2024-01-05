import { create } from 'zustand';
import * as THREE from 'three';
import Ammo from 'ammojs-typed';

type State = {
  physicsWorld: Ammo.btDiscreteDynamicsWorld | null;
  rigidBodies: THREE.Mesh[];
  setPhysicsWorld: (world: Ammo.btDiscreteDynamicsWorld) => void;
  addRigidBody: (body: THREE.Mesh, physicsBody?: Ammo.btRigidBody) => void;
};

export const useStore = create<State>((set) => ({
  physicsWorld: null,
  rigidBodies: [],

  setPhysicsWorld: (world) => set({ physicsWorld: world }),

  addRigidBody: (body, physicsBody) => {
    set((state) => ({
      rigidBodies: [...state.rigidBodies, body]
    }));
    
    if (physicsBody && state.physicsWorld) {
      // Assuming physicsWorld is the Ammo.js dynamics world
      state.physicsWorld.addRigidBody(physicsBody);
    }
  },
}));
