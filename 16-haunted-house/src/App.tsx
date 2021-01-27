import React, { Suspense } from 'react';
import { Canvas } from 'react-three-fiber';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';
import { Floor } from './components/Floor';
import { Walls } from './components/Walls';
import { Roof } from './components/Roof';
import { Door } from './components/Door';
import { Bushes } from './components/Bushes';
import { Graves } from './components/Graves';
import { Lights } from './components/Lights';

const House: React.FC = () => {
  return (
    <group>
      <Roof />
      <Walls />
      <Door />
      <Bushes />
    </group>
  );
};

const Objects: React.FC = () => {
  return (
    <>
      <House />
      <Floor />
      <Graves />
    </>
  );
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
      pixelRatio={Math.min(window.devicePixelRatio, 2)}
    >
      <OrbitControls />
      <Lights />
      <Suspense fallback={null}>
        <Objects />
      </Suspense>
    </Canvas>
  );
};

export default App;
