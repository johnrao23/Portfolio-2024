import { create } from 'zustand';
import * as THREE from 'three';

const STATE = { DISABLE_DEACTIVATION: 4 };

export type MoveDirection = { left: number; right: number; forward: number; back: number };

type State = {
  ammo: any;
  ammoLoaded: boolean;
  initializeAmmo: () => Promise<void>;
  scene: THREE.Scene | null;
  renderer: THREE.WebGLRenderer | null;
  camera: THREE.PerspectiveCamera | null;
  setScene: (scene: THREE.Scene) => void;
  setRenderer: (renderer: THREE.WebGLRenderer) => void;
  setCamera: (camera: THREE.PerspectiveCamera) => void;
  physicsWorld: any;
  rigidBodies: THREE.Mesh[];
  galaxyMaterial: THREE.ShaderMaterial | null;
  setGalaxyMaterial: (material: THREE.ShaderMaterial) => void;
  particleGroup: THREE.Group | null;
  particleAttributes: {
    startSize: number[];
    startPosition: THREE.Vector3[];
    randomness: number[];
  };
  lensFlareObject: THREE.Mesh | null;
  particleSystemObject: THREE.Points | null;
  setParticleGroup: (group: THREE.Group) => void;
  setParticleAttributes: (attributes: { startSize: number[]; startPosition: THREE.Vector3[]; randomness: number[]; }) => void;
  setLensFlareObject: (newLensFlareObject: THREE.Mesh | null) => void;
  setParticleSystemObject: (object: THREE.Points | null) => void;
  ballObject: THREE.Mesh | null;
  recreateBall: boolean;
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
  scene: null,
  renderer: null,
  camera: null,
  physicsWorld: null,
  rigidBodies: [],
  galaxyMaterial: null,
  particleGroup: null,
  particleAttributes: { startSize: [], startPosition: [], randomness: [] },
  lensFlareObject: null,
  particleSystemObject: null,
  ballObject: null,
  recreateBall: false,
  cursorHoverObjects: [],
  moveDirection: { left: 0, right: 0, forward: 0, back: 0 },

  initializeAmmo: async () => {
    if (!get().ammoLoaded) {
      try {
        const AmmoLib = await import('ammo.js');
        set({ ammo: AmmoLib, ammoLoaded: true });
        console.log("Ammo initialized in store:");
      } catch (error) {
        console.error("Failed to load Ammo:", error);
      }
    }
  },

  setScene: (scene) => set({ scene }),
  setRenderer: (renderer: THREE.WebGLRenderer) => set({ renderer }),
  setCamera: (camera: THREE.PerspectiveCamera) => set({ camera }),

  setPhysicsWorld: (world) => set({ physicsWorld: world }),

  setGalaxyMaterial: (material: THREE.ShaderMaterial) => set({ galaxyMaterial: material }),
  setParticleGroup: (group) => set({ particleGroup: group }),
  setParticleAttributes: (attributes) => set({ particleAttributes: attributes }),
  setLensFlareObject: (newLensFlareObject: THREE.Mesh | null) => set({lensFlareObject: newLensFlareObject}),
  setParticleSystemObject: (object) => set({ particleSystemObject: object }),

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
