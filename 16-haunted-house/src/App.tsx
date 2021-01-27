import React, { Suspense } from 'react';
import { Canvas, useResource } from 'react-three-fiber';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';
import { Floor } from './components/Floor';

const Lights: React.FC = () => {
  // * Refs
  const directionalLightRef = useResource<THREE.DirectionalLight>();
  const pointLightRef = useResource<THREE.PointLight>();

  return (
    <>
      <ambientLight args={[0xffffff, 0.3]} />
      <directionalLight
        castShadow
        ref={directionalLightRef}
        args={[0xffffff, 0.3]}
        position={[2, 2, -1]}
        shadow-mapSize-height={1024}
        shadow-mapSize-width={1024}
        shadow-camera-top={2}
        shadow-camera-right={2}
        shadow-camera-bottom={-2}
        shadow-camera-left={-2}
        shadow-camera-near={1}
        shadow-camera-far={6}
      />
      <pointLight
        ref={pointLightRef}
        args={[0xffffff, 0.3]}
        position={[-1, 1, 0]}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.1}
        shadow-camera-far={5}
      />
    </>
  );
};

const House: React.FC = () => {
  return (
    <group>
      <Floor />
    </group>
  );
};

const Walls: React.FC = () => {
  return null;
};

const Roof: React.FC = () => {
  return null;
};

const Door: React.FC = () => {
  return null;
};

const Bushes: React.FC = () => {
  return null;
};

const Graves: React.FC = () => {
  return null;
};

const App: React.FC = () => {
  return (
    <Canvas
      colorManagement={false}
      shadowMap={{
        enabled: true,
        type: THREE.PCFSoftShadowMap,
      }}
      camera={{
        position: [4, 2, 5],
        fov: 75,
        near: 0.1,
        far: 100,
      }}
      pixelRatio={Math.min(window.devicePixelRatio, 2)}>
      <OrbitControls />
      <Lights />
      <Suspense fallback={null}>
        <House />
      </Suspense>
    </Canvas>
  );
};

export default App;
