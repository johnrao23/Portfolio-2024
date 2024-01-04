import { create } from 'zustand';
import * as THREE from 'three';
import Ammo from 'ammojs-typed';

type State = {
  physicsWorld: Ammo.btDiscreteDynamicsWorld | null;
  rigidBodies: THREE.Mesh[];
  setPhysicsWorld: (world: Ammo.btDiscreteDynamicsWorld) => void;
  addRigidBody: (body: THREE.Mesh) => void;
  // ... other state and actions
};

export const useStore = create<State>((set) => ({
  physicsWorld: null,
  rigidBodies: [],
  setPhysicsWorld: (world) => set({ physicsWorld: world }),
  addRigidBody: (body) => set((state) => ({
    rigidBodies: [...state.rigidBodies, body]
  })),
  // ... other actions
}));
