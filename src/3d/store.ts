import { create } from 'zustand';
import * as THREE from 'three';
import Ammo from 'ammojs-typed';

type State = {
  physicsWorld: Ammo.btDiscreteDynamicsWorld | null;
  rigidBodies: THREE.Mesh[];
  setPhysicsWorld: (world: Ammo.btDiscreteDynamicsWorld) => void;
  addRigidBody: (body: THREE.Mesh, physicsBody?: Ammo.btRigidBody) => void;
  // ... other state and actions
};

export const useStore = create<State>((set, get) => ({
  physicsWorld: null,
  rigidBodies: [],

  setPhysicsWorld: (world) => set({ physicsWorld: world }),

  addRigidBody: (body, physicsBody) => {
    const currentRigidBodies = get().rigidBodies;

    // If a corresponding Ammo physics body is provided, store it in the userData of the THREE.Mesh
    if (physicsBody) {
      body.userData.physicsBody = physicsBody;

      // Add the physics body to the physics world if it's initialized
      const physicsWorld = get().physicsWorld;
      if (physicsWorld) {
        physicsWorld.addRigidBody(physicsBody);
      }
    }

    set({ rigidBodies: [...currentRigidBodies, body] });
  },

  // ... other actions
}));

