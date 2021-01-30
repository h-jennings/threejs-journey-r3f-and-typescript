import React, { Suspense } from 'react';
import { Canvas, useFrame, useThree } from 'react-three-fiber';
import * as THREE from 'three';
import { OrbitControls, useTexture, Stats } from '@react-three/drei';

const count = 5000;
const positions = new Float32Array(count * 3);
const colors = new Float32Array(count * 3);

for (let i = 0; i < count * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 10;
  colors[i] = Math.random();
}

const Particles: React.FC = () => {
  const texture = useTexture('/textures/particles/2.png');
  const particlesGeometry = React.useRef<THREE.BufferGeometry>();
  const { clock } = useThree();

  useFrame(() => {
    if (particlesGeometry.current != null) {
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;

        const x = particlesGeometry.current.attributes.position.array[i3];
        // * Mutating the positions' Float32Array 'y' coordinate for every vertex
        // @ts-ignore
        particlesGeometry.current.attributes.position.array[i3 + 1] = Math.sin(
          clock.elapsedTime + x,
        );
      }
      particlesGeometry.current.attributes.position.needsUpdate = true;
    }
  });
  return (
    <points>
      <bufferGeometry ref={particlesGeometry}>
        <bufferAttribute
          attachObject={['attributes', 'position']}
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attachObject={['attributes', 'color']}
          array={colors}
          count={colors.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        args={[
          {
            size: 0.1,
            sizeAttenuation: true,
            transparent: true,
            vertexColors: true,
            depthWrite: false,
            alphaMap: texture,
          },
        ]}
      />
    </points>
  );
};

const App: React.FC = () => {
  return (
    <Canvas
      colorManagement={false}
      camera={{
        position: [3, 3, 3],
        fov: 75,
        near: 0.1,
        far: 100,
      }}
      pixelRatio={Math.min(window.devicePixelRatio, 2)}>
      <color attach='background' args={[0, 0, 0]} />
      <OrbitControls />
      <Stats />
      <Suspense fallback={null}>
        <Particles />
      </Suspense>
    </Canvas>
  );
};

export default App;
