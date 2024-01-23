import { create } from 'zustand';
import * as THREE from 'three';

const STATE = { DISABLE_DEACTIVATION: 4 };

type MoveDirection = { left: number; right: number; forward: number; back: number };

type State = {
  ammo: any;
  ammoLoaded: boolean;
  initializeAmmo: () => Promise<void>;
  physicsWorld: any;
  rigidBodies: THREE.Mesh[];
  ballObject: THREE.Mesh | null;
  cursorHoverObjects: THREE.Object3D[];
  moveDirection: MoveDirection;
  setPhysicsWorld: (world: any) => void;
  addRigidBody: (body: THREE.Mesh, physicsBody?: any) => void;
  addRigidPhysics: (item: THREE.Mesh, itemScale: THREE.Vector3) => void;
  setBallObject: (newBallObject: THREE.Mesh | null) => void;
  addCursorHoverObject: (newObject: THREE.Object3D) => void;
  setMoveDirection: (direction: keyof MoveDirection, value: number) => void;
};

export const useStore = create<State>((set, get) => ({
  ammo: null,
  ammoLoaded: false,
  physicsWorld: null,
  rigidBodies: [],
  ballObject: null,
  cursorHoverObjects: [],
  moveDirection: { left: 0, right: 0, forward: 0, back: 0 },

  initializeAmmo: async () => {
    if (!get().ammoLoaded) {
      const Ammo = await import('ammo.js');
      set({ ammo: Ammo, ammoLoaded: true });
    }
  },

  setPhysicsWorld: (world) => set({ physicsWorld: world }),

  setBallObject: (newBallObject: THREE.Mesh | null) => set({ ballObject: newBallObject }),

  addCursorHoverObject: (newObject: THREE.Object3D) => set((state) => ({
    cursorHoverObjects: [...state.cursorHoverObjects, newObject]
  })),

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
      let Ammo = currentState.ammo;
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

  setMoveDirection: (direction, value) => set((state) => ({
    moveDirection: { ...state.moveDirection, [direction]: value }
  })),
}));
