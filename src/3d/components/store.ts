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
    set((currentState) => {
      const updatedRigidBodies = [...currentState.rigidBodies, body];
      
      if (physicsBody && currentState.physicsWorld) {
        currentState.physicsWorld.addRigidBody(physicsBody);
      }

      return { rigidBodies: updatedRigidBodies };
    });
  },
}));
