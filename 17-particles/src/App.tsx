import React, { Suspense } from 'react';
import { Canvas } from 'react-three-fiber';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';

const count = 5000;
const positions = new Float32Array(count * 3);
const colors = new Float32Array(count * 3);

for (let i = 0; i < count * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 10;
  colors[i] = Math.random();
}

const Particles: React.FC = () => {
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          name="position"
          attach="geometry"
          array={positions}
          count={3}
        />
        <bufferAttribute
          name="color"
          attach="geometry"
          array={colors}
          count={3}
        />
      </bufferGeometry>
      <pointsMaterial />
    </points>
  );
};

const App: React.FC = () => {
  return (
    <Canvas
      colorManagement={false}
      shadowMap={{
        enabled: false,
        type: THREE.PCFSoftShadowMap,
      }}
      camera={{
        position: [0, 0, 2],
        fov: 75,
        near: 0.1,
        far: 100,
      }}
      pixelRatio={Math.min(window.devicePixelRatio, 2)}
    >
      <color attach="background" args={[0, 0, 0]} />
      <OrbitControls />
      <Suspense fallback={null}>
        <Particles />
      </Suspense>
    </Canvas>
  );
};

export default App;
