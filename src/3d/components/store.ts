import { create } from 'zustand';
import * as THREE from 'three';
import Ammo from 'ammojs-typed';

const STATE = { DISABLE_DEACTIVATION: 4 };

type State = {
  physicsWorld: Ammo.btDiscreteDynamicsWorld | null;
  rigidBodies: THREE.Mesh[];
  setPhysicsWorld: (world: Ammo.btDiscreteDynamicsWorld) => void;
  addRigidBody: (body: THREE.Mesh, physicsBody?: Ammo.btRigidBody) => void;
  addRigidPhysics: (item: THREE.Mesh, itemScale: THREE.Vector3) => void;
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

  addRigidPhysics: (item, itemScale) => {
    set((currentState) => {
      if (!currentState.physicsWorld) return currentState;

      // Add Rigid Physics logic here
      let pos = new Ammo.btVector3(item.position.x, item.position.y, item.position.z);
      let scale = new Ammo.btVector3(itemScale.x * 0.5, itemScale.y * 0.5, itemScale.z * 0.5);
      let quat = new Ammo.btQuaternion(0, 0, 0, 1);
      let mass = 0;

      let transform = new Ammo.btTransform();
      transform.setIdentity();
      transform.setOrigin(pos);
      transform.setRotation(quat);

      let motionState = new Ammo.btDefaultMotionState(transform);
      let colShape = new Ammo.btBoxShape(scale);
      colShape.setMargin(0.05);

      let localInertia = new Ammo.btVector3(0, 0, 0);
      colShape.calculateLocalInertia(mass, localInertia);

      let rbInfo = new Ammo.btRigidBodyConstructionInfo(
        mass,
        motionState,
        colShape,
        localInertia
      );

      let body = new Ammo.btRigidBody(rbInfo);
      body.setActivationState(STATE.DISABLE_DEACTIVATION);

      currentState.physicsWorld.addRigidBody(body);

      return { ...currentState, physicsWorld: currentState.physicsWorld };
    });
  },
}));

