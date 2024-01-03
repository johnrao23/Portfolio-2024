import { create } from 'zustand';
import * as Ammo from 'ammo.js';

type State = {
  physicsWorld: Ammo.btDiscreteDynamicsWorld | null;
  addRigidBody: (body: Ammo.btRigidBody) => void;
  // ... other state and actions
};

export const useStore = create((set: (arg0: (state: any) => void) => any) => ({
  physicsWorld: null,
  // ... other state initializations
  addRigidBody: (body: any) => set((state: { physicsWorld: { addRigidBody: (arg0: any) => void; }; }) => {
    if (state.physicsWorld) {
      state.physicsWorld.addRigidBody(body);
      // You could also keep track of these bodies if needed
    }
  }),
  // ... other actions
}));
